import { Getter, inject } from '@loopback/core';
import { repository } from '@loopback/repository';
import { DatabaseDataSource } from '../datasources';
import { FulfillmentMode, FulfillmentModeRelations, Requirement } from '../models';
import { RequirementRepository } from './requirement.repository';
import { CustomCrudRepository, CustomHasManyRepositoryFactory } from './custom-has-many-repository';

export class FulfillmentModeRepository extends CustomCrudRepository<FulfillmentMode,
    typeof FulfillmentMode.prototype.id,
    FulfillmentModeRelations> {

    public readonly requirements: CustomHasManyRepositoryFactory<Requirement, typeof FulfillmentMode.prototype.id>;

    constructor(
        @inject('datasources.database') dataSource: DatabaseDataSource, @repository.getter('RequirementRepository') protected requirementRepositoryGetter: Getter<RequirementRepository>,
    ) {
        super(FulfillmentMode, dataSource);
        this.requirements = this.createCustomHasManyRepositoryFactoryFor('requirements', requirementRepositoryGetter, 'fulfillmentModeId');
        this.registerInclusionResolver('requirements', this.requirements.inclusionResolver);
    }
}
