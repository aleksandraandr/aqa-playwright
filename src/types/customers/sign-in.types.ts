export interface ICredentials {
    username: string;
    password: string;
  }
export interface ILoginUser {
  _id: string;
  username: string;
  firstName: string;
  lastName: string;
  roles: string[];
  createdOn: string;
}

export interface ILoginResponseBody {
  User: ILoginUser;
  IsSuccess: boolean;
  ErrorMessage: string | null;
}