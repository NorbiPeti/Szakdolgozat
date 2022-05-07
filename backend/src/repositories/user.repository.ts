import { Getter, inject } from '@loopback/core';
import { repository } from '@loopback/repository';
import { DatabaseDataSource } from '../datasources';
import { Course, CourseUser, User, UserRelations } from '../models';
import { SubjectRepository } from './subject.repository';
import { CourseUserRepository } from './course-user.repository';
import { CourseRepository } from './course.repository';
import { CustomCrudRepository, CustomHasManyThroughRepositoryFactory } from './custom-has-many-repository';

export class UserRepository extends CustomCrudRepository<User,
    typeof User.prototype.id,
    UserRelations> {

    public readonly courses: CustomHasManyThroughRepositoryFactory<Course, typeof Course.prototype.id,
        CourseUser,
        typeof User.prototype.id>;

    constructor(
        @inject('datasources.database') dataSource: DatabaseDataSource, @repository.getter('SubjectRepository') protected subjectRepositoryGetter: Getter<SubjectRepository>, @repository.getter('CourseUserRepository') protected courseUserRepositoryGetter: Getter<CourseUserRepository>, @repository.getter('CourseRepository') protected courseRepositoryGetter: Getter<CourseRepository>,
    ) {
        super(User, dataSource);
        this.courses = this.createCustomHasManyThroughFactoryFor('courses', courseRepositoryGetter, courseUserRepositoryGetter, 'userId', 'courseId');
    }
}
