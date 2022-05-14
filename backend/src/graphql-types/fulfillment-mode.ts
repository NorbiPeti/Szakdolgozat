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
    @field(returns => Int)
    threshold2: number;
    @field(returns => Int)
    threshold3: number;
    @field(returns => Int)
    threshold4: number;
    @field(returns => Int)
    threshold5: number;
    @field(returns => ID)
    courseId: number;
}

@inputType()
export class FulfillmentModeUpdateInput extends FulfillmentModeCreateInput {
    @field(returns => ID)
    id: number;
}
