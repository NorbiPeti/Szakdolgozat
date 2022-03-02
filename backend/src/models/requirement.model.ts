import { Entity, model, property } from '@loopback/repository';

@model()
export class Requirement extends Entity {
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
    name: string;

    @property({
        type: 'number',
        required: true,
    })
    maxPoints: number;

    @property({
        type: 'string',
        required: true,
    })
    type: string;

    @property({
        type: 'number',
    })
    courseId?: number;

    constructor(data?: Partial<Requirement>) {
        super(data);
    }
}

export interface RequirementRelations {
    // describe navigational properties here
}

export type RequirementWithRelations = Requirement & RequirementRelations;
