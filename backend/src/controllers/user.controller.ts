import {Count, CountSchema, Filter, FilterExcludingWhere, MODEL_PROPERTIES_KEY, repository, Where,} from '@loopback/repository';
import {del, get, getModelSchemaRef, param, patch, post, put, requestBody, response,} from '@loopback/rest';
import {User} from '../models';
import {UserRepository} from '../repositories';
import {
  Credentials,
  MyUserService,
  TokenServiceBindings,
  UserServiceBindings
} from '@loopback/authentication-jwt';
import {inject, MetadataInspector} from '@loopback/core';
import {TokenService} from '@loopback/authentication';
import {SecurityBindings, UserProfile} from '@loopback/security';
import {genSalt, hash} from 'bcryptjs';
import _ from 'lodash';
import {UserRepository as UserRepo} from '@loopback/authentication-jwt';

export class UserController {
  constructor(
      @inject(TokenServiceBindings.TOKEN_SERVICE)
      public jwtService: TokenService,
      @inject(UserServiceBindings.USER_SERVICE)
      public userService: MyUserService,
      @inject(SecurityBindings.USER, {optional: true})
      public user: UserProfile,
      @repository(UserRepo)
      public userRepository : UserRepo,
      @repository(UserRepository)
      public userDataRepository : UserRepository,
  ) {}

  static includeToExclude(values: (keyof User)[]): (keyof User)[] {
    const metadata = MetadataInspector.getAllPropertyMetadata(MODEL_PROPERTIES_KEY, User);
    if (metadata) {
      return _.without(Object.keys(metadata), ...values) as (keyof User)[];
    }
    else throw new Error("No property metadata found");
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
            exclude: ['id', 'role']
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
      role: 'student'
    } as User;
    return this.userDataRepository.create(user);
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
          schema: getModelSchemaRef(User, {exclude: ['id', 'role', 'name']})
        },
      }}) credentials: Credentials,
  ): Promise<{token: string}> {
    // ensure the user exists, and the password is correct
    const user = await this.userService.verifyCredentials(credentials);
    // convert a User object into a UserProfile object (reduced set of properties)
    const userProfile = this.userService.convertToUserProfile(user);

    // create a JSON Web Token based on the user profile
    const token = await this.jwtService.generateToken(userProfile);
    return {token};
  }

  @get('/users/count')
  @response(200, {
    description: 'User model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(User) where?: Where<User>,
  ): Promise<Count> {
    return this.userDataRepository.count(where);
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
  async find(
    @param.filter(User) filter?: Filter<User>,
  ): Promise<User[]> {
    return this.userDataRepository.find(filter);
  }

  @patch('/users')
  @response(200, {
    description: 'User PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
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
    return this.userDataRepository.updateAll(user, where);
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
  async findById(
    @param.path.number('id') id: number,
    @param.filter(User, {exclude: 'where'}) filter?: FilterExcludingWhere<User>
  ): Promise<User> {
    return this.userDataRepository.findById(id, filter);
  }

  @patch('/users/{id}')
  @response(204, {
    description: 'User PATCH success',
  })
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
    await this.userDataRepository.updateById(id, user);
  }

  @put('/users/{id}')
  @response(204, {
    description: 'User PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() user: User,
  ): Promise<void> {
    await this.userDataRepository.replaceById(id, user);
  }

  @del('/users/{id}')
  @response(204, {
    description: 'User DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.userDataRepository.deleteById(id);
  }
}
