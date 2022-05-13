import { repository } from '@loopback/repository';
import { FulfillmentModeRepository, RequirementRepository, UserRepository } from '../repositories';
import { arg, ID, Int, mutation, query, resolver } from '@loopback/graphql';
import { Requirement } from '../models';
import { listResponse, ListResponse } from '../graphql-types/list';
import { RequirementList, RequirementUpdateInput } from '../graphql-types/requirement';

@resolver(of => Requirement)
export class RequirementResolver {
    constructor(
        @repository('FulfillmentModeRepository') private modeRepo: FulfillmentModeRepository,
        @repository('RequirementRepository') private requirementRepo: RequirementRepository,
        @repository('UserRepository') private userRepo: UserRepository
    ) {
    }

    @query(returns => RequirementList)
    async requirements(@arg('mode', returns => ID) mode: number, @arg('offset', returns => Int) offset: number, @arg('limit', returns => Int) limit: number): Promise<ListResponse<Requirement>> {
        return listResponse(this.modeRepo.requirements(mode), offset, limit, RequirementList);
    }

    @query(returns => Requirement)
    async requirement(@arg('id', returns => ID) id: number): Promise<Requirement> {
        return await this.requirementRepo.findById(id);
    }

    @mutation(returns => Boolean)
    async requirementUpdate(@arg('requirement') input: RequirementUpdateInput): Promise<boolean> {
        await this.requirementRepo.updateById(input.id, input);
        return true;
    }

    @mutation(returns => Boolean)
    async requirementCreate(@arg('requirement') input: RequirementUpdateInput): Promise<boolean> {
        await this.requirementRepo.create(input);
        return true;
    }
}
