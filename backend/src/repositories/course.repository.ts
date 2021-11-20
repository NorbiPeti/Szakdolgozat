import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyThroughRepositoryFactory, HasManyRepositoryFactory} from '@loopback/repository';
import {DatabaseDataSource} from '../datasources';
import {Course, CourseRelations, Subject, User, CourseUser, Requirement} from '../models';
import {SubjectRepository} from './subject.repository';
import {CourseUserRepository} from './course-user.repository';
import {UserRepository} from './user.repository';
import {RequirementRepository} from './requirement.repository';

export class CourseRepository extends DefaultCrudRepository<
  Course,
  typeof Course.prototype.id,
  CourseRelations
> {

  public readonly subject: BelongsToAccessor<Subject, typeof Course.prototype.id>;

  public readonly users: HasManyThroughRepositoryFactory<User, typeof User.prototype.id,
          CourseUser,
          typeof Course.prototype.id
        >;

  public readonly requirements: HasManyRepositoryFactory<Requirement, typeof Course.prototype.id>;

  constructor(
    @inject('datasources.database') dataSource: DatabaseDataSource, @repository.getter('SubjectRepository') protected subjectRepositoryGetter: Getter<SubjectRepository>, @repository.getter('CourseUserRepository') protected courseUserRepositoryGetter: Getter<CourseUserRepository>, @repository.getter('UserRepository') protected userRepositoryGetter: Getter<UserRepository>, @repository.getter('RequirementRepository') protected requirementRepositoryGetter: Getter<RequirementRepository>,
  ) {
    super(Course, dataSource);
    this.requirements = this.createHasManyRepositoryFactoryFor('requirements', requirementRepositoryGetter,);
    this.registerInclusionResolver('requirements', this.requirements.inclusionResolver);
    this.users = this.createHasManyThroughRepositoryFactoryFor('users', userRepositoryGetter, courseUserRepositoryGetter,);
    this.registerInclusionResolver('users', this.users.inclusionResolver);
    this.subject = this.createBelongsToAccessorFor('subject', subjectRepositoryGetter,);
    this.registerInclusionResolver('subject', this.subject.inclusionResolver);
  }
}
