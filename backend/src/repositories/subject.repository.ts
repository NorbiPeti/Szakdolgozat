import { Getter, inject } from '@loopback/core';
import { repository } from '@loopback/repository';
import { DatabaseDataSource } from '../datasources';
import { Course, Subject, SubjectRelations } from '../models';
import { UserRepository } from './user.repository';
import { CourseRepository } from './course.repository';
import { CustomCrudRepository, CustomHasManyRepositoryFactory } from './custom-has-many-repository';

export class SubjectRepository extends CustomCrudRepository<Subject, typeof Subject.prototype.id, SubjectRelations> {

    public readonly courses: CustomHasManyRepositoryFactory<Course, typeof Subject.prototype.id>;

    constructor(
        @inject('datasources.database') dataSource: DatabaseDataSource, @repository.getter('UserRepository') protected userRepositoryGetter: Getter<UserRepository>, @repository.getter('CourseRepository') protected courseRepositoryGetter: Getter<CourseRepository>,
    ) {
        super(Subject, dataSource);
        this.courses = this.createCustomHasManyRepositoryFactoryFor('courses', courseRepositoryGetter, 'subjectId');
    }
}
