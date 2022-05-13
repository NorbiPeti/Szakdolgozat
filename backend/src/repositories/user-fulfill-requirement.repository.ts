import { inject } from '@loopback/core';
import { DatabaseDataSource } from '../datasources';
import { UserFulfillRequirement, UserFulfillRequirementRelations } from '../models';
import { CustomCrudRepository } from './custom-has-many-repository';

export class UserFulfillRequirementRepository extends CustomCrudRepository<UserFulfillRequirement,
    typeof UserFulfillRequirement.prototype.id,
    UserFulfillRequirementRelations> {
    constructor(
        @inject('datasources.database') dataSource: DatabaseDataSource,
    ) {
        super(UserFulfillRequirement, dataSource);
    }
}
