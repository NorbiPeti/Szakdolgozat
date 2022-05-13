import { repository } from '@loopback/repository';
import { CourseRepository, SubjectRepository, UserRepository } from '../repositories';
import { arg, ID, Int, mutation, query, resolver } from '@loopback/graphql';
import { Course } from '../models';
import { listResponse, ListResponse } from '../graphql-types/list';
import { CourseCreateInput, CourseList, CourseUpdateInput } from '../graphql-types/course';

@resolver(of => Course)
export class CourseResolver {
    constructor(
        @repository('CourseRepository') private courseRepo: CourseRepository,
        @repository('SubjectRepository') private subjectRepo: SubjectRepository,
        @repository('UserRepository') private userRepo: UserRepository
    ) {
    }

    @query(returns => CourseList)
    async coursesBySubject(@arg('subject', returns => ID) subject: number, @arg('offset', returns => Int) offset: number, @arg('limit', returns => Int) limit: number): Promise<ListResponse<Course>> {
        return listResponse(this.subjectRepo.courses(subject), offset, limit, CourseList);
    }

    @query(returns => CourseList)
    async coursesByUser(@arg('user', returns => ID) user: number, @arg('offset', returns => Int) offset: number, @arg('limit', returns => Int) limit: number): Promise<ListResponse<Course>> {
        return listResponse(this.userRepo.courses(user), offset, limit, CourseList);
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

    @mutation(returns => Boolean)
    async courseCreate(@arg('course') input: CourseCreateInput): Promise<boolean> {
        await this.courseRepo.create(input);
        return true;
    }
}
