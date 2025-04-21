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

❗️ **Password**: validation for uppercase letters is missing  
- Password like `"lowercase123"` is accepted  
- According to requirements, at least one uppercase letter is required  
- **Cause**: check in `script.js` is commented out:
  ```js
  // else if(value == value.toLowerCase()) {
  //     return "Password should contain at least one character in upper case"
  // }
- Password without uppercase test is intentionally left and marked as [KNOWN ISSUE]

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