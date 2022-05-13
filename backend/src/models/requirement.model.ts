import { Entity, model, property } from '@loopback/repository';
import { field, ID, Int, objectType } from '@loopback/graphql';

@model()
@objectType()
export class Requirement extends Entity {
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
    type: 'string',
    required: true,
  })
  @field()
  description: string;

  @property({
    type: 'number',
    required: true,
  })
  @field(returns => Int)
  minPoints: number;

  @property({
    type: 'number',
    required: true,
  })
  @field(returns => Int)
  maxPoints: number;

  @property({
    type: 'date',
    required: true,
  })
  @field()
  deadline: Date;

  @property({
    type: 'number',
  })
  fulfillmentModeId?: number;

  constructor(data?: Partial<Requirement>) {
    super(data);
  }
}

export interface RequirementRelations {
    // describe navigational properties here
}

export type RequirementWithRelations = Requirement & RequirementRelations;
