import test, { expect } from "@playwright/test";

test.describe('[SMOKE] [Demo-registration-form] Registration', () => {
    const baseUrl = 'https://anatoly-karpovich.github.io/demo-registration-form/';

    const selectors = {
        firstName: '#firstName',
        lastName: '#lastName',
        address: '#address',
        email: '#email',
        phone: '#phone',
        country: '#country',
        genderFemale: 'input[name="gender"][value="female"]',
        hobby: 'input.hobby[value="Travelling"]',
        language: '#language',
        skills: '#skills',
        year: '#year',
        month: '#month',
        day: '#day',
        password: '#password',
        confirmPassword: '#password-confirm',
        submitButton: 'button[type="submit"]',
        // result selectors
        resultHeader: 'h2.text-center',
        resultFullName: '#fullName',
        resultAddress: '#address',
        resultEmail: '#email',
        resultPhone: '#phone',
        resultCountry: '#country',
        resultGender: '#gender',
        resultLanguage: '#language',
        resultSkills: '#skills',
        resultHobbies: '#hobbies',
        resultDateOfBirth: '#dateOfBirth',
        resultPassword: '#password'
      };

      const testData = {
        firstName: 'Aleks',
        lastName: 'Andr',
        address: '1234 Elm Street, Apartment 56B, Building C',
        email: 'aleksaandr@example.com',
        phone: '+12156187700',
        country: 'USA',
        gender: 'female',
        hobbies: ['hobbyTravelling'],
        language: 'English',
        skills: ['JavaScript', 'Python'],
        year: '1986',
        month: 'June',
        day: '3',
        password: 'qazQAZ1!'
      };

    test.beforeEach(async ({ page }) => {
      await page.goto(baseUrl);
    });

    test('User can successfully register', async ({ page }) => {
        // Fill the form
        await page.fill(selectors.firstName, testData.firstName);
        await page.fill(selectors.lastName, testData.lastName);
        await page.fill(selectors.address, testData.address);
        await page.fill(selectors.email, testData.email);
        await page.fill(selectors.phone, testData.phone);
        await page.selectOption(selectors.country, testData.country);
        await page.check(selectors.genderFemale);
        await page.check(selectors.hobby);
        await page.fill(selectors.language, testData.language);
        await page.selectOption(selectors.skills, testData.skills);
        await page.selectOption(selectors.year, testData.year);
        await page.selectOption(selectors.month, testData.month);
        await page.selectOption(selectors.day, testData.day);
        await page.fill(selectors.password, testData.password);
        await page.fill(selectors.confirmPassword, testData.password);
    
        // Submit
        await page.click(selectors.submitButton);
    
        // Wait for result page
        await expect(page.locator(selectors.resultHeader)).toHaveText('Registration Details');
    
        // Check displayed values
        await expect(page.locator(selectors.resultFullName)).toHaveText(`${testData.firstName} ${testData.lastName}`);
        await expect(page.locator(selectors.resultAddress)).toHaveText(testData.address);
        await expect(page.locator(selectors.resultEmail)).toHaveText(testData.email);
        await expect(page.locator(selectors.resultPhone)).toHaveText(testData.phone);
        await expect(page.locator(selectors.resultCountry)).toHaveText(testData.country);
        await expect(page.locator(selectors.resultGender)).toHaveText('female');
        await expect(page.locator(selectors.resultLanguage)).toHaveText(testData.language);
        await expect(page.locator(selectors.resultSkills)).toHaveText(testData.skills.join(', '));
        await expect(page.locator(selectors.resultHobbies)).toHaveText('Travelling');
        await expect(page.locator(selectors.resultDateOfBirth)).toHaveText(`${testData.day} ${testData.month} ${testData.year}`);
    
        // Password masking
        const passwordMask = await page.locator(selectors.resultPassword).innerText();
        expect(passwordMask.length).toBe(testData.password.length);
        expect(passwordMask).toMatch(/^\*+$/);
    
        // Check password is not in HTML
        const html = await page.content();
        expect(html).not.toContain(testData.password);
      });
});