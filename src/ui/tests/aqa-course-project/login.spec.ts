import { test, expect } from "@playwright/test";

test.describe('[UI] [aqa-course-project] Login', () => {
    test('Login and UI verification', async ({ page }) => {
        await page.goto('https://anatoly-karpovich.github.io/aqa-course-project/#');
        await page.getByLabel('Email address').fill('test@gmail.com');
        await page.getByLabel('Password').fill('12345678');
        await page.getByRole('button', { name: 'Login' }).click();
        await page.waitForSelector('.spinner-border', { state: 'visible', timeout: 2000 });
        await page.waitForSelector('.spinner-border', { state: 'detached' });
        const userDisplay = page.getByText('Anatoly', { exact: false });
        await expect(userDisplay).toBeVisible();
        const sidebar = page.locator('#sidebar');
        await expect(sidebar).toHaveScreenshot('sidebar-home.png');
    });
});