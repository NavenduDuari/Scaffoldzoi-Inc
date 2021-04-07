import { Request, Response } from 'express';
import { Dependency, ApiResponse, ResponseType, AppDataKey } from '../utils/types';
import { User, Rate } from '../db/model';
import { getRateChartEntity, deleteRateChartEntity } from '../db/operations';
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
      console.log('payload :: ', req.body);

      const { id } = req.body;
      if (!id) {
        throw 'Not sufficient data';
      }

      const loggedInUser = (req as any).getApplicationData(AppDataKey.LoggedInUser) as User;
      const rateRow = (await getRateChartEntity(dependency, id)) as Rate;

      if (rateRow.email !== loggedInUser.email) {
        throw 'User not allowed to delete entry';
      }

      const deleteResponse = await deleteRateChartEntity(dependency, id);
      console.log('delete rate row :: ', deleteResponse);

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
