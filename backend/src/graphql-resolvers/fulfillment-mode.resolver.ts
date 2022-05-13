import { repository } from '@loopback/repository';
import { CourseRepository, FulfillmentModeRepository, UserRepository } from '../repositories';
import { arg, ID, Int, mutation, query, resolver } from '@loopback/graphql';
import { FulfillmentMode } from '../models';
import { listResponse, ListResponse } from '../graphql-types/list';
import { FulfillmentModeList, FulfillmentModeUpdateInput } from '../graphql-types/fulfillment-mode';

@resolver(of => FulfillmentMode)
export class FulfillmentModeResolver {
    constructor(
        @repository('CourseRepository') private courseRepo: CourseRepository,
        @repository('FulfillmentModeRepository') private fulfillmentModeRepo: FulfillmentModeRepository,
        @repository('UserRepository') private userRepo: UserRepository
    ) {
    }

    @query(returns => FulfillmentModeList)
    async fulfillmentModes(@arg('course', returns => ID) course: number, @arg('offset', returns => Int) offset: number, @arg('limit', returns => Int) limit: number): Promise<ListResponse<FulfillmentMode>> {
        return listResponse(this.courseRepo.fulfillmentModes(course), offset, limit, FulfillmentModeList);
    }

    @query(returns => FulfillmentMode)
    async fulfillmentMode(@arg('id', returns => ID) id: number): Promise<FulfillmentMode> {
        return await this.fulfillmentModeRepo.findById(id);
    }

    @mutation(returns => Boolean)
    async fulfillmentModeUpdate(@arg('input') input: FulfillmentModeUpdateInput): Promise<boolean> {
        await this.fulfillmentModeRepo.updateById(input.id, input);
        return true;
    }

    @mutation(returns => Boolean)
    async fulfillmentModeCreate(@arg('input') input: FulfillmentModeUpdateInput): Promise<boolean> {
        await this.fulfillmentModeRepo.create(input);
        return true;
    }
}
