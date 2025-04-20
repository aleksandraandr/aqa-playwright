import test, { expect } from "@playwright/test";

test.describe('[VALIDATION] [Demo-login-form] Registration', () => {
    const baseUrl = 'https://anatoly-karpovich.github.io/demo-login-form/';

    const selectors = {
      registerTab: '#registerOnLogin',
      username: '#userNameOnRegister',
      password: '#passwordOnRegister',
      registerButton: '#register',
      errorMessage: '#errorMessageOnRegister'
    };

    const testData = {
      validUsername: 'TestUser123',
      validPassword: 'ValidPass123',
      onlySpaces: ' '.repeat(3),
      tooShortUsername: 'ab',
      tooLongUsername: 'a'.repeat(41),
      usernameWithSpacesAround: '  TestUser  ',
      tooShortPassword: 'Aa1234',
      tooLongPassword: 'Aa' + '1'.repeat(19),
      passwordOnlySpaces: ' '.repeat(3),
      passwordNoUppercase: 'lowercase123',
      passwordNoLowercase: 'UPPERCASE123'
    };

    test.beforeEach(async ({ page }) => {
      await page.goto(baseUrl);
      await page.locator(selectors.registerTab).click();
    });

    test('Username is required', async ({ page }) => {
      await page.fill(selectors.password, testData.validPassword);
      await page.click(selectors.registerButton);
      await expect(page.locator(selectors.errorMessage)).toContainText('Username is required');
    });

    test('Password is required', async ({ page }) => {
      await page.fill(selectors.username, testData.validUsername);
      await page.click(selectors.registerButton);
      await expect(page.locator(selectors.errorMessage)).toContainText('Password is required');
    });

    test('Username is too short', async ({ page }) => {
      await page.fill(selectors.username, testData.tooShortUsername);
      await page.fill(selectors.password, testData.validPassword);
      await page.click(selectors.registerButton);
      await expect(page.locator(selectors.errorMessage)).toContainText('Username should contain at least 3 characters');
    });

    test('Username input should limit input to 40 characters', async ({ page }) => {
      await page.fill(selectors.username, testData.tooLongUsername);
      const inputValue = await page.inputValue(selectors.username);
      expect(inputValue.length).toBeLessThanOrEqual(40);
    });
    
    test('Username has only spaces', async ({ page }) => {
      await page.fill(selectors.username, testData.onlySpaces);
      await page.fill(selectors.password, testData.validPassword);
      await page.click(selectors.registerButton);
      await expect(page.locator(selectors.errorMessage)).toContainText('Prefix and postfix spaces are not allowed is username');
    });
    
    test('Username with leading/trailing spaces', async ({ page }) => {
      await page.fill(selectors.username, testData.usernameWithSpacesAround);
      await page.fill(selectors.password, testData.validPassword);
      await page.click(selectors.registerButton);
      await expect(page.locator(selectors.errorMessage)).toContainText('Prefix and postfix spaces are not allowed is username');
    });
    test('Password is too short', async ({ page }) => {
      await page.fill(selectors.username, testData.validUsername);
      await page.fill(selectors.password, testData.tooShortPassword);
      await page.click(selectors.registerButton);
      await expect(page.locator(selectors.errorMessage)).toContainText('Password should contain at least 8 characters');
    });
  
    test('Password input should limit input to 20 characters', async ({ page }) => {
      await page.fill(selectors.password, testData.tooLongPassword);
      const inputValue = await page.inputValue(selectors.password);
      expect(inputValue.length).toBeLessThanOrEqual(20);
    });

    test('Password without uppercase [KNOWN ISSUE]', async ({ page }) => {
      // Known issue: validation for uppercase characters is commented out in script.js
      // Actual: registration is allowed without uppercase
      // Expected: error message about missing uppercase letter
      await page.fill(selectors.username, testData.validUsername);
      await page.fill(selectors.password, testData.passwordNoUppercase);
      await page.click(selectors.registerButton);
      await expect(page.locator(selectors.errorMessage)).toContainText('Password should contain at least one character in upper case');
    });
        
    test('Password without lowercase', async ({ page }) => {
      await page.fill(selectors.username, testData.validUsername);
      await page.fill(selectors.password, testData.passwordNoLowercase);
      await page.click(selectors.registerButton);
      await expect(page.locator(selectors.errorMessage)).toContainText('Password should contain at least one character in lower case');
    });
        
    test('Password has only spaces', async ({ page }) => {
      await page.fill(selectors.username, testData.validUsername);
      await page.fill(selectors.password, testData.passwordOnlySpaces);
      await page.click(selectors.registerButton);
      await expect(page.locator(selectors.errorMessage)).toContainText('Password is required');
    });
  });