import {
    repository,
} from '@loopback/repository';
import {
    param,
    get,
    getModelSchemaRef,
} from '@loopback/rest';
import {
    Course,
    Subject,
} from '../models';
import { CourseRepository } from '../repositories';

export class CourseSubjectController {
    constructor(
        @repository(CourseRepository)
        public courseRepository: CourseRepository,
    ) {
    }

    @get('/courses/{id}/subject', {
        responses: {
            '200': {
                description: 'Subject belonging to Course',
                content: {
                    'application/json': {
                        schema: {type: 'array', items: getModelSchemaRef(Subject)},
                    },
                },
            },
        },
    })
    async getSubject(
        @param.path.number('id') id: typeof Course.prototype.id,
    ): Promise<Subject> {
        return this.courseRepository.subject(id);
    }
}
