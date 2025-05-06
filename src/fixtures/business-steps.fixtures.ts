import { SALES_PORTAL_URL, USER_LOGIN, USER_PASSWORD } from '../config/environment';
import { test as base } from 'fixtures/pages.fixture';
import { SignInPage } from 'ui/pages/sign-in.page';

interface IBusinessSteps {
  loginAsLocalUser(): Promise<void>;
}

export const test = base.extend<IBusinessSteps>({
  loginAsLocalUser: async ({ page, homePage }, use) => {
    await use(async () => {
      await page.goto(SALES_PORTAL_URL);

      const signInPage = new SignInPage(page);
      await signInPage.fillCredentials(USER_LOGIN, USER_PASSWORD);
      await signInPage.clickLogin();
      
      await homePage.waitForOpened();
    });
  },
});

export { expect } from '@playwright/test';