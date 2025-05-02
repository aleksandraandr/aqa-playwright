import { expect, Locator, Page } from '@playwright/test';
import { ICustomer } from 'types/customer.types';
import { SalesPortalPage } from 'ui/pages/sales-portal.page';

export class AddNewCustomerPage extends SalesPortalPage {
  private readonly emailInput: Locator;
  private readonly nameInput: Locator;
  private readonly countryInput: Locator;
  private readonly cityInput: Locator;
  private readonly streetInput: Locator;
  private readonly houseInput: Locator;
  private readonly flatInput: Locator;
  private readonly phoneInput: Locator;
  private readonly notesInput: Locator;
  private readonly saveNewCustomerButton: Locator;
  public readonly uniqueElement: Locator;

  constructor(protected page: Page) {
    super(page);
    this.emailInput = page.locator('#inputEmail');
    this.nameInput = page.locator('#inputName');
    this.countryInput = page.locator('#inputCountry');
    this.cityInput = page.locator('#inputCity');
    this.streetInput = page.locator('#inputStreet');
    this.houseInput = page.locator('#inputHouse');
    this.flatInput = page.locator('#inputFlat');
    this.phoneInput = page.locator('#inputPhone');
    this.notesInput = page.locator('#textareaNotes');
    this.saveNewCustomerButton = page.locator('#save-new-customer');

    this.uniqueElement = this.emailInput;
  }

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
