import { INegativeTestData } from 'types/demo-login-form/negative-test-types';

export const negativeTestData: INegativeTestData[] = [
    {
      testName: 'Empty username',
      username: '',
      password: 'ValidPass123',
      expectedError: 'Username is required'
    },
    {
      testName: 'Empty password',
      username: 'ValidUser123',
      password: '',
      expectedError: 'Password is required'
    },
    {
      testName: 'Username too short',
      username: 'ab',
      password: 'ValidPass123',
      expectedError: 'Username should contain at least 3 characters'
    },
    {
      testName: 'Username with only spaces',
      username: '   ',
      password: 'ValidPass123',
      expectedError: 'Prefix and postfix spaces are not allowed is username'
    },
    {
      testName: 'Username with leading/trailing spaces',
      username: '  TestUser  ',
      password: 'ValidPass123',
      expectedError: 'Prefix and postfix spaces are not allowed is username'
    },
    {
      testName: 'Password too short',
      username: 'ValidUser123',
      password: 'Aa1234',
      expectedError: 'Password should contain at least 8 characters'
    },
    {
      testName: 'Password has only spaces',
      username: 'ValidUser123',
      password: '    ',
      expectedError: 'Password is required'
    },
    {
      testName: 'Password without uppercase [KNOWN ISSUE]',
      username: 'ValidUser123',
      password: 'lowercase123',
      expectedError: 'Password should contain at least one character in upper case',
      knownIssue: true
     },
    {
      testName: 'Password without lowercase',
      username: 'ValidUser123',
      password: 'UPPERCASE123',
      expectedError: 'Password should contain at least one character in lower case'
    }
  ];
