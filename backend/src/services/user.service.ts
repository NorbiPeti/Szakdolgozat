// Copyright IBM Corp. 2020. All Rights Reserved.
// Node module: @loopback/authentication-jwt
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import { UserService } from '@loopback/authentication';
import { repository } from '@loopback/repository';
import { HttpErrors } from '@loopback/rest';
import { securityId, UserProfile } from '@loopback/security';
import { compare } from 'bcryptjs';
import { User, UserWithRelations } from '../models';
import { UserRepository } from '../repositories';

/**
 * A pre-defined type for user credentials. It assumes a user logs in
 * using the email and password. You can modify it if your app has different credential fields
 */
export type Credentials = {
    email: string;
    password: string;
};

export class SzakdolgozatUserService implements UserService<User, Credentials> {
    constructor(
        @repository(UserRepository) public userRepository: UserRepository,
    ) {
    }

    async verifyCredentials(credentials: Credentials): Promise<User> {
        const invalidCredentialsError = 'Invalid email or password.';

        const foundUser = await this.userRepository.findOne({
            where: {email: credentials.email},
        });
        if (!foundUser) {
            throw new HttpErrors.Unauthorized(invalidCredentialsError);
        }

        const passwordMatched = await compare(
            credentials.password,
            foundUser.password,
        );

        if (!passwordMatched) {
            throw new HttpErrors.Unauthorized(invalidCredentialsError);
        }

        return foundUser;
    }

    convertToUserProfile({email, id, name}: User): UserProfile {
        return {
            [securityId]: id!.toString(),
            name,
            id,
            email,
        };
    }

    //function to find user by id
    async findUserById(id: number): Promise<User & UserWithRelations> {
        const userNotfound = 'invalid user';
        const foundUser = await this.userRepository.findById(id);

        if (!foundUser) {
            throw new HttpErrors.Unauthorized(userNotfound);
        }
        return foundUser;
    }
}
