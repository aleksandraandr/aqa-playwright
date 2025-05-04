import { Locator, Page } from '@playwright/test';
import { ModuleName } from 'types/home.types';
import { SalesPortalPage } from 'ui/pages/sales-portal.page';

export class HomePage extends SalesPortalPage {
  readonly title = this.page.locator(".welcome-text");
  readonly customersButton = this.page.getByRole("link", { name: "Customer" });
  readonly productsButton = this.page.getByRole("link", { name: "Products" });
  readonly ordersButton = this.page.getByRole("link", { name: "Orders" });
  
  uniqueElement = this.title;
  
  public async clickModuleButton(moduleName: ModuleName) {
    const moduleButtons: Record<ModuleName, Locator> = {
      Customers: this.customersButton,
      Products: this.productsButton,
      Orders: this.ordersButton,
    };

    await moduleButtons[moduleName].click();
  }
}

