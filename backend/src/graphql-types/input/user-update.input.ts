import { User } from '../../models';
import { field, inputType } from '@loopback/graphql';
import { UserProperties } from '../user';
import { property } from '@loopback/repository';

@inputType()
export class UserUpdateInput implements Partial<Pick<User, 'name' | 'email' | 'password' | 'isAdmin'>> {
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
