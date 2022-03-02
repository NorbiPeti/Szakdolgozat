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
    User,
    Course,
} from '../models';
import { UserRepository } from '../repositories';

export class UserCourseController {
    constructor(
        @repository(UserRepository) protected userRepository: UserRepository,
    ) {
    }

    @get('/users/{id}/courses', {
        responses: {
            '200': {
                description: 'Array of User has many Course through CourseUser',
                content: {
                    'application/json': {
                        schema: {type: 'array', items: getModelSchemaRef(Course)},
                    },
                },
            },
        },
    })
    async find(
        @param.path.number('id') id: number,
        @param.query.object('filter') filter?: Filter<Course>,
    ): Promise<Course[]> {
        return this.userRepository.courses(id).find(filter);
    }

    @post('/users/{id}/courses', {
        responses: {
            '200': {
                description: 'create a Course model instance',
                content: {'application/json': {schema: getModelSchemaRef(Course)}},
            },
        },
    })
    async create(
        @param.path.number('id') id: typeof User.prototype.id,
        @requestBody({
            content: {
                'application/json': {
                    schema: getModelSchemaRef(Course, {
                        title: 'NewCourseInUser',
                        exclude: ['id'],
                    }),
                },
            },
        }) course: Omit<Course, 'id'>,
    ): Promise<Course> {
        return this.userRepository.courses(id).create(course);
    }

    @patch('/users/{id}/courses', {
        responses: {
            '200': {
                description: 'User.Course PATCH success count',
                content: {'application/json': {schema: CountSchema}},
            },
        },
    })
    async patch(
        @param.path.number('id') id: number,
        @requestBody({
            content: {
                'application/json': {
                    schema: getModelSchemaRef(Course, {partial: true}),
                },
            },
        })
            course: Partial<Course>,
        @param.query.object('where', getWhereSchemaFor(Course)) where?: Where<Course>,
    ): Promise<Count> {
        return this.userRepository.courses(id).patch(course, where);
    }

    @del('/users/{id}/courses', {
        responses: {
            '200': {
                description: 'User.Course DELETE success count',
                content: {'application/json': {schema: CountSchema}},
            },
        },
    })
    async delete(
        @param.path.number('id') id: number,
        @param.query.object('where', getWhereSchemaFor(Course)) where?: Where<Course>,
    ): Promise<Count> {
        return this.userRepository.courses(id).delete(where);
    }
}
