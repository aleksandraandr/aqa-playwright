import { expect, Locator, Page } from '@playwright/test';
import { SALES_PORTAL_URL } from 'config/environment';

export abstract class SalesPortalPage {
  readonly spinner: Locator;
  readonly notification: Locator;
  public abstract readonly uniqueElement: Locator;
  
  constructor(protected page: Page) {
    this.spinner = page.locator('.spinner-border');
    this.notification = page.locator('.toast-body');
  }

  public async waitForOpened(): Promise<void> {
    await expect(this.uniqueElement).toBeVisible();
    await this.waitForSpinner();
  }

  protected async waitForSpinner(): Promise<void> {
    await expect(this.spinner).toHaveCount(0);
  }

  public async waitForNotification(text: string): Promise<void> {
    await expect(this.notification.last()).toHaveText(text);
  }
  public async openPortal() {
    await this.page.goto(SALES_PORTAL_URL);
  }
}
