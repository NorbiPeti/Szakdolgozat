import { Getter, inject } from '@loopback/core';
import { DataObject, DefaultCrudRepository, repository } from '@loopback/repository';
import { DatabaseDataSource } from '../datasources';
import { Course, Subject, SubjectRelations } from '../models';
import { UserRepository } from './user.repository';
import { CourseRepository } from './course.repository';
import { CustomHasManyRepositoryFactory, DefaultCustomHasManyRepository } from './CustomHasManyRepository';

export class SubjectRepository extends DefaultCrudRepository<Subject,
    typeof Subject.prototype.id,
    SubjectRelations> {

    public readonly courses: CustomHasManyRepositoryFactory<Course, typeof Subject.prototype.id>;

    constructor(
        @inject('datasources.database') dataSource: DatabaseDataSource, @repository.getter('UserRepository') protected userRepositoryGetter: Getter<UserRepository>, @repository.getter('CourseRepository') protected courseRepositoryGetter: Getter<CourseRepository>,
    ) {
        super(Subject, dataSource);
        const origCourses = this.createHasManyRepositoryFactoryFor('courses', courseRepositoryGetter,);
        this.registerInclusionResolver('courses', origCourses.inclusionResolver);
        const courses = function(fkValue: number | undefined) {
            return new DefaultCustomHasManyRepository(courseRepositoryGetter, {subject_id: fkValue} as DataObject<Course>);
        };
        courses.inclusionResolver = origCourses.inclusionResolver;
        this.courses = courses;
    }
}
