import test, { expect } from '@playwright/test';
import { USER_LOGIN, USER_PASSWORD } from 'config/environment';
import { STATUS_CODES } from 'data/status-codes';
import { loginSchema } from 'data/schemas/login.schema';
import { validateSchema } from 'utils/validations/schema-validation';
import { SignInController } from 'api/controllers/signin.controller';

test.describe('[API] [Login] [Smoke]', () => {
  test('Should login with valid credentials using controller', async () => {
    const signInController = new SignInController();

    const credentials = { username: USER_LOGIN, password: USER_PASSWORD };
    const response = await signInController.login(credentials);

    expect.soft(response.status).toBe(STATUS_CODES.OK);
    const authToken = response.headers.authorization;
    expect.soft(authToken).toBeTruthy();
    validateSchema(response.body, loginSchema);
    expect.soft(response.body.IsSuccess).toBe(true);
    expect.soft(response.body.ErrorMessage).toBeNull();
  });
});
