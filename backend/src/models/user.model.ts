import { Entity, hasMany, model, property } from '@loopback/repository';
import { Course } from './course.model';
import { CourseUser } from './course-user.model';
import { field, objectType } from '@loopback/graphql';

@model()
@objectType()
export class User extends Entity {
    @property({
        type: 'number',
        id: true,
        generated: true,
    })
    @field()
    id?: number;

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

    @property({
        type: 'boolean',
        required: true,
    })
    @field()
    isAdmin: boolean;

    @hasMany(() => Course, {through: {model: () => CourseUser}})
        //@field()
    courses: Course[];

    constructor(data?: Partial<User>) {
        super(data);
    }
}

export interface UserRelations {
    // describe navigational properties here
}

export type UserWithRelations = User & UserRelations;
