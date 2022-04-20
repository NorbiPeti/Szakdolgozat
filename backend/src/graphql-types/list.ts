import { field, inputType, objectType } from '@loopback/graphql';

@inputType()
export class ListInput {
    @field()
    offset: number;
    @field()
    limit: number;
}

@objectType()
export class ListResponse<T> {
    @field()
    count: number;
    @field()
    list: T[];
}
