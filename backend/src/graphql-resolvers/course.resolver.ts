import { repository } from '@loopback/repository';
import { CourseRepository } from '../repositories';
import { arg, ID, Int, mutation, query, resolver } from '@loopback/graphql';
import { Course } from '../models';
import { CourseUpdateInput } from '../graphql-types/input/course-update.input';
import { listResponse, ListResponse } from '../graphql-types/list';
import { CourseList } from '../graphql-types/course';

@resolver(of => Course)
export class CourseResolver {
    constructor(
        @repository('CourseRepository') private courseRepo: CourseRepository
    ) {
    }

    @query(returns => CourseList)
    async courses(@arg('offset', returns => Int) offset: number, @arg('limit', returns => Int) limit: number): Promise<ListResponse<Course>> {
        return listResponse(this.courseRepo, offset, limit, CourseList);
    }

    @query(returns => Course)
    async course(@arg('id', returns => ID) id: number): Promise<Course> {
        return await this.courseRepo.findById(id);
    }

    @mutation(returns => Boolean)
    async courseUpdate(@arg('course') input: CourseUpdateInput): Promise<boolean> {
        await this.courseRepo.updateById(input.id, input);
        return true;
    }
}
