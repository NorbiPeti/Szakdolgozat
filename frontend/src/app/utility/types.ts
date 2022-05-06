import { Scalars } from '../services/graphql';

export type HasID = { id: Scalars['ID'] };
export type QueryResult<T extends HasID> = { [entityName: string]: T };
export type MutationInput<T extends Partial<U>, U extends HasID> = { input: T };
