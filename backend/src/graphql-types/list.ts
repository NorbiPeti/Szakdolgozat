import { ClassType, field, inputType } from '@loopback/graphql';
import { DefaultCrudRepository, Entity } from '@loopback/repository';

@inputType()
export class ListInput {
    @field()
    offset: number;
    @field()
    limit: number;
}

export interface ListResponse<T> {
    count: number;
    list: T[];
}

export async function listResponse<T extends Entity, U extends ListResponse<Partial<T>>>(repo: DefaultCrudRepository<T, number>, offset: number, limit: number, listType: ClassType<U>) {
    const list = new listType();
    list.list = await repo.find({offset, limit});
    list.count = (await repo.count()).count;
    return list;
}
