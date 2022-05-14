import { jsonToSchemaObject, modelToJsonSchema, validateValueAgainstSchema } from '@loopback/rest';
import { ClassType } from '@loopback/graphql';

export function validated<T>(type: ClassType) {
    return {validate: (input: T) => validateValueAgainstSchema(input, jsonToSchemaObject(modelToJsonSchema(type)))};
}

