import { belongsTo, Entity, hasMany, model, property } from '@loopback/repository';
import { Subject } from './subject.model';
import { User } from './user.model';
import { CourseUser } from './course-user.model';
import { field, objectType } from '@loopback/graphql';
import { FulfillmentMode } from './fulfillment-mode.model';

@model()
@objectType()
export class Course extends Entity {
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
    })
    @field()
    semester: string;

    @property({
        type: 'string',
        required: true,
    })
    @field()
    alias: string;

    @belongsTo(() => Subject)
    @field()
    subjectId: number;

    @hasMany(() => User, {through: {model: () => CourseUser}})
    users: User[];

    @hasMany(() => FulfillmentMode)
    fulfillmentModes: FulfillmentMode[];

    constructor(data?: Partial<Course>) {
        super(data);
    }
}

export interface CourseRelations {
    // describe navigational properties here
}

export type CourseWithRelations = Course & CourseRelations;
