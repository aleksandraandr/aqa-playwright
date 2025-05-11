import test, { expect } from '@playwright/test';
import { apiConfig } from 'config/api-config';
import { USER_LOGIN, USER_PASSWORD } from 'config/environment';
import { generateCustomerData } from 'data/customers/generate-customer.data';
import { customersListSchema } from 'data/schemas/customers/customers-list.schema';
import { STATUS_CODES } from 'data/status-codes';
import { validateSchema } from 'utils/validations/schema-validation';

test.describe('[API] [Customers] [Smoke] [Get All]', () => {
  test('Should create a customer and find it in the customers list', async ({ request }) => {
    // Login
    const loginResponse = await request.post(apiConfig.BASE_URL + apiConfig.ENDPOINTS.LOGIN, {
        data: { username: USER_LOGIN, password: USER_PASSWORD },
        headers: {
          'content-type': 'application/json',
        },
    });

    const authToken = loginResponse.headers()['authorization'];
    expect.soft(loginResponse.status()).toBe(STATUS_CODES.OK);
    expect.soft(authToken).toBeTruthy();

    // Create a new customer
    const customerData = generateCustomerData();
    const createResponse = await request.post(apiConfig.BASE_URL + apiConfig.ENDPOINTS.CUSTOMERS, {
        data: customerData,
        headers: {
          'content-type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
    });

    const createdCustomer = await createResponse.json();
    const createdId = createdCustomer.Customer._id;
    expect.soft(createResponse.status()).toBe(STATUS_CODES.CREATED);

    // Get all customers
    const getResponse = await request.get(apiConfig.BASE_URL + apiConfig.ENDPOINTS.CUSTOMERS, {
        headers: {
          'content-type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
    });

    const customersList = await getResponse.json();

    // Validate schema
    validateSchema(customersList, customersListSchema);

    // Check status code
    expect.soft(getResponse.status()).toBe(STATUS_CODES.OK);

    // Check that created customer exists in response array
    const foundCustomer = customersList.Customers.find(
        (customer: any) => customer.email === customerData.email
      );
      
      expect.soft(foundCustomer).toBeTruthy();
      expect.soft(foundCustomer).toMatchObject({
        _id: createdCustomer.Customer._id, 
        email: customerData.email,
        name: customerData.name,
        country: customerData.country,
        city: customerData.city,
        street: customerData.street,
        house: customerData.house,
        flat: customerData.flat,
        phone: customerData.phone,
        notes: customerData.notes,
      });

    // Check IsSuccess and ErrorMessage
    expect.soft(customersList.IsSuccess).toBe(true);
    expect.soft(customersList.ErrorMessage).toBe(null);

    // Delete the created customer
    await request.delete(apiConfig.BASE_URL + apiConfig.ENDPOINTS.CUSTOMER_BY_ID(createdId), {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
    });
  });
});