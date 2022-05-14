import { ListResponse } from './list';
import { Requirement } from '../models';
import { field, ID, inputType, Int, objectType } from '@loopback/graphql';
import { DataObject } from '@loopback/repository';

@objectType()
export class RequirementList implements ListResponse<Requirement> {
    @field(returns => Int)
    count: number;
    @field(returns => [Requirement])
    list: Requirement[];
}

@inputType()
export class RequirementCreateInput implements Pick<DataObject<Requirement>, 'name' | 'description' | 'deadline' | 'minPoints' | 'maxPoints' | 'fulfillmentModeId'> {
    @field()
    deadline: Date;
    @field()
    name: string;
    @field()
    description: string;
    @field(returns => Int)
    minPoints: number;
    @field(returns => Int)
    maxPoints: number;
    @field(returns => ID)
    fulfillmentModeId: number;

}

@inputType()
export class RequirementUpdateInput extends RequirementCreateInput {
    @field(returns => ID)
    id: number;
}
