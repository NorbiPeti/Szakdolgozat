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
  Subject,
  Course,
} from '../models';
import {SubjectRepository} from '../repositories';

export class SubjectCourseController {
  constructor(
    @repository(SubjectRepository) protected subjectRepository: SubjectRepository,
  ) { }

  @get('/subjects/{id}/courses', {
    responses: {
      '200': {
        description: 'Array of Subject has many Course',
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
    return this.subjectRepository.courses(id).find(filter);
  }

  @post('/subjects/{id}/courses', {
    responses: {
      '200': {
        description: 'Subject model instance',
        content: {'application/json': {schema: getModelSchemaRef(Course)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Subject.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Course, {
            title: 'NewCourseInSubject',
            exclude: ['id'],
            optional: ['subjectId']
          }),
        },
      },
    }) course: Omit<Course, 'id'>,
  ): Promise<Course> {
    return this.subjectRepository.courses(id).create(course);
  }

  @patch('/subjects/{id}/courses', {
    responses: {
      '200': {
        description: 'Subject.Course PATCH success count',
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
    return this.subjectRepository.courses(id).patch(course, where);
  }

  @del('/subjects/{id}/courses', {
    responses: {
      '200': {
        description: 'Subject.Course DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Course)) where?: Where<Course>,
  ): Promise<Count> {
    return this.subjectRepository.courses(id).delete(where);
  }
}
