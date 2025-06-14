import { ICustomer } from 'types/customers/customers.types';
import { COUNTRIES } from './countries.data';

export const invalidCustomers: Partial<ICustomer>[] = [
  // Пустой объект (все обязательные поля отсутствуют)
  {},

  // Неуникальный email (формально это API должно отловить)
  {
    email: 'duplicate@example.com',
    name: 'John Doe',
    country: COUNTRIES.USA,
    city: 'New York',
    street: '5th Avenue',
    house: 10,
    flat: 20,
    phone: '+1234567890',
  },

  // Невалидный email
  {
    email: 'invalid-email',
    name: 'Jane Doe',
    country: COUNTRIES.USA,
    city: 'Chicago',
    street: 'Main Street',
    house: 15,
    flat: 3,
    phone: '+1234567890',
  },

  // Невалидное имя (слишком длинное, спецсимволы)
  {
    email: 'test1@example.com',
    name: 'ThisNameIsWayTooLongAndHas1234Numbers!',
    country: COUNTRIES.USA,
    city: 'Denver',
    street: 'Somewhere Street',
    house: 5,
    flat: 2,
    phone: '+1234567890',
  },

  // Страна вне допустимого списка
  {
    email: 'test2@example.com',
    name: 'John Smith',
    country: COUNTRIES.BRAZIL, // невалидная страна
    city: 'City',
    street: 'Street',
    house: 10,
    flat: 5,
    phone: '+1234567890',
  },

  // Невалидный город (цифры и символы)
  {
    email: 'test3@example.com',
    name: 'Valid Name',
    country: COUNTRIES.CANADA,
    city: 'City@123',
    street: 'Some Street',
    house: 1,
    flat: 1,
    phone: '+1234567890',
  },

  // Невалидная улица (слишком длинная, спецсимволы)
  {
    email: 'test4@example.com',
    name: 'Valid Name',
    country: COUNTRIES.GERMANY,
    city: 'Berlin',
    street: 'VeryLongStreetNameThatExceedsFortyCharactersLong!!!',
    house: 10,
    flat: 20,
    phone: '+1234567890',
  },

  // House out of range
  {
    email: 'test5@example.com',
    name: 'Valid Name',
    country: COUNTRIES.FRANCE,
    city: 'Paris',
    street: 'Street',
    house: 1000, // больше 999
    flat: 50,
    phone: '+1234567890',
  },

  // Flat out of range
  {
    email: 'test6@example.com',
    name: 'Valid Name',
    country: COUNTRIES.FRANCE,
    city: 'Paris',
    street: 'Street',
    house: 10,
    flat: 10000, // больше 9999
    phone: '+1234567890',
  },

  // Телефон без "+"
  {
    email: 'test7@example.com',
    name: 'Valid Name',
    country: COUNTRIES.RUSSIA,
    city: 'Moscow',
    street: 'Arbat',
    house: 3,
    flat: 33,
    phone: '89161234567', // нет "+"
  },

  // Phone слишком короткий
  {
    email: 'test8@example.com',
    name: 'Valid Name',
    country: COUNTRIES.RUSSIA,
    city: 'Moscow',
    street: 'Street',
    house: 10,
    flat: 20,
    phone: '+12345', // менее 10 символов
  },

  // Notes содержит < > символы
  {
    email: 'test9@example.com',
    name: 'Valid Name',
    country: COUNTRIES.USA,
    city: 'City',
    street: 'Street',
    house: 5,
    flat: 10,
    phone: '+1234567890',
    notes: 'This note contains <script>',
  },
];
