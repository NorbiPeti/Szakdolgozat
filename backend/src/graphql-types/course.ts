import { ListResponse } from './list';
import { Course } from '../models';
import { field, ID, inputType, Int, objectType } from '@loopback/graphql';
import { DataObject } from '@loopback/repository';

@objectType()
export class CourseList implements ListResponse<Course> {
    @field(returns => Int)
    count: number;
    @field(returns => [Course])
    list: Course[];
}

@inputType()
export class CourseCreateInput implements Pick<DataObject<Course>, 'semester' | 'alias' | 'subjectId'> {
    @field()
    semester?: string;
    @field()
    alias?: string;
    @field()
    subjectId?: number;
}

@inputType()
export class CourseUpdateInput extends CourseCreateInput {
    @field(returns => ID)
    id: number;
}
