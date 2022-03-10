import { constrainWhere, Count, DefaultHasManyRepository, Entity, EntityCrudRepository, Where } from '@loopback/repository';
import { Options } from '@loopback/repository/src/common-types';
import { HasManyRepository } from '@loopback/repository/src/relations/has-many/has-many.repository';
import { InclusionResolver } from '@loopback/repository/src/relations/relation.types';

export interface CustomHasManyRepositoryFactory<Target extends Entity,
    ForeignKeyType,
    > {
    /**
     * Invoke the function to obtain HasManyRepository.
     */
    (fkValue: ForeignKeyType): CustomHasManyRepository<Target>;

    /**
     * Use `resolver` property to obtain an InclusionResolver for this relation.
     */
    inclusionResolver: InclusionResolver<Entity, Target>;
}

export interface CustomHasManyRepository<Target extends Entity> extends HasManyRepository<Target> {
    count(where?: Where<Target>, options?: Options): Promise<Count>;
}

export class DefaultCustomHasManyRepository<TEntity extends Entity, TID, TRepository extends EntityCrudRepository<TEntity, TID>> extends DefaultHasManyRepository<TEntity, TID, TRepository> implements CustomHasManyRepository<TEntity> {
    async count(where?: Where<TEntity>, options?: Options) {
        const targetRepository = await this.getTargetRepository();
        return targetRepository.count(constrainWhere(where, this.constraint), options);
    }
}
