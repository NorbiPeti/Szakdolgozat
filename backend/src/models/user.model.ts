import {Entity, model, property} from '@loopback/repository';

@model()
export class User extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
    jsonSchema: {
      pattern: /[A-Za-z0-9.+_-]+@[A-Za-z.-_]*(u-szeged.hu)|(szte.hu)/.source
    }
  })
  email: string;

  @property({
    type: 'string',
    required: true,
    jsonSchema: {
      pattern: /([A-Za-z-.]+ )+[A-Za-z-.]+/.source
    }
  })
  name: string;

  @property({
    type: 'string',
    required: true,
    jsonSchema: {
      minLength: 8,
      maxLength: 255
    },
    hidden: true
  })
  password: string;

  @property({
    type: 'string',
    required: true,
  })
  role: 'admin' | 'teacher' | 'student';


  constructor(data?: Partial<User>) {
    super(data);
  }
}

export interface UserRelations {
  // describe navigational properties here
}

export type UserWithRelations = User & UserRelations;
