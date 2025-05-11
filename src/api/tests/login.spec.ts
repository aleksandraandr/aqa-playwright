import test, { expect } from '@playwright/test';
import { apiConfig } from 'config/api-config';
import { USER_LOGIN, USER_PASSWORD } from 'config/environment';
import { STATUS_CODES } from 'data/status-codes';
import { loginSchema } from 'data/schemas/login.schema';
import { validateSchema } from 'utils/validations/schema-validation';

test.describe('[API] [Login] [Smoke]', () => {
  test('Should login with valid data', async ({ request }) => {
    const loginResponse = await request.post(apiConfig.BASE_URL + apiConfig.ENDPOINTS.LOGIN, {
      data: { username: USER_LOGIN, password: USER_PASSWORD },
      headers: {
        'content-type': 'application/json',
      },
    });

    const headers = loginResponse.headers();
    const authToken = headers['authorization'];
    const responseBody = await loginResponse.json();
    
    expect.soft(loginResponse.status()).toBe(STATUS_CODES.OK);
    expect.soft(authToken).toBeTruthy();
    validateSchema(responseBody, loginSchema);
  });
});
