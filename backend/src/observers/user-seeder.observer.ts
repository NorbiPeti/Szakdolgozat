import { lifeCycleObserver, LifeCycleObserver, } from '@loopback/core';
import { UserRepository } from '../repositories';
import { User } from '../models';
import { Mock, MockFactory } from 'mockingbird';
import { genSalt, hash } from 'bcryptjs';

/**
 * This class will be bound to the application as a `LifeCycleObserver` during
 * `boot`
 */
@lifeCycleObserver('Seeders')
export class UserSeederObserver implements LifeCycleObserver {
    constructor(
        @repository(UserRepository) private repository: UserRepository
    ) {
    }

    MAX_USERS = 100;

    /**
     * This method will be invoked when the application starts.
     */
    async start(): Promise<void> {
        if ((await this.repository.count()).count > 0) {
            return;
        }
        console.log('Creating users');
        const transaction = await this.repository.beginTransaction();
        try {
            await this.repository.create({
                email: 'admin@inf.u-szeged.hu',
                name: 'Teszt Admin',
                password: await hash('Jelszó 123', await genSalt()),
                isAdmin: true
            });
            const users = MockFactory(StudentMock).many(this.MAX_USERS);
            let c = 0;
            for (const user of users) {
                user.password = await hash('Jelszó 123', await genSalt());
                if (c >= this.MAX_USERS / 4) {
                    const ns = user.name.split(' ');
                    const prefix = ns[0][0].toLowerCase() + ns[1].toLowerCase();
                    user.email = prefix.replace('\'', '') + '@inf.u-szeged.hu';
                }
                await this.repository.create(user);
                c++;
            }
            await transaction.commit();
        } catch (e) {
            await transaction.rollback();
            throw e;
        }
        console.log('Users added');
    }
}

class StudentMock extends User {
    @Mock(faker => faker.name.firstName() + ' ' + faker.name.lastName())
    name: string;
    @Mock(faker => 'h' + (880000 + faker.datatype.number(9999)) + '@stud.u-szeged.hu')
    email: string;
    isAdmin = false;
}
