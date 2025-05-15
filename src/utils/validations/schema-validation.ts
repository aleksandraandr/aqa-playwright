import { expect } from '@playwright/test';
import Ajv from 'ajv';

export function validateSchema(expectedSchema: object, body: object) {
  // Disable strict mode
  const ajv = new Ajv({ strict: false });

  const validate = ajv.compile(expectedSchema);
  const isValid = validate(body);

  if (!isValid) {
    console.log('Schema validation failed:');
    console.log(validate.errors);
    expect.soft(validate.errors, 'Should not have json schema errors').toMatchObject([]);
  }

  expect.soft(isValid, 'Actual should match expected').toBe(true);
}

