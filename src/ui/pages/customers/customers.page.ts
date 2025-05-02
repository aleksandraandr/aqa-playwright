import { Locator, Page, expect } from '@playwright/test';
import { SalesPortalPage } from 'ui/pages/sales-portal.page';
import { ICustomer } from 'types/customer.types';
import { getFirstRowDataByHeaders } from 'utils/table.utils';

export class CustomersPage extends SalesPortalPage {
  private readonly addNewCustomerButton: Locator;
  private readonly notification: Locator;
  public readonly uniqueElement: Locator;

  constructor(protected page: Page) {
    super(page);
    this.addNewCustomerButton = page.getByRole('button', { name: 'Add Customer' });
    this.notification = page.locator('.notification-wrapper');
    this.uniqueElement = this.addNewCustomerButton;
  }

  public async clickAddNewCustomer() {
    await this.addNewCustomerButton.click();
    await this.page.locator("#inputEmail").waitFor({ state: "visible", timeout: 5000 });
  }

  public async waitForNotification(text: string) {
    await expect(this.notification).toContainText(text);
  }

  public async validateCustomerData(customer: ICustomer) {
    const table = this.page.locator('.table');
    const headers = (await table.locator('thead th').allInnerTexts()).map(header => header.trim());

    const createdCustomer = await getFirstRowDataByHeaders(table);

    expect(createdCustomer).toMatchObject({
      [headers[0]]: customer.email,
      [headers[1]]: customer.name,
      [headers[2]]: customer.country,
    });
  }
}


