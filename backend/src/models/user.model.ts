import { Entity, hasMany, model, property } from '@loopback/repository';
import { Course } from './course.model';
import { CourseUser } from './course-user.model';
import { field, objectType } from '@loopback/graphql';
import { UserProperties } from '../graphql-types/user';
import { Requirement } from './requirement.model';
import { UserFulfillRequirement } from './user-fulfill-requirement.model';

@model()
@objectType()
export class User extends Entity {
    @property(UserProperties.id)
    @field()
    id?: number;

    @property(UserProperties.email)
    @field()
    email: string;

    @property(UserProperties.name)
    @field()
    name: string;

    @property(UserProperties.password)
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

    @hasMany(() => Requirement, {through: {model: () => UserFulfillRequirement}})
    completedRequirements: Requirement[];

    constructor(data?: Partial<User>) {
        super(data);
    }
}

export interface UserRelations {
    // describe navigational properties here
}

export type UserWithRelations = User & UserRelations;
