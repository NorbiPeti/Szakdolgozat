import { User } from '../models';
import { field, ID, inputType, Int, objectType } from '@loopback/graphql';
import { ListResponse } from './list';
import { model, property } from '@loopback/repository';

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
    @field(returns => [String])
    roles: string[];
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
        },
        index: {
            unique: true
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

@model()
@inputType()
export class UserRegisterInput implements Pick<User, 'email' | 'name' | 'password'> {
    @property(UserProperties.email)
    @field()
    email: string;
    @property(UserProperties.name)
    @field()
    name: string;
    @property(UserProperties.password)
    @field()
    password: string;
}

@inputType()
export class UserUpdateInput implements Partial<Pick<User, 'id' | 'name' | 'email' | 'password' | 'isAdmin'>> {
    @field(returns => ID)
    id: number;
    @field({nullable: true})
    @property(UserProperties.email)
    email?: string;
    @field({nullable: true})
    @property(UserProperties.name)
    name?: string;
    @field({nullable: true})
    @property(UserProperties.password)
    password?: string;
    @field({nullable: true})
    isAdmin?: boolean;
}
