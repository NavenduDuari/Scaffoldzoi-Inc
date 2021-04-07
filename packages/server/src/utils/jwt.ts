import JWT from 'jsonwebtoken';
import conf from './config';
import { Credential } from './types';
import { isObject } from './typeChecker';

const options = { expiresIn: 86400 };
const secret = conf.jwtSecret;

export const sign = (data: Credential): string => {
  const token = JWT.sign(data, secret, options);
  return token;
};

export const validate = (token: string): any => {
  let data: any;
  JWT.verify(token, secret, (err, decodedData) => {
    if (err) throw err;
    data = decodedData;
  });

  return data;
};
