const apiBaseUrl = '/api';
const apiVersion = '1';
export const apiBase = `${apiBaseUrl}/v${apiVersion}/`;

export const apiUrl = {
  parameter: `${apiBase}parameters`,
  section: `${apiBase}sections`,
  content: `${apiBase}contents`,
  auth: `${apiBase}auth`,
};

interface IParameterTypes {
  string: string;
  enum: string;
  [key: string]: string;
}

export const parameterTypes: IParameterTypes = {
  string: 'Text',
  enum: 'Výčet položek',
};

export const AUTH_TOKEN_KEY = 'authToken';

export const APP_TITLE = 'Universal BaaS CMS';
