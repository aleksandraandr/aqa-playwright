import test, { expect } from '@playwright/test';
import { SignInPage } from 'ui/pages/sign-in.page';
import { HomePage } from 'ui/pages/home.page';
import { CustomersPage } from 'ui/pages/customers/customers.page';
import { AddNewCustomerPage } from 'ui/pages/customers/add-new-customer.page';
import { generateCustomerData } from 'data/customers/generate-customer.data';
import { COUNTRIES } from 'data/customers/countries.data';
import { NOTIFICATIONS } from 'data/notifications.data';

test.describe('[UI] [Sales Portal] [Customers] [E2E]', () => {
  test('Should create customer with valid data and verify table entry', async ({ page }) => {
    const signInPage = new SignInPage(page);
    const homePage = new HomePage(page);
    const customersPage = new CustomersPage(page);
    const addNewCustomerPage = new AddNewCustomerPage(page);

    await page.goto('https://anatoly-karpovich.github.io/aqa-course-project/#');
    await signInPage.fillCredentials('aleksandraandr', 'ValidPass123');
    await signInPage.clickLogin();

    await homePage.waitForOpened();
    await homePage.clickModuleButton('Customers');
    await customersPage.waitForOpened();
    await customersPage.clickAddNewCustomer();
    await addNewCustomerPage.waitForOpened();

    const data = generateCustomerData();
    await addNewCustomerPage.fillInputs(data);
    await addNewCustomerPage.clickSaveNewCustomer();

    await customersPage.waitForOpened();
    await customersPage.waitForNotification(NOTIFICATIONS.CUSTOMER_CREATED);

    // Валидация созданного клиента через метод customers.page
    const createdCustomer = await customersPage.getCreatedCustomerData();

    expect(createdCustomer.Email).toBe(data.email);
    expect(createdCustomer.Name).toBe(data.name);
    expect(createdCustomer.Country).toBe(data.country);
  });
});