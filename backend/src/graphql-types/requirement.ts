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
export class RequirementUpdateInput implements Pick<DataObject<Requirement>, 'id' | 'name' | 'description' | 'deadline' | 'minPoints' | 'maxPoints'> {
    @field(returns => Int)
    id: number;
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
