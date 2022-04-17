import { User } from '../models';

export class LoginResult {
    token: string;
    user: Omit<User, 'id' | 'password'>;
}
