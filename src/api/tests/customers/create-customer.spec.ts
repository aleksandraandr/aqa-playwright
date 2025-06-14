import { test, expect } from 'fixtures/controllers.fixture';
import { validCustomers } from 'data/customers/valid-customer.data';
import { invalidCustomers } from 'data/customers/invalid-customer.data';
import { STATUS_CODES } from 'data/status-codes';
import { validateSchema } from 'utils/validations/schema-validation';
import { customerSchema } from 'data/schemas/customers/customer.schema';  
import { SignInController } from 'api/controllers/signin.controller';
import { USER_LOGIN, USER_PASSWORD } from 'config/environment';

test.describe('[API] [Customers] [Create]', () => {
  let authToken: string;
  let createdCustomerId: string | null = null;
  const signInController = new SignInController();

  test.beforeAll(async () => {
    const loginResponse = await signInController.login({
      username: USER_LOGIN,
      password: USER_PASSWORD,
    });
    authToken = loginResponse.headers.authorization;
    expect(authToken).toBeTruthy();
  });

  test.describe('[Positive]', () => {
    validCustomers.forEach((customer, index) => {
      test(`Should create customer #${index + 1} successfully using controller`, async ({ customersController }) => {
        const createResponse = await customersController.create(customer, authToken);
        createdCustomerId = createResponse.body.Customer._id;

        expect(createResponse.status).toBe(STATUS_CODES.CREATED);
        validateSchema(customerSchema, createResponse.body);
        expect(createResponse.body.Customer).toMatchObject(customer as any);
        expect(createResponse.body.IsSuccess).toBe(true);
        expect(createResponse.body.ErrorMessage).toBeNull();
      });

      test.afterEach(async ({ customersController }) => {
        if (createdCustomerId) {
          const deleteResponse = await customersController.delete(createdCustomerId, authToken);
          expect(deleteResponse.status).toBe(STATUS_CODES.DELETED);
          createdCustomerId = null;
        }
      });
    });
  });

  test.describe('[Negative]', () => {
    invalidCustomers.forEach((invalidCustomer, index) => {
      test(`Should NOT create invalid customer #${index + 1}`, async ({ customersController }) => {
        const response = await customersController.create(
          invalidCustomer as any, // безопасное приведение
          authToken
        );

        expect(response.status).toBeGreaterThanOrEqual(400);
        expect(response.body.IsSuccess).toBe(false);
        expect(typeof response.body.ErrorMessage === 'string' || response.body.ErrorMessage === null).toBe(true);
      });
    });
  });
});
