import { field, inputType } from '@loopback/graphql';
import { User } from '../../models';
import { model, property } from '@loopback/repository';

@model()
@inputType()
export class UserRegisterInput implements Pick<User, 'email' | 'name' | 'password'> {
    @property({
        type: 'string',
        required: true,
        jsonSchema: {
            pattern: /[A-Za-z0-9.+_-]+@[A-Za-z.-_]*(u-szeged.hu)|(szte.hu)/.source
        }
    })
    @field()
    email: string;
    @property({
        type: 'string',
        required: true,
        jsonSchema: {
            pattern: /([A-Za-z-.]+ )+[A-Za-z-.]+/.source
        }
    })
    @field()
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
    @field()
    password: string;
}
