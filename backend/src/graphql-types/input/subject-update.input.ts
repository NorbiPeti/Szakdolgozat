import { field, ID, inputType } from '@loopback/graphql';
import { DataObject } from '@loopback/repository';
import { Subject } from '../../models';

@inputType()
export class SubjectUpdateInput implements Pick<DataObject<Subject>, 'id' | 'name' | 'description'> {
    @field(returns => ID)
    id: number;
    @field()
    name?: string;
    @field()
    description?: string;
}
