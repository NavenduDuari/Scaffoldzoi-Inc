import { Request, Response } from 'express';
import { Dependency, ApiResponse, ResponseType, Credential, HttpStatusCode } from '../utils/types';
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

      const { email, password, profileType } = req.body.payload;
      if (!email || !password) {
        throw 'Not sufficient data';
      }

      user.email = email;
      user.username = email;
      user.password = password;
      user.profileType = profileType;
      const userFromDB = await getUser(dependency, 'email', user.email);
      if (userFromDB) {
        //login
        const isValidPass = await comparePassword(user.password, userFromDB.password);
        if (!isValidPass) {
          throw 'Username and Password did not match';
        }
      } else {
        // signup
        if (!profileType) {
          throw 'Not sufficient data';
        }
        user.password = await encryptPassword(user.password);
        const { result } = await insertUser(dependency, user);
        if (!result.ok) {
          throw 'Unable to insert user';
        }
      }

      const token = sign({ username: user.username, email: user.email, password: user.password });
      delete user.password;
      resp.status = ResponseType.Success;
      resp.statusCode = HttpStatusCode.OK;
      resp.data = {
        token,
        loggedInUser: user,
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
