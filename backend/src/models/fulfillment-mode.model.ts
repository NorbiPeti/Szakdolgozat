import { Entity, hasMany, model, property } from '@loopback/repository';
import { Requirement } from './requirement.model';
import { field, ID, Int, objectType } from '@loopback/graphql';

@model()
@objectType()
export class FulfillmentMode extends Entity {
    @property({
        type: 'number',
        id: true,
        generated: true,
    })
    @field(returns => ID)
    id?: number;

    @property({
        type: 'string',
        required: true,
    })
    @field()
    name: string;

    @property({
        type: 'number',
        required: true,
    })
    @field(returns => Int)
    threshold2: number;

    @property({
        type: 'number',
        required: true,
    })
    @field(returns => Int)
    threshold3: number;

    @property({
        type: 'number',
        required: true,
    })
    @field(returns => Int)
    threshold4: number;

    @property({
        type: 'number',
        required: true,
    })
    @field(returns => Int)
    threshold5: number;

    @property({
        type: 'number',
    })
    courseId?: number;

    @hasMany(() => Requirement)
    requirements: Requirement[];

    constructor(data?: Partial<FulfillmentMode>) {
        super(data);
    }
}

export interface FulfillmentModeRelations {
    // describe navigational properties here
}

export type FulfillmentModeWithRelations = FulfillmentMode & FulfillmentModeRelations;
