import { test, expect } from '@playwright/test';

test.describe('[LIMITATION] [Demo-login-form] Input field length limits', () => {
  const baseUrl = 'https://anatoly-karpovich.github.io/demo-login-form/';

  const selectors = {
    registerTab: '#registerOnLogin',
    username: '#userNameOnRegister',
    password: '#passwordOnRegister'
  };

  test('Username input should limit to 40 characters', async ({ page }) => {
    await page.goto(baseUrl);
    await page.locator(selectors.registerTab).click();
    await page.fill(selectors.username, 'a'.repeat(41));
    const value = await page.inputValue(selectors.username);
    expect(value.length).toBeLessThanOrEqual(40);
  });

  test('Password input should limit to 20 characters', async ({ page }) => {
    await page.goto(baseUrl);
    await page.locator(selectors.registerTab).click();
    await page.fill(selectors.password, 'A1'.repeat(20));
    const value = await page.inputValue(selectors.password);
    expect(value.length).toBeLessThanOrEqual(20);
  });
});