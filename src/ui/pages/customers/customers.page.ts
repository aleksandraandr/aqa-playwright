import { Locator, expect } from '@playwright/test';
import { SalesPortalPage } from 'ui/pages/sales-portal.page';
import { ICustomer } from 'types/customer.types';

export class CustomersPage extends SalesPortalPage {
  readonly addNewCustomerButton = this.page.getByRole("button", { name: "Add Customer" });
  readonly uniqueElement = this.addNewCustomerButton;

  public async clickAddNewCustomer() {
    await this.addNewCustomerButton.click();
    await this.page.locator("#inputEmail").waitFor({ state: "visible", timeout: 5000 });
  }

  public async waitForNotification(text: string) {
    await expect(this.notification).toContainText(text);
  }

  public async getCreatedCustomerData(): Promise<Record<string, string>> {
    const table = this.page.locator('.table');
    const headers = (await table.locator('thead th').allInnerTexts()).map(h => h.trim());
    const cells = (await table.locator('tbody tr').first().locator('td').allInnerTexts()).map(c => c.trim());

    const data: Record<string, string> = {};
    headers.forEach((header, index) => {
      data[header] = cells[index] ?? '';
    });

    return data;
  }
}


