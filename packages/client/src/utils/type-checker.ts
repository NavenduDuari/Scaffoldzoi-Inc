export const isString = (value: any): value is string =>
  typeof value === 'string';

export const isNumber = (value: any): value is number =>
  typeof value === 'number' && !isNaN(value);

export const isObject = (value: any): value is Record<string, any> =>
  typeof value === 'object' && value !== null && value !== undefined;

export const isArray = (value: any): value is Array<any> =>
  Array.isArray(value);
