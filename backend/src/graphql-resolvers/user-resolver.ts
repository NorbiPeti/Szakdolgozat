import { arg, authorized, GraphQLBindings, Int, mutation, query, resolver, ResolverData } from '@loopback/graphql';
import { User } from '../models';
import { repository } from '@loopback/repository';
import { UserRepository } from '../repositories';
import { inject } from '@loopback/core';
import { AuthService, SzakdolgozatUserService } from '../services';
import { TokenServiceBindings, UserServiceBindings } from '@loopback/authentication-jwt';
import { TokenService } from '@loopback/authentication';
import { SecurityBindings, UserProfile } from '@loopback/security';
import { genSalt, hash } from 'bcryptjs';
import { UserRegisterInput } from '../graphql-types/input/user-register.input';
import { validated } from '../helpers';
import { LoginResult } from '../graphql-types/user';
import { UserUpdateInput } from '../graphql-types/input/user-update.input';
import { SzakdolgozatBindings } from '../bindings';

@resolver(of => User)
export class UserResolver {
    constructor(
        @repository('UserRepository') private readonly userRepository: UserRepository,
        @inject(UserServiceBindings.USER_SERVICE) private readonly userService: SzakdolgozatUserService,
        @inject(GraphQLBindings.RESOLVER_DATA) private readonly resolverData: ResolverData,
        @inject(TokenServiceBindings.TOKEN_SERVICE) public jwtService: TokenService,
        @inject(SecurityBindings.USER, {optional: true}) public user: UserProfile,
        @inject(SzakdolgozatBindings.AUTH_SERVICE) private authService: AuthService
    ) {
        console.log('Auth service', authService);
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

    @query(returns => User)
    async test(request: User): Promise<User> {
        return (await this.userRepository.find())[0];
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
        console.log('Logout service: ', this.authService);
        console.log('token:', this.authService.receivedToken); //TODO
        await this.jwtService.revokeToken?.(this.authService.receivedToken);
        return true;
    }

    @authorized()
    @query(returns => [User])
    async find(user: Partial<User>): Promise<User[]> {
        return this.userRepository.find({}); //TODO
    }

    @authorized()
    @query(returns => User)
    async findById(@arg('id', returns => Int) id: number): Promise<User> {
        return this.userRepository.findById(id);
    }

    @authorized()
    @mutation(returns => Boolean)
    async updateById(@arg('id', returns => Int) id: number, @arg('user') user: UserUpdateInput): Promise<boolean> {
        if (id === +this.user?.id) { //TODO: this.user
            const loggedInUser = await this.userService.findUserById(this.user.id);
            if (user.isAdmin !== undefined && loggedInUser.isAdmin !== user.isAdmin) {
                throw new Error('Cannot change admin status of self');
            }
        }
        await this.userRepository.updateById(id, user);
        return true;
    }

    @authorized()
    @mutation(returns => Boolean)
    async deleteById(id: number): Promise<Boolean> {
        await this.userRepository.deleteById(id);
        return true;
    }
}
