import { Request, Response } from 'express';
import { Dependency, ApiResponse, ResponseType, AppDataKey, HttpStatusCode } from '../utils/types';
import { User, Rate } from '../db/model';
import { updateRate, getRate, getRateChart } from '../db/operations';
import { isObject, isArray } from '../utils/typeChecker';

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
      console.log('req body :: ', req.body);

      const { id, path, value } = req.body;
      if (!id || !isArray(path) || !value) {
        throw 'Insufficient parameter';
      }

      const loggedInUser = req[AppDataKey.LoggedInUser] as User;
      const rateRow = (await getRate(dependency, id)) as Rate;

      if (rateRow.email !== loggedInUser.email) {
        throw 'User not allowed to update entry';
      }

      const updateResponse = await updateRate(dependency, id, path, value);
      console.log('updated rate :: ', updateResponse);
      if (!updateResponse.result.ok || updateResponse.result.nModified !== 1) {
        throw 'Unable to update';
      }

      const rateChart = await getRateChart(dependency, loggedInUser.email);

      if (!rateChart) {
        throw 'Rate chart not found';
      }

      resp.status = ResponseType.Success;
      resp.statusCode = HttpStatusCode.OK;
      resp.data = {
        rateChart,
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
