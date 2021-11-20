import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyThroughRepositoryFactory} from '@loopback/repository';
import {DatabaseDataSource} from '../datasources';
import {User, UserRelations, Course, CourseUser} from '../models';
import {SubjectRepository} from './subject.repository';
import {CourseUserRepository} from './course-user.repository';
import {CourseRepository} from './course.repository';

export class UserRepository extends DefaultCrudRepository<
  User,
  typeof User.prototype.id,
  UserRelations
> {

  public readonly courses: HasManyThroughRepositoryFactory<Course, typeof Course.prototype.id,
          CourseUser,
          typeof User.prototype.id
        >;

  constructor(
    @inject('datasources.database') dataSource: DatabaseDataSource, @repository.getter('SubjectRepository') protected subjectRepositoryGetter: Getter<SubjectRepository>, @repository.getter('CourseUserRepository') protected courseUserRepositoryGetter: Getter<CourseUserRepository>, @repository.getter('CourseRepository') protected courseRepositoryGetter: Getter<CourseRepository>,
  ) {
    super(User, dataSource);
    this.courses = this.createHasManyThroughRepositoryFactoryFor('courses', courseRepositoryGetter, courseUserRepositoryGetter,);
    this.registerInclusionResolver('courses', this.courses.inclusionResolver);
  }
}
