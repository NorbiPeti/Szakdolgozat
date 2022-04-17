import { arg, GraphQLBindings, mutation, query, resolver, ResolverData } from '@loopback/graphql';
import { User } from '../models';
import { repository } from '@loopback/repository';
import { UserRepository } from '../repositories';
import { inject } from '@loopback/core';
import { SzakdolgozatUserService } from '../services';
import { TokenServiceBindings, UserServiceBindings } from '@loopback/authentication-jwt';
import { TokenService } from '@loopback/authentication';
import { SecurityBindings, UserProfile } from '@loopback/security';
import { genSalt, hash } from 'bcryptjs';
import { UserRegisterInput } from '../graphql-types/input/user-register.input';
import { validated } from '../helpers';

@resolver(of => User)
export class UserResolver {
    constructor(
        @repository('UserRepository') private readonly userRepository: UserRepository,
        @inject(UserServiceBindings.USER_SERVICE) private readonly userService: SzakdolgozatUserService,
        @inject(GraphQLBindings.RESOLVER_DATA) private readonly resolverData: ResolverData,
        @inject(TokenServiceBindings.TOKEN_SERVICE) public jwtService: TokenService,
        @inject(SecurityBindings.USER, {optional: true}) public user: UserProfile
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

    @query(returns => User)
    async test(request: User): Promise<User> {
        return (await this.userRepository.find())[0];
    }

    /*@mutation(returns => LoginResult)
    async login(
        @requestBody({
            description: 'The input of login function',
            required: true,
            content: {
                'application/json': {
                    schema: getModelSchemaRef(User, {exclude: ['id', 'isAdmin', 'name']})
                },
            }
        }) credentials: Pick<User, 'email' | 'password'>,
    ): Promise<{ token: string, user: Omit<User, 'id' | 'password'> }> {
        // ensure the user exists, and the password is correct
        const user = await this.userService.verifyCredentials(credentials);
        // convert a User object into a UserProfile object (reduced set of properties)
        const userProfile = this.userService.convertToUserProfile(user);

        // create a JSON Web Token based on the user profile
        const token = await this.jwtService.generateToken(userProfile);
        return {token, user};
    }

    @post('/users/logout', {
        responses: {
            '204': {
                description: 'Logged out',
            },
        },
    })
    @authenticate('jwt')
    async logout(@inject(RestBindings.Http.REQUEST) request: Request): Promise<void> {
        const split = request.headers.authorization?.split(' ');
        if (split && split.length > 1) {
            if (this.jwtService.revokeToken) {
                await this.jwtService.revokeToken(split[1]);
            } else {
                console.error('Cannot revoke token');
            }
        }
    }

    @get('/users/count')
    @response(200, {
        description: 'User model count',
        content: {'application/json': {schema: CountSchema}},
    })
    @authenticate('jwt')
    async count(
        @param.where(User) where?: Where<User>,
    ): Promise<Count> {
        return this.userRepository.count(where);
    }

    @get('/users')
    @response(200, {
        description: 'Array of User model instances',
        content: {
            'application/json': {
                schema: {
                    type: 'array',
                    items: getModelSchemaRef(User, {includeRelations: true}),
                },
            },
        },
    })
    @authenticate('jwt')
    async find(
        @param.filter(User) filter?: Filter<User>,
    ): Promise<User[]> {
        return this.userRepository.find(filter);
    }

    @patch('/users')
    @response(200, {
        description: 'User PATCH success count',
        content: {'application/json': {schema: CountSchema}},
    })
    @authenticate('jwt')
    async updateAll(
        @requestBody({
            content: {
                'application/json': {
                    schema: getModelSchemaRef(User, {partial: true}),
                },
            },
        })
            user: User,
        @param.where(User) where?: Where<User>,
    ): Promise<Count> {
        return this.userRepository.updateAll(user, where);
    }

    @get('/users/{id}')
    @response(200, {
        description: 'User model instance',
        content: {
            'application/json': {
                schema: getModelSchemaRef(User, {includeRelations: true}),
            },
        },
    })
    @authenticate('jwt')
    async findById(
        @param.path.number('id') id: number,
        @param.filter(User, {exclude: 'where'}) filter?: FilterExcludingWhere<User>
    ): Promise<User> {
        return this.userRepository.findById(id, filter);
    }

    @patch('/users/{id}')
    @response(204, {
        description: 'User PATCH success',
    })
    @authenticate('jwt')
    async updateById(
        @param.path.number('id') id: number,
        @requestBody({
            content: {
                'application/json': {
                    schema: getModelSchemaRef(User, {partial: true}),
                },
            },
        })
            user: User,
    ): Promise<void> {
        if (id === +this.user.id) {
            const loggedInUser = await this.userService.findUserById(this.user.id);
            if (user.isAdmin !== undefined && loggedInUser.isAdmin !== user.isAdmin) {
                throw new HttpErrors.BadRequest('Cannot change admin status of self');
            }
        }
        await this.userRepository.updateById(id, user);
    }

    @del('/users/{id}')
    @response(204, {
        description: 'User DELETE success',
    })
    @authenticate('jwt')
    async deleteById(@param.path.number('id') id: number): Promise<void> {
        await this.userRepository.deleteById(id);
    }*/
}
