import { Request, Response } from 'express';
import { Dependency, ApiResponse, ResponseType, LogInRoutePurpose, HttpStatusCode } from '../utils/types';
import { ProfileType, User } from '../db/model';
import { insertUser, getUser } from '../db/operations';
import { isObject } from '../utils/typeChecker';
import { encryptPassword, comparePassword } from '../utils/password';
import { sign } from '../utils/jwt';

export default async (req: Request, res: Response, dependency: Dependency): Promise<void> => {
  const resp: ApiResponse = {
    status: ResponseType.Error,
    statusCode: HttpStatusCode.BAD_REQUEST,
    data: {
      global: 'Something went wrong',
    },
  };
  if (isObject(req.body.payload)) {
    try {
      const user = {
        username: '',
        email: '',
        password: '',
        profileType: ProfileType.Buyer,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      } as User;
      console.log('payload :: ', req.body.payload);

      const { purpose, email, password, profileType } = req.body.payload;
      if (!purpose || !email || !password) {
        throw 'Not sufficient data';
      }

      let userFromDB = {} as User;
      user.email = email;
      if (purpose === LogInRoutePurpose.Login) {
        //login
        console.log('purpose :: login');
        user.password = password;
        userFromDB = await getUser(dependency, 'email', user.email);
        if (!userFromDB) {
          throw 'User not present. Signup.';
        }
        const isValidPass = await comparePassword(user.password, userFromDB.password);
        if (!isValidPass) {
          throw 'Username and Password did not match';
        }
      } else if (purpose === LogInRoutePurpose.Signup) {
        // signup
        if (!profileType) {
          throw 'Not sufficient data';
        }
        user.username = email;
        user.profileType = profileType;
        user.password = await encryptPassword(user.password);
        const { result } = await insertUser(dependency, user);
        userFromDB = await getUser(dependency, 'email', user.email);
        if (!result.ok) {
          throw 'Unable to insert user';
        }
      }

      console.log('userFromDB :: ', userFromDB);
      const token = sign(userFromDB);
      console.log('after signing');
      delete userFromDB.password;
      resp.status = ResponseType.Success;
      resp.statusCode = HttpStatusCode.OK;
      resp.data = {
        token,
        loggedInUser: userFromDB,
      };
    } catch (err) {
      console.error(err);
      resp.status = ResponseType.Error;
      resp.statusCode = HttpStatusCode.BAD_REQUEST;
      resp.data = {
        global: 'DB Error',
      };
    }
  }

  res.status(resp.statusCode).send(JSON.stringify(resp));
};
