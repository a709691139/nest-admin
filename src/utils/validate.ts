import { ValidationError } from 'class-validator';

interface ValidationResult {
  property: string;
  constraints: string;
}
function transTreeValidations(
  results: ValidationResult[],
  property: string,
  error: ValidationError,
) {
  property += '[' + error.property + ']';
  if (error.constraints) {
    Object.keys(error.constraints).forEach(key => {
      results.push({
        property,
        constraints: error.constraints[key],
      });
    });
  } else {
    error.children.forEach(v => {
      transTreeValidations(results, property, v);
    });
  }
}
export function transValidationErrors(errors: ValidationError[]) {
  const results: ValidationResult[] = [];
  errors.forEach(v => {
    transTreeValidations(results, '', v);
  });
  return results;
}
