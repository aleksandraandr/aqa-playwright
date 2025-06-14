import { RequestApi } from 'api/api-clients/request';
import { apiConfig } from 'config/api-config';
import { ICredentials, ILoginResponseBody } from 'types/customers/sign-in.types';
import { IRequestOptions, IResponse } from 'types/customers/api.types';

export class SignInController {
  constructor(private request = new RequestApi()) {}

  async login(body: ICredentials): Promise<IResponse<ILoginResponseBody>> {
    const options: IRequestOptions = {
      url: apiConfig.ENDPOINTS.LOGIN,
      method: 'post',
      data: body,
      headers: {
        'content-type': 'application/json',
      },
    };

    return await this.request.send<ILoginResponseBody>(options);
  }
}

