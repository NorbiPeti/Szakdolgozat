import {Count, CountSchema, Filter, FilterExcludingWhere, repository, Where,} from '@loopback/repository';
import {del, get, getModelSchemaRef, param, patch, post, Request, requestBody, response, RestBindings,} from '@loopback/rest';
import {User} from '../models';
import {UserRepository} from '../repositories';
import {
    TokenServiceBindings,
    UserServiceBindings
} from '@loopback/authentication-jwt';
import {inject} from '@loopback/core';
import {authenticate, TokenService} from '@loopback/authentication';
import {SecurityBindings, UserProfile} from '@loopback/security';
import {genSalt, hash} from 'bcryptjs';
import {SzakdolgozatUserService} from '../services';

export class UserController {
    constructor(
        @inject(TokenServiceBindings.TOKEN_SERVICE)
        public jwtService: TokenService,
        @inject(UserServiceBindings.USER_SERVICE)
        public userService: SzakdolgozatUserService,
        @inject(SecurityBindings.USER, {optional: true})
        public user: UserProfile,
        @repository(UserRepository)
        public userRepository: UserRepository,
    ) {
    }

    @post('/users')
    @response(200, {
        description: 'User model instance',
        content: {'application/json': {schema: getModelSchemaRef(User, {exclude: ['password']})}},
    })
    async register(
        @requestBody({
            content: {
                'application/json': {
                    schema: getModelSchemaRef(User, {
                        title: 'Registration request',
                        exclude: ['id', 'isAdmin']
                    }),
                },
            },
        })
            request: Pick<User, 'email' | 'name' | 'password'>,
    ): Promise<User> {
        const password = await hash(request.password, await genSalt());
        const user = {
            email: request.email,
            name: request.name,
            password: password,
            isAdmin: false
        } as User;
        return this.userRepository.create(user);
    }

    @post('/users/login', {
        responses: {
            '200': {
                description: 'Token',
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                token: {
                                    type: 'string',
                                },
                                user: getModelSchemaRef(User, {exclude: ['id', 'password']})
                            },
                        },
                    },
                },
            },
        },
    })
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
        await this.userRepository.updateById(id, user);
    }

    @del('/users/{id}')
    @response(204, {
        description: 'User DELETE success',
    })
    @authenticate('jwt')
    async deleteById(@param.path.number('id') id: number): Promise<void> {
        await this.userRepository.deleteById(id);
    }
}
