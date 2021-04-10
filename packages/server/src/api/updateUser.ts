import { Request, Response } from 'express';
import { Dependency, ApiResponse, ResponseType, HttpStatusCode, AppDataKey } from '../utils/types';
import { updateUser, getUser } from '../db/operations';
import { User } from '../db/model';
import { isArray, isObject } from '../utils/typeChecker';

export default async (req: Request, res: Response, dependency: Dependency): Promise<void> => {
  const resp: ApiResponse = {
    status: ResponseType.Error,
    statusCode: HttpStatusCode.BAD_REQUEST,
    data: {
      global: 'Something went wrong',
    },
  };
  if (isObject(req.body)) {
    try {
      const { id, path, value } = req.body.payload;
      if (!id || !isArray(path) || !value) {
        throw 'Insufficient parameter';
      }

      const userFromDB = (await getUser(dependency, '_id', id)) as User;
      const loggedInUser = req[AppDataKey.LoggedInUser] as User;
      if (userFromDB.email !== loggedInUser.email) {
        throw 'User not allowed to perform the operation';
      }

      const updateResponse = await updateUser(dependency, id, path, value);
      if (!updateResponse.result.ok || updateResponse.result.nModified !== 1) {
        throw 'Unable to update';
      }

      const updatedUserFromDB = (await getUser(dependency, '_id', id)) as User;

      if (!updatedUserFromDB) {
        throw 'User not found';
      }
      delete updatedUserFromDB.password;

      resp.status = ResponseType.Success;
      resp.statusCode = HttpStatusCode.OK;
      resp.data = {
        updatedUser: updatedUserFromDB,
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
