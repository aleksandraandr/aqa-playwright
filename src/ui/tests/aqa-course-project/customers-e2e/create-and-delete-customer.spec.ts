import { test, expect } from 'fixtures/business-steps.fixtures';
import { generateCustomerData } from 'data/customers/generate-customer.data';
import { NOTIFICATIONS } from 'data/notifications.data';
import _ from 'lodash';

test.describe('[UI] [Sales Portal] [Customers]', () => {
  test('Should create and delete customer, verifying table entry', async ({ 
    loginAsLocalUser,
    homePage,
    customersPage,
    addNewCustomerPage,
   }) => {
    // Login as local user
    await loginAsLocalUser();

    // Go to Customers → Add New Customer
    await homePage.clickModuleButton('Customers');
    await customersPage.waitForOpened();
    await customersPage.clickAddNewCustomer();
    await addNewCustomerPage.waitForOpened();

    // Create a new customer with random data
    const data = generateCustomerData();
    await addNewCustomerPage.fillInputs(data);
    await addNewCustomerPage.clickSaveNewCustomer();

    // Wait for notification and return to customer list
    await customersPage.waitForOpened();
    await customersPage.waitForNotification(NOTIFICATIONS.CUSTOMER_CREATED);
    
    //Verify the customer appears in the table
    await expect(customersPage.tableRowByEmail(data.email)).toBeVisible();

    //Verify table data matches input
    const actualCustomerData = await customersPage.getCustomerData(data.email);
    expect(actualCustomerData).toEqual(_.pick(data, ['email', 'name', 'country']));

    // Delete the customer
    await customersPage.clickDeleteCustomer(data.email);
    await customersPage.confirmCustomerDeletion();
    
    // Ensure customer is no longer in the table
    await customersPage.waitForOpened();
    const stillExists = await customersPage.isCustomerInTable(data.email);
    expect(stillExists).toBe(false);
  });
});