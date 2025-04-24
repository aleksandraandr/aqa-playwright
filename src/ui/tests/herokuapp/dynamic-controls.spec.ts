import { test, expect } from "@playwright/test";

test.describe('[UI] [Herokuapp] Dynamic Controls', () => {
  test('Dynamic Controls test', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/');
    await page.getByRole('link', { name: 'Dynamic Controls', exact: true}).click();
    await expect(page).toHaveURL('https://the-internet.herokuapp.com/dynamic_controls');
    await page.getByRole('button', { name: 'Remove' }).waitFor({ state: 'visible' });
    await expect(page.getByRole('heading', { name: 'Dynamic Controls' })).toHaveText('Dynamic Controls');
    await expect(page.locator('p')).toHaveText('This example demonstrates when elements (e.g., checkbox, input field, etc.) are changed asynchronously.');
    const checkbox = page.locator('#checkbox input[type="checkbox"]');
    await expect(checkbox).toBeVisible();
    await checkbox.check();
    await page.getByRole('button', { name: 'Remove' }).click();
    await page.locator('#checkbox').waitFor({ state: 'detached' });
    const addButton = page.getByRole('button', { name: 'Add' });
    await expect(addButton).toBeVisible();
    await expect(page.locator('#message')).toHaveText("It's gone!");
    await addButton.click();
    await page.locator('input[type="checkbox"]').waitFor({ state: 'attached', timeout: 7000 });
    await expect(page.locator('input[type="checkbox"]')).toBeVisible();
    await expect(page.locator('#message')).toHaveText("It's back!");
  });
});