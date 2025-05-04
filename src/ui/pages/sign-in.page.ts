import { Locator } from '@playwright/test';
import { SalesPortalPage } from 'ui/pages/sales-portal.page';

export class SignInPage extends SalesPortalPage {
  readonly emailInput = this.page.locator("#emailinput");
  readonly passwordInput = this.page.locator("#passwordinput");
  readonly loginButton = this.page.locator('button[type="submit"]');
  
  readonly uniqueElement = this.loginButton;

  public async fillCredentials(email: string, password: string): Promise<void> {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
  }

  public async clickLogin(): Promise<void> {
    await this.loginButton.click();
  }
}

  
