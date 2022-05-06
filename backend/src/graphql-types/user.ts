import { User } from '../models';
import { field, Int, objectType } from '@loopback/graphql';
import { ListResponse } from './list';

@objectType()
export class UserResult implements Pick<User, 'id' | 'email' | 'name' | 'isAdmin'> {
    @field()
    email: string;
    @field()
    id?: number;
    @field()
    isAdmin: boolean;
    @field()
    name: string;
}

@objectType()
export class LoginResult {
    @field()
    token: string;
    @field()
    user: UserResult;
}

@objectType()
export class UserList implements ListResponse<UserResult> {
    @field(returns => Int)
    count: number;
    @field(returns => [UserResult])
    list: UserResult[];
}

export const UserProperties = {
    id: {
        type: 'number',
        id: true,
        generated: true,
    },
    email: {
        type: 'string',
        required: true,
        jsonSchema: {
            pattern: /[A-Za-z\d.+_-]+@[A-Za-z.-_]*(u-szeged.hu)|(szte.hu)/.source
        }
    },
    name: {
        type: 'string',
        required: true,
        jsonSchema: {
            pattern: /([A-Za-z-.]+ )+[A-Za-z-.]+/.source
        }
    },
    password: {
        type: 'string',
        required: true,
        jsonSchema: {
            minLength: 8,
            maxLength: 255
        },
        hidden: true
    }
};
