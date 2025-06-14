import test, { expect } from '@playwright/test';
import { SignInController } from 'api/controllers/signin.controller';
import { CustomersController } from 'api/controllers/customer.controllers'; 
import { generateCustomerData } from 'data/customers/generate-customer.data';
import { customersListSchema } from 'data/schemas/customers/customers-list.schema';
import { STATUS_CODES } from 'data/status-codes';
import { validateSchema } from 'utils/validations/schema-validation';

test.describe('[API] [Customers] [Smoke] [Get All]', () => {
  test('Should create a customer and find it in the customers list using controllers', async () => {
    const signInController = new SignInController();
    const customersController = new CustomersController();

    // Login
    const loginResponse = await signInController.login({
      username: process.env.USER_LOGIN!,
      password: process.env.USER_PASSWORD!,
    });
    const authToken = loginResponse.headers.authorization;
    expect.soft(authToken).toBeTruthy();

    // Create a new customer
    const customerData = generateCustomerData();
    const createResponse = await customersController.create(customerData, authToken);
    const createdCustomer = createResponse.body.Customer;
    expect.soft(createResponse.status).toBe(STATUS_CODES.CREATED);

    // Get all customers
    const getAllResponse = await customersController.getAll(authToken);
    expect.soft(getAllResponse.status).toBe(STATUS_CODES.OK);
    validateSchema(getAllResponse.body, customersListSchema);

    // Verify customer is in the list
    const foundCustomer = getAllResponse.body.Customers.find(
      (customer) => customer.email === customerData.email
    );

    expect.soft(foundCustomer).toBeTruthy();
    expect.soft(foundCustomer).toMatchObject(customerData as any);

    // Check IsSuccess and ErrorMessage
    expect.soft(getAllResponse.body.IsSuccess).toBe(true);
    expect.soft(getAllResponse.body.ErrorMessage).toBeNull();

    // Cleanup
    const deleteResponse = await customersController.delete(createdCustomer._id, authToken);
    expect.soft(deleteResponse.status).toBe(STATUS_CODES.DELETED);
  });
});
