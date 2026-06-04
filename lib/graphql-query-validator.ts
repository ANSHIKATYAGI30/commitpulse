/**
 * lib/graphql-query-validator.ts
 *
 * GraphQL query validation to prevent injection vulnerabilities.
 * Validates query strings before sending to prevent malicious input.
 */

import { parse, validate, buildSchema } from 'graphql';

export interface QueryValidationResult {
  valid: boolean;
  errors?: string[];
}

export function isValidGraphQLQuery(queryString: string): QueryValidationResult {
  if (!queryString || typeof queryString !== 'string') {
    return { valid: false, errors: ['Query must be a non-empty string'] };
  }

  // Check for obvious injection patterns
  const injectionPatterns = [
    /;\s*DROP/i,
    /;\s*DELETE/i,
    /;\s*TRUNCATE/i,
    /;\s*ALTER/i,
    /union\s+select/i,
    /exec\s*\(/i,
    /script\s*>/i,
  ];

  for (const pattern of injectionPatterns) {
    if (pattern.test(queryString)) {
      return { valid: false, errors: ['Query contains potentially malicious patterns'] };
    }
  }

  try {
    const ast = parse(queryString);
    if (!ast) {
      return { valid: false, errors: ['Invalid GraphQL syntax'] };
    }
    return { valid: true };
  } catch (error) {
    return { valid: false, errors: [error instanceof Error ? error.message : 'Invalid GraphQL query'] };
  }
}

export function validateQueryBeforeSending(query: string, schema?: any): QueryValidationResult {
  const syntaxValidation = isValidGraphQLQuery(query);
  if (!syntaxValidation.valid) {
    return syntaxValidation;
  }

  if (schema) {
    try {
      const ast = parse(query);
      const errors = validate(schema, ast);
      if (errors.length > 0) {
        return {
          valid: false,
          errors: errors.map((e) => e.message),
        };
      }
    } catch (error) {
      return { valid: false, errors: [error instanceof Error ? error.message : 'Schema validation failed'] };
    }
  }

  return { valid: true };
}
