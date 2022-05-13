import { Getter, inject } from '@loopback/core';
import { HasManyThroughRepositoryFactory, repository } from '@loopback/repository';
import { DatabaseDataSource } from '../datasources';
import { Course, CourseUser, Requirement, User, UserFulfillRequirement, UserRelations } from '../models';
import { SubjectRepository } from './subject.repository';
import { CourseUserRepository } from './course-user.repository';
import { CourseRepository } from './course.repository';
import { CustomCrudRepository, CustomHasManyThroughRepositoryFactory } from './custom-has-many-repository';
import { UserFulfillRequirementRepository } from './user-fulfill-requirement.repository';
import { RequirementRepository } from './requirement.repository';

export class UserRepository extends CustomCrudRepository<User,
    typeof User.prototype.id,
    UserRelations> {

    public readonly courses: CustomHasManyThroughRepositoryFactory<Course, typeof Course.prototype.id,
        CourseUser,
        typeof User.prototype.id>;

    public readonly completedRequirements: HasManyThroughRepositoryFactory<Requirement, typeof Requirement.prototype.id,
        UserFulfillRequirement,
        typeof User.prototype.id>;

    constructor(
        @inject('datasources.database') dataSource: DatabaseDataSource, @repository.getter('SubjectRepository') protected subjectRepositoryGetter: Getter<SubjectRepository>, @repository.getter('CourseUserRepository') protected courseUserRepositoryGetter: Getter<CourseUserRepository>, @repository.getter('CourseRepository') protected courseRepositoryGetter: Getter<CourseRepository>, @repository.getter('UserFulfillRequirementRepository') protected userFulfillRequirementRepositoryGetter: Getter<UserFulfillRequirementRepository>, @repository.getter('RequirementRepository') protected requirementRepositoryGetter: Getter<RequirementRepository>,
    ) {
        super(User, dataSource);
        this.completedRequirements = this.createHasManyThroughRepositoryFactoryFor('completedRequirements', requirementRepositoryGetter, userFulfillRequirementRepositoryGetter,);
        this.registerInclusionResolver('completedRequirements', this.completedRequirements.inclusionResolver);
        this.courses = this.createCustomHasManyThroughFactoryFor('courses', courseRepositoryGetter, courseUserRepositoryGetter, 'userId', 'courseId');
    }
}
