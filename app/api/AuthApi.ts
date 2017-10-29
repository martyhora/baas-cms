import { apiUrl, apiBase } from '../constants';
import axios, { AxiosResponse } from 'axios';

interface IApiResponse {
  success: boolean;
}

export interface IUser {
  id: number;
  name: string;
  username: string;
}

export interface IUserApiResponse extends IApiResponse {
  user?: IUser;
  authorizationFailed?: boolean;
}

export interface IApiAuthResponse extends IApiResponse {
  authToken?: string;
  user?: IUser;
}

export class AuthError extends Error {}

export default class AuthApi {
  static async login(username: string, password: string): Promise<IApiAuthResponse> {
    const response: AxiosResponse = await axios({
      method: 'post',
      url: apiUrl.auth,
      data: { username, password },
    });

    if (!response.data.success) {
      throw new AuthError('Invalid login credentials');
    }

    return response.data;
  }

  static async fetchUser(authToken: string): Promise<IUserApiResponse> {
    const response: AxiosResponse = await axios({
      method: 'get',
      url: `${apiBase}user`,
      headers: { Authorization: `Bearer ${authToken}` },
    });

    return response.data;
  }
}
