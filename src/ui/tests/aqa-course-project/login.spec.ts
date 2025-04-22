import { test, expect } from "@playwright/test";

test.describe('[UI] [aqa-course-project] Login', () => {
    test('Login and UI verification + waitForFunction', async ({ page }) => {
        await page.goto('https://anatoly-karpovich.github.io/aqa-course-project/#');
        await page.getByLabel('Email address').fill('test@gmail.com');
        await page.getByLabel('Password').fill('12345678');
        await page.getByRole('button', { name: 'Login' }).click();
        await page.waitForFunction(() => {
            const spinners = document.querySelectorAll('.spinner-border');
            return spinners.length === 0;
          }, { timeout: 7000 });
        const userDisplay = page.getByText('Anatoly', { exact: false });
        await expect(userDisplay).toBeVisible();
        const sidebar = page.locator('#sidebar');
        await expect(sidebar).toHaveScreenshot('sidebar-home.png');
    });

    test('Login and UI verification + toHaveCount', async ({ page }) => {
        await page.goto('https://anatoly-karpovich.github.io/aqa-course-project/#');
        await page.getByLabel('Email address').fill('test@gmail.com');
        await page.getByLabel('Password').fill('12345678');
        await page.getByRole('button', { name: 'Login' }).click();
        const spinners = page.locator('.spinner-border');
        await expect(spinners).toHaveCount(0, { timeout: 7000 });
        const userDisplay = page.getByText('Anatoly', { exact: false });
        await expect(userDisplay).toBeVisible();
        const sidebar = page.locator('#sidebar');
        await expect(sidebar).toHaveScreenshot('sidebar-home.png');
    });

});