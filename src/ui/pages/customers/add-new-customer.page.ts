import { Locator } from '@playwright/test';
import { ICustomer } from 'types/customer.types';
import { SalesPortalPage } from 'ui/pages/sales-portal.page';

export class AddNewCustomerPage extends SalesPortalPage {
  readonly emailInput = this.page.locator("#inputEmail");
  readonly nameInput = this.page.locator("#inputName");
  readonly countryInput = this.page.locator("#inputCountry");
  readonly cityInput = this.page.locator("#inputCity");
  readonly streetInput = this.page.locator("#inputStreet");
  readonly houseInput = this.page.locator("#inputHouse");
  readonly flatInput = this.page.locator("#inputFlat");
  readonly phoneInput = this.page.locator("#inputPhone");
  readonly notesInput = this.page.locator("#textareaNotes");
  readonly saveNewCustomerButton = this.page.locator("#save-new-customer");

  readonly uniqueElement = this.saveNewCustomerButton;

  public async fillInputs(customer: Partial<ICustomer>) {
    if (customer.email) await this.emailInput.fill(customer.email);
    if (customer.name) await this.nameInput.fill(customer.name);
    if (customer.country) await this.countryInput.selectOption(customer.country);
    if (customer.city) await this.cityInput.fill(customer.city);
    if (customer.street) await this.streetInput.fill(customer.street);
    if (customer.house) await this.houseInput.fill(customer.house.toString());
    if (customer.flat) await this.flatInput.fill(customer.flat.toString());
    if (customer.phone) await this.phoneInput.fill(customer.phone);
    if (customer.notes) await this.notesInput.fill(customer.notes);
  }

  public async clickSaveNewCustomer() {
    await this.saveNewCustomerButton.click();
  }
}
