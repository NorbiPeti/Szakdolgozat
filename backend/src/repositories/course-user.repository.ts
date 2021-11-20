import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DatabaseDataSource} from '../datasources';
import {CourseUser, CourseUserRelations} from '../models';

export class CourseUserRepository extends DefaultCrudRepository<
  CourseUser,
  typeof CourseUser.prototype.id,
  CourseUserRelations
> {
  constructor(
    @inject('datasources.database') dataSource: DatabaseDataSource,
  ) {
    super(CourseUser, dataSource);
  }
}
