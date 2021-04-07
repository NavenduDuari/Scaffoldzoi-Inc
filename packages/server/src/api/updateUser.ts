import { Request, Response } from 'express';
import { Dependency, ApiResponse, ResponseType } from '../utils/types';
import { User } from '../db/model';
import { updateUser } from '../db/operations';
import { isObject } from '../utils/typeChecker';

export default async (req: Request, res: Response, dependency: Dependency): Promise<void> => {
  const resp: ApiResponse = {
    status: ResponseType.Error,
    data: {
      global: 'Something went wrong',
    },
  };
  if (isObject(req.body)) {
    try {
      if (!req.body.email || !req.body.key || !req.body.value) {
        throw 'Insufficient parameter';
      }

      const userEmail = req.body.email;
      const keyToUpdate = req.body.key;
      const updatedValue = req.body.value;

      const updateResponse = await updateUser(dependency, userEmail, keyToUpdate, updatedValue);
      if (!updateResponse.result.ok || updateResponse.result.nModified !== 1) {
        throw 'Unable to update';
      }

      resp.status = ResponseType.Success;
      resp.data = {
        global: 'Success',
      };
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
