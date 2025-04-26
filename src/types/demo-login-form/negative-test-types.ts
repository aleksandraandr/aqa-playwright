export interface INegativeTestData {
    testName: string;
    username: string;
    password: string;
    expectedError: string;
    knownIssue?: boolean;
  }