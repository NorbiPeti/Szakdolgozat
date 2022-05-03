import { ListResponse } from './list';
import { Subject } from '../models';
import { field, Int, objectType } from '@loopback/graphql';

@objectType()
export class SubjectList implements ListResponse<Subject> {
    @field(returns => Int)
    count: number;
    @field(returns => [Subject])
    list: Subject[];
}
