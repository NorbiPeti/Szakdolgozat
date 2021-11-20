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
  Requirement,
} from '../models';
import {CourseRepository} from '../repositories';

export class CourseRequirementController {
  constructor(
    @repository(CourseRepository) protected courseRepository: CourseRepository,
  ) { }

  @get('/courses/{id}/requirements', {
    responses: {
      '200': {
        description: 'Array of Course has many Requirement',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Requirement)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Requirement>,
  ): Promise<Requirement[]> {
    return this.courseRepository.requirements(id).find(filter);
  }

  @post('/courses/{id}/requirements', {
    responses: {
      '200': {
        description: 'Course model instance',
        content: {'application/json': {schema: getModelSchemaRef(Requirement)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Course.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Requirement, {
            title: 'NewRequirementInCourse',
            exclude: ['id'],
            optional: ['courseId']
          }),
        },
      },
    }) requirement: Omit<Requirement, 'id'>,
  ): Promise<Requirement> {
    return this.courseRepository.requirements(id).create(requirement);
  }

  @patch('/courses/{id}/requirements', {
    responses: {
      '200': {
        description: 'Course.Requirement PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Requirement, {partial: true}),
        },
      },
    })
    requirement: Partial<Requirement>,
    @param.query.object('where', getWhereSchemaFor(Requirement)) where?: Where<Requirement>,
  ): Promise<Count> {
    return this.courseRepository.requirements(id).patch(requirement, where);
  }

  @del('/courses/{id}/requirements', {
    responses: {
      '200': {
        description: 'Course.Requirement DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Requirement)) where?: Where<Requirement>,
  ): Promise<Count> {
    return this.courseRepository.requirements(id).delete(where);
  }
}
