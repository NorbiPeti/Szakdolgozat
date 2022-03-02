import { Entity, model, property } from '@loopback/repository';

@model()
export class CourseUser extends Entity {
    @property({
        type: 'number',
        id: true,
        generated: true,
    })
    id?: number;

    @property({
        type: 'number',
        required: true,
    })
    courseId: number;

    @property({
        type: 'number',
        required: true,
    })
    userId: number;

    @property({
        type: 'string',
        required: true,
    })
    role: string;


    constructor(data?: Partial<CourseUser>) {
        super(data);
    }
}

export interface CourseUserRelations {
    // describe navigational properties here
}

export type CourseUserWithRelations = CourseUser & CourseUserRelations;
