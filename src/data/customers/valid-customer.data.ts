import { ICustomer } from 'types/customers/customers.types';
import { generateCustomerData } from './generate-customer.data';
import { COUNTRIES } from './countries.data';

// Валидные кастомеры, основанные на корректных значениях
export const validCustomers: ICustomer[] = [
  generateCustomerData(),

  generateCustomerData({
    country: COUNTRIES.UKRAINE,
    house: 1,
    flat: 1,
  }),

  generateCustomerData({
    name: 'Anna Maria', // 2 слова, 1 пробел
    city: 'New York',
    street: 'Baker Street 221B',
    phone: '+380971112233',
  }),

  generateCustomerData({
    notes: '', // пустые notes тоже допустимы
  }),

  generateCustomerData({
    email: `custom${Date.now()}@domain.com`, // уникальный email
  }),
];
