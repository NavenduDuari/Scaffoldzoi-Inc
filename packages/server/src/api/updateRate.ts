import { Request, Response } from 'express';
import { Dependency, ApiResponse, ResponseType, AppDataKey } from '../utils/types';
import { User, Rate } from '../db/model';
import { updateRateChartEntity, getRateChartEntity } from '../db/operations';
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
      console.log('req body :: ', req.body);

      const { id, key, value } = req.body;
      if (!id || !key || !value) {
        throw 'Insufficient parameter';
      }

      const loggedInUser = (req as any).getApplicationData(AppDataKey.LoggedInUser) as User;
      const rateRow = (await getRateChartEntity(dependency, id)) as Rate;

      if (rateRow.email !== loggedInUser.email) {
        throw 'User not allowed to update entry';
      }

      const updateResponse = await updateRateChartEntity(dependency, id, key, value);
      console.log('updated rate :: ', updateResponse);
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
