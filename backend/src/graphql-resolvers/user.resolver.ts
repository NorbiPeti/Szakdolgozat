import { arg, authorized, GraphQLBindings, ID, Int, mutation, query, resolver, ResolverData } from '@loopback/graphql';
import { User } from '../models';
import { repository } from '@loopback/repository';
import { RevTokenRepository, UserRepository } from '../repositories';
import { Context, inject } from '@loopback/core';
import { SzakdolgozatUserService } from '../services';
import { TokenServiceBindings, UserServiceBindings } from '@loopback/authentication-jwt';
import { TokenService } from '@loopback/authentication';
import { SecurityBindings, UserProfile } from '@loopback/security';
import { genSalt, hash } from 'bcryptjs';
import { UserRegisterInput } from '../graphql-types/input/user-register.input';
import { validated } from '../helpers';
import { LoginResult, UserList } from '../graphql-types/user';
import { UserUpdateInput } from '../graphql-types/input/user-update.input';
import { SzakdolgozatBindings } from '../bindings';
import { listResponse } from '../graphql-types/list';

@resolver(of => User)
export class UserResolver {
    constructor(
        @repository('UserRepository') private readonly userRepository: UserRepository,
        @repository('RevTokenRepository') private readonly revTokenRepo: RevTokenRepository,
        @inject(UserServiceBindings.USER_SERVICE) private readonly userService: SzakdolgozatUserService,
        @inject(GraphQLBindings.RESOLVER_DATA) private readonly resolverData: ResolverData,
        @inject(TokenServiceBindings.TOKEN_SERVICE) public jwtService: TokenService,
        @inject(SecurityBindings.USER, {optional: true}) public user: UserProfile,
        @inject.context() private context: Context
    ) {
    }

    @mutation(returns => User)
    async register(@arg('user', validated(UserRegisterInput)) request: UserRegisterInput): Promise<Omit<User, 'password'>> {
        const password = await hash(request.password, await genSalt());
        const user = {
            email: request.email,
            name: request.name,
            password,
            isAdmin: false
        } as User;
        return this.userRepository.create(user);
    }

    @mutation(returns => LoginResult)
    async login(@arg('email') email: string, @arg('password') password: string): Promise<LoginResult> {
        // ensure the user exists, and the password is correct
        const user = await this.userService.verifyCredentials({email, password});
        // convert a User object into a UserProfile object (reduced set of properties)
        const userProfile = this.userService.convertToUserProfile(user);

        // create a JSON Web Token based on the user profile
        const token = await this.jwtService.generateToken(userProfile);
        return {token, user};
    }

    @authorized()
    @mutation(returns => Boolean)
    async logout(): Promise<boolean> {
        const token = await this.context.get(SzakdolgozatBindings.AUTH_TOKEN);
        if (token && !(await this.revTokenRepo.count({token})).count) {
            await this.revTokenRepo.create({token, created: new Date()});
        }
        return true;
    }

    @authorized()
    @query(returns => [User])
    async findUser(user: Partial<User>): Promise<User[]> {
        return this.userRepository.find({}); //TODO
    }

    @authorized()
    @query(returns => User, {name: 'user'})
    async findById(@arg('id', returns => ID) id: number): Promise<User> {
        return this.userRepository.findById(id);
    }

    @authorized()
    @query(returns => [User])
    async users(@arg('limit', returns => Int) limit: number, @arg('offset', returns => Int) offset: number) {
        return await listResponse(this.userRepository, offset, limit, UserList);
    }

    @authorized()
    @mutation(returns => Boolean)
    async userUpdate(@arg('user') user: UserUpdateInput): Promise<boolean> {
        if (user.id === +this.user?.id) { //TODO: this.user
            const loggedInUser = await this.userService.findUserById(this.user.id);
            if (user.isAdmin !== undefined && loggedInUser.isAdmin !== user.isAdmin) {
                throw new Error('Cannot change admin status of self');
            }
        }
        await this.userRepository.updateById(user.id, user);
        return true;
    }

    @authorized()
    @mutation(returns => Boolean)
    async userDelete(id: number): Promise<Boolean> {
        await this.userRepository.deleteById(id);
        return true;
    }
}
