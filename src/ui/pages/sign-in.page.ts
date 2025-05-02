import { Locator, Page } from '@playwright/test';
import { SalesPortalPage } from 'ui/pages/sales-portal.page';

export class SignInPage extends SalesPortalPage {
  private readonly emailInput: Locator;
  private readonly passwordInput: Locator;
  private readonly loginButton: Locator;

  public readonly uniqueElement: Locator;

  constructor(protected page: Page) {
    super(page);
    this.emailInput = page.locator("#emailinput");
    this.passwordInput = page.locator("#passwordinput");
    this.loginButton = page.locator('button[type="submit"]');
    this.uniqueElement = this.loginButton;
  }

  public async fillCredentials(email: string, password: string): Promise<void> {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
  }

  public async clickLogin(): Promise<void> {
    await this.loginButton.click();
  }
}

  
