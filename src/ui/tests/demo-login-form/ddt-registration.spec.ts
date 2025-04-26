import { test, expect } from '@playwright/test';
import { negativeTestData } from 'data/demo-login-form/negative-test-data';

test.describe('[DDT] [Demo-login-form] Negative registration cases', () => {
  const baseUrl = 'https://anatoly-karpovich.github.io/demo-login-form/';

  const selectors = {
    registerTab: '#registerOnLogin',
    username: '#userNameOnRegister',
    password: '#passwordOnRegister',
    registerButton: '#register',
    errorMessage: '#errorMessageOnRegister'
  };

  negativeTestData.forEach(({ testName, username, password, expectedError, knownIssue }) => {
    test(testName, async ({ page }) => {
        if (knownIssue) {
          console.warn(`Known issue: ${testName}`);
        }

      await page.goto(baseUrl);
      await page.locator(selectors.registerTab).click();
      await page.fill(selectors.username, username);
      await page.fill(selectors.password, password);
      await page.click(selectors.registerButton);
      await expect(page.locator(selectors.errorMessage)).toContainText(expectedError);
    });
  });
});