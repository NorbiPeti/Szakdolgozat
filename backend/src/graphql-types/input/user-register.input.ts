import { field, inputType } from '@loopback/graphql';
import { User } from '../../models';
import { model, property } from '@loopback/repository';
import { UserProperties } from '../user';

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
