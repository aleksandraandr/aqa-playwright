import test, { expect } from "@playwright/test";

test.describe('[SMOKE] [Demo-login-form] Registration', () => {
    const baseUrl = 'https://anatoly-karpovich.github.io/demo-login-form/';

    const selectors = {
      registerTab: '#registerOnLogin',
      username: '#userNameOnRegister',
      password: '#passwordOnRegister',
      registerButton: '#register',
      message: '#errorMessageOnRegister'
    };
    
    const testData = {
      validUsername: 'TestUser123',
      validPassword: 'ValidPass123',
      usernameMinLength: 'abc',
      usernameMaxLength: 'a'.repeat(40),
      passwordMinLength: 'Aa123456',
      passwordMaxLength: 'Aa' + '1'.repeat(18),
    };
    
    const successText = 'Successfully registered! Please, click Back to return on login page';

    test.beforeEach(async ({ page }) => {
      await page.goto(baseUrl);
      await page.locator(selectors.registerTab).click();
    });

    test('Register with valid data', async ({ page }) => {
      await page.fill(selectors.username, testData.validUsername);
      await page.fill(selectors.password, testData.validPassword);
      await page.click(selectors.registerButton);
      await expect(page.locator(selectors.message)).toHaveText(successText);
    });

    test('Register with minimum allowed lengths', async ({ page }) => {
      await page.fill(selectors.username, testData.usernameMinLength);
      await page.fill(selectors.password, testData.passwordMinLength);
      await page.click(selectors.registerButton);
      await expect(page.locator(selectors.message)).toHaveText(successText);
    });

    test('Register with maximum allowed lengths', async ({ page }) => {
      await page.fill(selectors.username, testData.usernameMaxLength);
      await page.fill(selectors.password, testData.passwordMaxLength);
      await page.click(selectors.registerButton);
      await expect(page.locator(selectors.message)).toHaveText(successText);
    })
  });


