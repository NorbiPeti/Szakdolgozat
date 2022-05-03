import { field, ID, inputType } from '@loopback/graphql';
import { Course } from '../../models';
import { DataObject } from '@loopback/repository';

@inputType()
export class CourseUpdateInput implements Pick<DataObject<Course>, 'id' | 'semester' | 'alias' | 'subjectId'> {
    @field(returns => ID)
    id: number;
    @field()
    semester?: string;
    @field()
    alias?: string;
    @field()
    subjectId?: number;
}
