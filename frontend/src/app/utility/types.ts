import { Scalars } from '../services/graphql';

export type HasID = { id: Scalars['ID'] };
export type QueryResult<T extends HasID> = { [entityName: string]: T };
export type MutationInput<T extends Partial<U>, U extends HasID> = { input: T };
export type ListInput = { limit: number; offset: number };
export type ListVariableType<V extends object | undefined> = (V extends object ? V : {}) & ListInput;
