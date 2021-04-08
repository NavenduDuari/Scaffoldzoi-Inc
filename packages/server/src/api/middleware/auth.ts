import { Request, Response, NextFunction } from 'express';
import { validate } from '../../utils/jwt';
import { ApiResponse, ResponseType, Credential, Dependency, AppDataKey, HttpStatusCode } from '../../utils/types';
import { getUser } from '../../db/operations';

export default (dependency: Dependency) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const authorizationHeader = req.headers.authorization;
      if (!authorizationHeader) {
        throw 'Token not present';
      }

      console.log('auth hearder ::', req.headers.authorization);
      const token = req.headers.authorization.split(' ')[1];
      console.log('token ::', token);
      const userCred = validate(token) as Credential;
      console.log('user cred :: ', userCred);
      const userFromDB = await getUser(dependency, userCred.email);
      if (!userFromDB) {
        throw 'User not authorized';
      }
      req[AppDataKey.LoggedInUser] = userFromDB;

      next();
    } catch (err) {
      console.error(err);
      const resp: ApiResponse = {
        status: ResponseType.Error,
        statusCode: HttpStatusCode.BAD_REQUEST,
        data: {
          global: 'User not authorized',
        },
      };

      res.status(resp.statusCode).send(JSON.stringify(resp));
    }
  };
};
