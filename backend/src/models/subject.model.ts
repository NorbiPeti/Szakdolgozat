import { Entity, hasMany, model, property } from '@loopback/repository';
import { Course } from './course.model';
import { field, objectType } from '@loopback/graphql';

@model()
@objectType()
export class Subject extends Entity {
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
    name: string;

    @property({
        type: 'string',
    })
    @field()
    description?: string;

    @hasMany(() => Course)
    courses: Course[];

    constructor(data?: Partial<Subject>) {
        super(data);
    }
}

export interface SubjectRelations {
    // describe navigational properties here
}

export type SubjectWithRelations = Subject & SubjectRelations;
