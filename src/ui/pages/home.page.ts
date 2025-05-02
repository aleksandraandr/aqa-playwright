import { Locator, Page } from '@playwright/test';
import { ModuleName } from 'types/home.types';
import { SalesPortalPage } from 'ui/pages/sales-portal.page';

export class HomePage extends SalesPortalPage {
  private readonly title: Locator;
  private readonly customersButton: Locator;
  private readonly productsButton: Locator;
  private readonly ordersButton: Locator;

  public readonly uniqueElement: Locator;

  constructor(protected page: Page) {
    super(page);
    this.title = this.page.locator('.welcome-text');
    this.customersButton = this.page.getByRole('link', { name: 'Customer' });
    this.productsButton = this.page.getByRole('link', { name: 'Products' });
    this.ordersButton = this.page.getByRole('link', { name: 'Orders' });
    this.uniqueElement = this.title;
  }

  public async clickModuleButton(moduleName: ModuleName) {
    const moduleButtons: Record<ModuleName, Locator> = {
      Customers: this.customersButton,
      Products: this.productsButton,
      Orders: this.ordersButton,
    };

    await moduleButtons[moduleName].click();
  }
}

