import { Request, Response } from 'express';
import { Dependency, ApiResponse, ResponseType, AppDataKey } from '../utils/types';
import { User, Rate } from '../db/model';
import { getRate, deleteRate } from '../db/operations';
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
      const { id } = req.body;
      if (!id) {
        throw 'Not sufficient data';
      }

      const loggedInUser = req[AppDataKey.LoggedInUser] as User;
      const rateRow = (await getRate(dependency, id)) as Rate;

      if (rateRow.email !== loggedInUser.email) {
        throw 'User not allowed to delete entry';
      }

      const deleteResponse = await deleteRate(dependency, id);
      if (!deleteResponse.result.ok || deleteResponse.result.n === 0) {
        throw 'Delete ops failed';
      }

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
