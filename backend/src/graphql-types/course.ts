import { ListResponse } from './list';
import { Course } from '../models';
import { field, Int, objectType } from '@loopback/graphql';

@objectType()
export class CourseList implements ListResponse<Course> {
    @field(returns => Int)
    count: number;
    @field(returns => [Course])
    list: Course[];
}
