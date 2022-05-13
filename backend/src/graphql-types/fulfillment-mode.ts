import { ListResponse } from './list';
import { FulfillmentMode } from '../models';
import { field, ID, inputType, Int, objectType } from '@loopback/graphql';
import { DataObject } from '@loopback/repository';

@objectType()
export class FulfillmentModeList implements ListResponse<FulfillmentMode> {
    @field(returns => Int)
    count: number;
    @field(returns => [FulfillmentMode])
    list: FulfillmentMode[];
}

@inputType()
export class FulfillmentModeCreateInput implements Omit<DataObject<FulfillmentMode>, 'requirements' | 'courseId'> {
    @field()
    name: string;
    @field()
    threshold2: number;
    @field()
    threshold3: number;
    @field()
    threshold4: number;
    @field()
    threshold5: number;
    @field(returns => ID)
    courseId: number;
}

@inputType()
export class FulfillmentModeUpdateInput extends FulfillmentModeCreateInput {
    @field(returns => ID)
    id: number;
}
