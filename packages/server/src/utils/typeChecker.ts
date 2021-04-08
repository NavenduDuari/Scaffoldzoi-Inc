export const isString = (value: any): value is string => {
  return typeof value === 'string';
};

export const isObject = (value: any): value is Record<string, any> => {
  return typeof value === 'object' && value !== null && value !== undefined;
};

export function isArray(value: any): value is Array<any> {
  return Array.isArray(value);
}
