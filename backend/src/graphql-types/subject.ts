import { ListResponse } from './list';
import { Subject } from '../models';
import { field, ID, inputType, Int, objectType } from '@loopback/graphql';
import { DataObject } from '@loopback/repository';

@objectType()
export class SubjectList implements ListResponse<Subject> {
    @field(returns => Int)
    count: number;
    @field(returns => [Subject])
    list: Subject[];
}

@inputType()
export class SubjectUpdateInput implements Pick<DataObject<Subject>, 'id' | 'name' | 'description'> {
    @field(returns => ID)
    id: number;
    @field()
    name?: string;
    @field()
    description?: string;
}
