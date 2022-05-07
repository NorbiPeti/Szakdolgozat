import {
    constrainFilter,
    constrainWhere,
    Count,
    DataObject,
    DefaultHasManyRepository,
    DefaultHasManyThroughRepository,
    DefaultTransactionalRepository,
    Entity,
    EntityCrudRepository,
    HasManyRepository,
    HasManyThroughRepository,
    InclusionResolver,
    Options,
    Where
} from '@loopback/repository';
import { Getter } from '@loopback/core';

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

export interface CustomHasManyThroughRepositoryFactory<TargetEntity extends Entity, TargetID, ThroughEntity extends Entity, SourceID> {
    (fkValue: SourceID): CustomHasManyThroughRepository<TargetEntity, TargetID, ThroughEntity>;

    /**
     * Use `resolver` property to obtain an InclusionResolver for this relation.
     */
    inclusionResolver: InclusionResolver<Entity, TargetEntity>;
}

export interface CustomHasManyThroughRepository<Target extends Entity, TID, Through extends Entity> extends HasManyThroughRepository<Target, TID, Through> {
    count(where?: Where<Target>, options?: Options): Promise<Count>;
}

export class DefaultCustomHasManyThroughRepository<TargetEntity extends Entity,
    TargetID,
    TargetRepository extends EntityCrudRepository<TargetEntity, TargetID>,
    ThroughEntity extends Entity,
    ThroughID,
    ThroughRepository extends EntityCrudRepository<ThroughEntity, ThroughID>,
    > extends DefaultHasManyThroughRepository<TargetEntity, TargetID, TargetRepository, ThroughEntity, ThroughID, ThroughRepository>
    implements CustomHasManyThroughRepository<TargetEntity, TargetID, ThroughEntity> {
    async count(where?: Where<TargetEntity>, options?: Options): Promise<Count> {
        const targetRepository = await this.getTargetRepository();
        const throughRepository = await this.getThroughRepository();
        const sourceConstraint = this.getThroughConstraintFromSource();
        const throughInstances = await throughRepository.find(
            constrainFilter(undefined, sourceConstraint),
            options?.throughOptions,
        );
        const targetConstraint =
            this.getTargetConstraintFromThroughModels(throughInstances);
        return targetRepository.count(
            constrainWhere(where, targetConstraint),
            options,
        );
    }

}

export class CustomCrudRepository<T extends Entity, ID, Relations extends object = {}> extends DefaultTransactionalRepository<T, ID, Relations> {
    createCustomHasManyRepositoryFactoryFor<Target extends Entity, TargetID, ForeignKeyType extends Target[ForeignKeyName], ForeignKeyName extends keyof Target>(
        relationName: string,
        targetRepositoryGetter: Getter<EntityCrudRepository<Target, TargetID>>,
        fkName: ForeignKeyName
    ): CustomHasManyRepositoryFactory<Target, ForeignKeyType | undefined> {
        const origEntities = this.createHasManyRepositoryFactoryFor(relationName, targetRepositoryGetter);
        this.registerInclusionResolver(relationName, origEntities.inclusionResolver);
        const entities = function(fkValue: ForeignKeyType | undefined) {
            return new DefaultCustomHasManyRepository(targetRepositoryGetter, {[fkName]: fkValue} as unknown as DataObject<Target>);
        };
        entities.inclusionResolver = origEntities.inclusionResolver;
        return entities;
    }

    createCustomHasManyThroughFactoryFor<Target extends Entity, Through extends Entity, ThroughID, SourceKeyName extends keyof Through, TargetKeyName extends keyof Through>(
        relationName: string,
        targetRepoGetter: Getter<EntityCrudRepository<Target, Through[TargetKeyName]>>,
        throughRepoGetter: Getter<EntityCrudRepository<Through, ThroughID>>,
        sourceKeyName: SourceKeyName,
        targetKeyName: TargetKeyName
    ): CustomHasManyThroughRepositoryFactory<Target, Through[TargetKeyName] | undefined, Through, Through[SourceKeyName] | undefined> {
        const origEntities = this.createHasManyThroughRepositoryFactoryFor(relationName, targetRepoGetter, throughRepoGetter);
        this.registerInclusionResolver(relationName, origEntities.inclusionResolver);
        const entities = function(fkValue: Through[SourceKeyName] | undefined) {
            function getTargetConstraintFromThroughModels(
                throughInstances: Through[],
            ): DataObject<Target> {
                const keys = throughInstances.map(instance => instance.getId());
                return {id: keys.length > 1 ? {inq: keys} : keys[0]} as unknown as DataObject<Target>;
            }

            function getTargetKeys(throughInstances: Through[]): Through[TargetKeyName][] {
                return throughInstances.map(instance => instance[targetKeyName]);
            }

            function getThroughConstraintFromSource(): DataObject<Through> {
                return {[sourceKeyName]: fkValue} as unknown as DataObject<Through>;
            }

            function getTargetIds(targetInstances: Target[]): Through[TargetKeyName][] {
                return targetInstances.map(target => target.getId());
            }

            function getThroughConstraintFromTarget(fkValues: Through[TargetKeyName][]): DataObject<Through> {
                return {[targetKeyName]: fkValues.length > 1 ? {inq: fkValues} : fkValues[0]} as unknown as DataObject<Through>;
            }

            return new DefaultCustomHasManyThroughRepository<Target,
                Through[TargetKeyName],
                EntityCrudRepository<Target, Through[TargetKeyName]>,
                Through,
                ThroughID,
                EntityCrudRepository<Through, ThroughID>>(
                targetRepoGetter,
                throughRepoGetter,
                getTargetConstraintFromThroughModels,
                getTargetKeys,
                getThroughConstraintFromSource,
                getTargetIds,
                getThroughConstraintFromTarget,
            );
        };
        entities.inclusionResolver = origEntities.inclusionResolver;
        return entities;
    }
}
