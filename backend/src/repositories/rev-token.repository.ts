import { inject } from '@loopback/core';
import { DefaultCrudRepository } from '@loopback/repository';
import { DatabaseDataSource } from '../datasources';
import { RevToken, RevTokenRelations } from '../models';

export class RevTokenRepository extends DefaultCrudRepository<RevToken,
    typeof RevToken.prototype.token,
    RevTokenRelations> {
    constructor(
        @inject('datasources.database') dataSource: DatabaseDataSource,
    ) {
        super(RevToken, dataSource);
    }
}
