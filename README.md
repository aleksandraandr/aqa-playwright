# 🧪 aqa-playwright

## ✅ Task 1: REGISTER — demo-login-form

### 📄 Description

Разработайте смоук тест-сьют с тестами на REGISTER на странице:  
https://anatoly-karpovich.github.io/demo-login-form/

#### Requirements:
- **Username**
  - Required field
  - From 3 to 40 characters (inclusive)
  - Leading and trailing spaces are not allowed
  - Username consisting only of spaces is not allowed
- **Password**
  - Required field
  - From 8 to 20 characters (inclusive)
  - Must include at least one **uppercase** and one **lowercase** letter
  - Password consisting only of spaces is not allowed

### 📁 File structure

- `register.smoke.spec.ts` — smoke tests
- `register.validation.spec.ts` — validation & negative tests

### 🐞 Known Issues

---

❗️ **Password**: validation for uppercase letters is missing  
- Password like `"lowercase123"` is accepted  
- According to the requirements, at least one uppercase letter is required  
- **Cause**: the check in `script.js` is commented out:
  ```js
  // else if(value == value.toLowerCase()) {
  //     return "Password should contain at least one character in upper case"
  // }
The test Password without uppercase is intentionally left and marked as [KNOWN ISSUE]

## ✅ Task_2: REGISTER — demo-registration-form

### 📄 Description

Создайте ОДИН смоук тест со следующими шагами:

1. Переход на страницу https://anatoly-karpovich.github.io/demo-registration-form/
2. Заполните форму регистрации
3. Проверьте, что пользователь успешно зарегистрирован

### 📁 File structure

- `smoke.spec.ts` — smoke test

## ✅ Task 3: Dynamic Controls — herokuapp

### 📄 Description

Разработать тест со следующими шагами:
  - открыть https://the-internet.herokuapp.com/
  - перейти на страницу Dynamic Controls
  - Дождаться появления кнопки Remove
  - Завалидировать текста в заголовке страницы
  - Чекнуть чекбокс
  - Кликнуть по кнопке Remove
  - Дождаться исчезновения чекбокса
  - Проверить наличие кнопки Add
  - Завалидировать текст It's gone!
  - Кликнуть на кнопку Add
  - Дождаться появления чекбокса
  - Завалидировать текст It's back!

  ### 📁 File structure

- `dynamic-controls.spec.ts`

## ✅ Task 4: Login and UI verification — aqa-course-project

### 📄 Description

Разработать тест со следующими шагами:
 - Открыть url https://anatoly-karpovich.github.io/aqa-course-project/#
 - Войти в приложения используя учетные данные test@gmail.com / 12345678 при этом:
 - дождаться исчезновения спиннеров
 - проверить действительно ли пользователь с логином Anatoly вошел в систему
 - Проверить скриншотом боковое навигационное меню с выбранной страницей Home

  ### 📁 File structure

- `login.spec.ts`
- `login.spec.ts-snapshots`

## ✅ Task 5: REGISTER (DDT) — demo-login-form

### 📄 Description

Создать тест сьют используя DDT подход с негативными тест-кейсами по регистрации на сайте
https://anatoly-karpovich.github.io/demo-login-form/

#### Requirements:
Same as in Task 1

### 📁 File structure

- `src/data/demo-login-form/negative-test-data.ts` — contains only test data
- `src/types/demo-login-form/negative-test-types.ts` — contains interface `NegativeTestCase`
- `src/ui/tests/demo-login-form/ddt-registration.spec.ts` — DDT logic with negative test cases
- `src/ui/tests/demo-login-form/input-limit.spec.ts` — UI input field limitation tests

### 🐞 Known Issues

---

❗️ **Password**: validation for uppercase letters is missing  
- Password like `"lowercase123"` is accepted  
- According to the requirements, at least one uppercase letter is required  
- **Cause**: the check in `script.js` is commented out:
  ```js
  // else if(value == value.toLowerCase()) {
  //     return "Password should contain at least one character in upper case"
  // }
The test Password without uppercase is intentionally left and marked as [KNOWN ISSUE]

❗️ UI message typo: "is username"

The validation message shown when the username contains spaces is grammatically incorrect:
Prefix and postfix spaces are not allowed is username
✅ Should be: Prefix and postfix spaces are not allowed in username
Affects tests:
1. Username with leading/trailing spaces
2. Username with only spaces

## ✅ Task 6: Demo Shopping Cart UI Tests

### 📄 Description

Разработать тест со следующими шагами:
https://anatoly-karpovich.github.io/demo-shopping-cart/
  - добавить продукты 2,4,6,8,10
  - завалидировать бейдж с количеством
  - открыть чекаут
  - завалидировать сумму и продукты
  - ввести все найденные вами промокоды (вспоминаем первую лекцию)
  - завалидировать конечную сумму
  - зачекаутиться
  - завалидировать сумму

### 📁 File structure

- `src/data/demo-shopping-card/products.ts` — contains list of products with names and prices
- `src/data/demo-shopping-card/promocodes.ts` — contains list of all promo codes
- `src/types/demo-shopping-card/product-types.ts` — defines Product type with name and price
- `src/ui/tests/demo-shopping-card/checkout.spec.ts` — full E2E test

## ✅ Task 7: Page Object класс для страницы Sign In

### 📄 Description

Написать Page Object класс для страницы Sign In:
  - email input
  - password input
  - login button
  - fillCredentials method
  - click on login button method

### 📁 File structure

- `src/ui/pages/sign-in.page.ts` — contains Page Object for Sign In

## ✅ Task 8: Create customer with valid data and verify table entry

### 📄 Description

Разработать е2е тест со следующими шагами:
 - Открыть url https://anatoly-karpovich.github.io/aqa-course-project/#
 - Войти в приложения используя ваши учетные данные 
 - Создать покупателя (модуль Customers)
 - Верифицировать появившуюся нотификацию
 - Верифицировать созданного покупателя в таблице (сравнить все имеющиеся поля, покупатель должен быть самым верхним)

### 📁 File structure

- `src/ui/pages/customers/add-new-customer.page.ts` — contains Page Object for the 'Add New Customer' form with methods for filling and submitting customer data 
- `src/ui/pages/customers/customers.page.ts` — contains Page Object for the customer list page and methods to interact with the customer table and notifications 
- `src/ui/pages/home.page.ts` — contains Page Object for the homepage with navigation to different modules like Customers, Products, and Orders 
- `src/ui/pages/sales-portal.page.ts` — contains a base abstract class for all page objects with common logic
- `src/data/customers/countries.ts` — contains an enum with available customer countries
- `src/data/customers/generate-customer.data.ts` — contains a function that generates randomized customer test data
- `src/types/customers/customers.types.ts` — defines the `ICustomer` interface used for typing customer data
- `src/types/customers/home.types.ts` — defines the `ModuleName` type representing main sections of the portal
- `src/ui/tests/aqa-course-project/customers-e2e/create-customer.spec.ts` — contains an end-to-end test that verifies the customer creation workflow
- `src/utils/enum.utils.ts` — contains a utility function to retrieve a random value from an enum

