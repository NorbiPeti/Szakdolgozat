import { Entity, model, property } from '@loopback/repository';

@model()
export class UserFulfillRequirement extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'number',
    required: true,
  })
  points: number;

  @property({
    type: 'date',
    required: true,
  })
  dateTime: string;

  @property({
    type: 'number',
  })
  userId?: number;

  @property({
    type: 'number',
  })
  requirementId?: number;

  constructor(data?: Partial<UserFulfillRequirement>) {
    super(data);
  }
}

export interface UserFulfillRequirementRelations {
  // describe navigational properties here
}

export type UserFulfillRequirementWithRelations = UserFulfillRequirement & UserFulfillRequirementRelations;
