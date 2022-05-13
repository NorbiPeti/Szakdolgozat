import { ListResponse } from './list';
import { Requirement } from '../models';
import { field, inputType, Int, objectType } from '@loopback/graphql';
import { DataObject } from '@loopback/repository';

@objectType()
export class RequirementList implements ListResponse<Requirement> {
    @field(returns => Int)
    count: number;
    @field(returns => [Requirement])
    list: Requirement[];
}

@inputType()
export class RequirementCreateInput implements Pick<DataObject<Requirement>, 'name' | 'description' | 'deadline' | 'minPoints' | 'maxPoints'> {
    @field()
    deadline: Date;
    @field()
    name: string;
    @field()
    description: string;
    @field()
    minPoints: number;
    @field()
    maxPoints: number;
}

@inputType()
export class RequirementUpdateInput extends RequirementCreateInput {
    @field(returns => Int)
    id: number;
}
