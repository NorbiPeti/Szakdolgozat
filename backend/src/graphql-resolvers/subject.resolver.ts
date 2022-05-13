import { arg, ID, Int, mutation, query, resolver } from '@loopback/graphql';
import { Subject } from '../models';
import { SubjectRepository } from '../repositories';
import { repository } from '@loopback/repository';
import { listResponse, ListResponse } from '../graphql-types/list';
import { SubjectCreateInput, SubjectList, SubjectUpdateInput } from '../graphql-types/subject';

@resolver(of => Subject)
export class SubjectResolver {
    constructor(@repository('SubjectRepository') private subjectRepo: SubjectRepository) {
    }

    @query(returns => SubjectList)
    async subjects(@arg('offset', returns => Int) offset: number, @arg('limit', returns => Int) limit: number): Promise<ListResponse<Subject>> {
        return await listResponse(this.subjectRepo, offset, limit, SubjectList);
    }

    @query(returns => Subject)
    async subject(@arg('id', returns => ID) id: number): Promise<Subject> {
        return await this.subjectRepo.findById(id);
    }

    @mutation(returns => Boolean)
    async subjectUpdate(@arg('subject') input: SubjectUpdateInput): Promise<boolean> {
        await this.subjectRepo.updateById(input.id, input);
        return true;
    }

    @mutation(returns => Boolean)
    async subjectCreate(@arg('subject') input: SubjectCreateInput): Promise<boolean> {
        await this.subjectRepo.create(input);
        return true;
    }
}
