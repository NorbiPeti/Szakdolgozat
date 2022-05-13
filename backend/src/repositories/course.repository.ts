import { Getter, inject } from '@loopback/core';
import { BelongsToAccessor, repository } from '@loopback/repository';
import { DatabaseDataSource } from '../datasources';
import { Course, CourseRelations, CourseUser, FulfillmentMode, Subject, User } from '../models';
import { SubjectRepository } from './subject.repository';
import { CourseUserRepository } from './course-user.repository';
import { UserRepository } from './user.repository';
import { FulfillmentModeRepository } from './fulfillment-mode.repository';
import { CustomCrudRepository, CustomHasManyRepositoryFactory, CustomHasManyThroughRepositoryFactory } from './custom-has-many-repository';

export class CourseRepository extends CustomCrudRepository<Course,
    typeof Course.prototype.id,
    CourseRelations> {

    public readonly subject: BelongsToAccessor<Subject, typeof Course.prototype.id>;

    public readonly users: CustomHasManyThroughRepositoryFactory<User, typeof User.prototype.id,
        CourseUser,
        typeof Course.prototype.id>;

    public readonly fulfillmentModes: CustomHasManyRepositoryFactory<FulfillmentMode, typeof Course.prototype.id>;

    constructor(
        @inject('datasources.database') dataSource: DatabaseDataSource,
        @repository.getter('SubjectRepository') protected subjectRepositoryGetter: Getter<SubjectRepository>,
        @repository.getter('CourseUserRepository') protected courseUserRepositoryGetter: Getter<CourseUserRepository>,
        @repository.getter('UserRepository') protected userRepositoryGetter: Getter<UserRepository>,
        @repository.getter('FulfillmentModeRepository') protected fulfillmentModeRepositoryGetter: Getter<FulfillmentModeRepository>,
    ) {
        super(Course, dataSource);
        this.fulfillmentModes = this.createCustomHasManyRepositoryFactoryFor('fulfillmentModes', fulfillmentModeRepositoryGetter, 'courseId');
        this.registerInclusionResolver('fulfillmentModes', this.fulfillmentModes.inclusionResolver);
        this.users = this.createCustomHasManyThroughFactoryFor('users', userRepositoryGetter, courseUserRepositoryGetter, 'courseId', 'userId');
        this.registerInclusionResolver('users', this.users.inclusionResolver);
        this.subject = this.createBelongsToAccessorFor('subject', subjectRepositoryGetter,);
        this.registerInclusionResolver('subject', this.subject.inclusionResolver);
    }
}
