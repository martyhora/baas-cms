const apiBaseUrl = '/api';
const apiVersion = '1';
const apiBase = `${apiBaseUrl}/v${apiVersion}/`;

export const apiUrl = {
  parameter: `${apiBase}parameters`,
  section: `${apiBase}sections`,
  content: `${apiBase}contents`,
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
