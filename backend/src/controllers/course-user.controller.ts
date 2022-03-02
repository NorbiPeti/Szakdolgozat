import {
    Count,
    CountSchema,
    Filter,
    repository,
    Where,
} from '@loopback/repository';
import {
    del,
    get,
    getModelSchemaRef,
    getWhereSchemaFor,
    param,
    patch,
    post,
    requestBody,
} from '@loopback/rest';
import {
    Course,
    User,
} from '../models';
import { CourseRepository } from '../repositories';

export class CourseUserController {
    constructor(
        @repository(CourseRepository) protected courseRepository: CourseRepository,
    ) {
    }

    @get('/courses/{id}/users', {
        responses: {
            '200': {
                description: 'Array of Course has many User through CourseUser',
                content: {
                    'application/json': {
                        schema: {type: 'array', items: getModelSchemaRef(User)},
                    },
                },
            },
        },
    })
    async find(
        @param.path.number('id') id: number,
        @param.query.object('filter') filter?: Filter<User>,
    ): Promise<User[]> {
        return this.courseRepository.users(id).find(filter);
    }

    @post('/courses/{id}/users', {
        responses: {
            '200': {
                description: 'create a User model instance',
                content: {'application/json': {schema: getModelSchemaRef(User)}},
            },
        },
    })
    async create(
        @param.path.number('id') id: typeof Course.prototype.id,
        @requestBody({
            content: {
                'application/json': {
                    schema: getModelSchemaRef(User, {
                        title: 'NewUserInCourse',
                        exclude: ['id'],
                    }),
                },
            },
        }) user: Omit<User, 'id'>,
    ): Promise<User> {
        return this.courseRepository.users(id).create(user);
    }

    @patch('/courses/{id}/users', {
        responses: {
            '200': {
                description: 'Course.User PATCH success count',
                content: {'application/json': {schema: CountSchema}},
            },
        },
    })
    async patch(
        @param.path.number('id') id: number,
        @requestBody({
            content: {
                'application/json': {
                    schema: getModelSchemaRef(User, {partial: true}),
                },
            },
        })
            user: Partial<User>,
        @param.query.object('where', getWhereSchemaFor(User)) where?: Where<User>,
    ): Promise<Count> {
        return this.courseRepository.users(id).patch(user, where);
    }

    @del('/courses/{id}/users', {
        responses: {
            '200': {
                description: 'Course.User DELETE success count',
                content: {'application/json': {schema: CountSchema}},
            },
        },
    })
    async delete(
        @param.path.number('id') id: number,
        @param.query.object('where', getWhereSchemaFor(User)) where?: Where<User>,
    ): Promise<Count> {
        return this.courseRepository.users(id).delete(where);
    }
}
