import { Entity, model, property } from '@loopback/repository';

@model()
export class RevToken extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: false,
    required: true,
  })
  token: string;


  constructor(data?: Partial<RevToken>) {
    super(data);
  }
}

export interface RevTokenRelations {
  // describe navigational properties here
}

export type RevTokenWithRelations = RevToken & RevTokenRelations;
