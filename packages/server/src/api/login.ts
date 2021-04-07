import { Request, Response } from 'express';
import { Dependency, ApiResponse, ResponseType, Credential } from '../utils/types';
import { User } from '../db/model';
import { insertUser, getUser } from '../db/operations';
import { isObject } from '../utils/typeChecker';
import { encryptPassword, comparePassword } from '../utils/password';
import { sign } from '../utils/jwt';

export default async (req: Request, res: Response, dependency: Dependency): Promise<void> => {
  const resp: ApiResponse = {
    status: ResponseType.Error,
    data: {
      global: 'Something went wrong',
    },
  };
  if (isObject(req.body)) {
    try {
      console.log('payload :: ', req.body);
      const user = {
        username: '',
        email: '',
        password: '',
        createdAt: Date.now(),
        updatedAt: Date.now(),
      } as User;

      const { email, username, password } = req.body;
      if (!email || !username || !password) {
        throw 'Not sufficient data';
      }

      user.email = email;
      user.username = username || user.email;
      user.password = password;
      const userFromDB = await getUser(dependency, user.email);
      if (userFromDB) {
        //login
        const isValidPass = await comparePassword(user.password, userFromDB.password);
        if (!isValidPass) {
          throw 'Username and Password did not match';
        }
      } else {
        // signup
        user.password = await encryptPassword(user.password);
        const { result } = await insertUser(dependency, user);
        if (!result.ok) {
          throw 'Unable to insert user';
        }
      }

      resp.data.token = sign({ username: user.username, email: user.email, password: userFromDB.password });
      resp.status = ResponseType.Success;
      resp.data.global = 'Success';
    } catch (err) {
      console.error(err);
      resp.status = ResponseType.Error;
      resp.data = {
        global: 'DB Error',
      };
    }
  }

  res.send(JSON.stringify(resp));
};
