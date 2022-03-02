import { inject, Getter } from '@loopback/core';
import { DefaultCrudRepository, repository, HasManyRepositoryFactory } from '@loopback/repository';
import { DatabaseDataSource } from '../datasources';
import { Subject, SubjectRelations, Course } from '../models';
import { UserRepository } from './user.repository';
import { CourseRepository } from './course.repository';

export class SubjectRepository extends DefaultCrudRepository<Subject,
    typeof Subject.prototype.id,
    SubjectRelations> {

    public readonly courses: HasManyRepositoryFactory<Course, typeof Subject.prototype.id>;

    constructor(
        @inject('datasources.database') dataSource: DatabaseDataSource, @repository.getter('UserRepository') protected userRepositoryGetter: Getter<UserRepository>, @repository.getter('CourseRepository') protected courseRepositoryGetter: Getter<CourseRepository>,
    ) {
        super(Subject, dataSource);
        this.courses = this.createHasManyRepositoryFactoryFor('courses', courseRepositoryGetter,);
        this.registerInclusionResolver('courses', this.courses.inclusionResolver);
    }
}
