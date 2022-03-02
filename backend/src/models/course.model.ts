import { Entity, model, property, belongsTo, hasMany } from '@loopback/repository';
import { Subject } from './subject.model';
import { User } from './user.model';
import { CourseUser } from './course-user.model';
import { Requirement } from './requirement.model';

@model()
export class Course extends Entity {
    @property({
        type: 'number',
        id: true,
        generated: true,
    })
    id?: number;

    @property({
        type: 'string',
        required: true,
    })
    semester: string;

    @belongsTo(() => Subject)
    subjectId: number;

    @hasMany(() => User, {through: {model: () => CourseUser}})
    users: User[];

    @hasMany(() => Requirement)
    requirements: Requirement[];

    constructor(data?: Partial<Course>) {
        super(data);
    }
}

export interface CourseRelations {
    // describe navigational properties here
}

export type CourseWithRelations = Course & CourseRelations;
