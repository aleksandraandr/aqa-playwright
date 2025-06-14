import { faker } from '@faker-js/faker';
import { ICustomer } from 'types/customers/customers.types';
import { COUNTRIES } from 'data/customers/countries.data';
import { getRandromEnumValue } from 'utils/enum.utils';

export function generateCustomerData(params?: Partial<ICustomer>): ICustomer {
  return {
    email: `test${Date.now()}@gmail.com`, // уникальный email
    name: `${faker.person.firstName()} ${faker.person.lastName()}`, // 1–40 букв, пробел
    country: getRandromEnumValue(COUNTRIES),
    city: faker.location.city().slice(0, 20), // максимум 20 букв
    street: faker.location.street().replace(/[^\w\s]/g, '').slice(0, 40), // до 40 букв/цифр
    house: faker.number.int({ min: 1, max: 999 }),
    flat: faker.number.int({ min: 1, max: 9999 }),
    phone: `+${faker.string.numeric({ length: 11 })}`, // от 10 до 20, с плюсом
    notes: faker.lorem.sentence().replace(/[<>]/g, '').slice(0, 250), // без < >
    ...params,
  };
}
