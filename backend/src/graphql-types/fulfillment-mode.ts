import { ListResponse } from './list';
import { FulfillmentMode } from '../models';
import { field, inputType, Int, objectType } from '@loopback/graphql';
import { DataObject } from '@loopback/repository';

@objectType()
export class FulfillmentModeList implements ListResponse<FulfillmentMode> {
    @field(returns => Int)
    count: number;
    @field(returns => [FulfillmentMode])
    list: FulfillmentMode[];
}

@inputType()
export class FulfillmentModeUpdateInput implements Omit<DataObject<FulfillmentMode>, 'requirements' | 'courseId'> {
    @field(returns => Int)
    id: number;
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
}
