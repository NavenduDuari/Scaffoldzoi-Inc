import { Request, Response } from 'express';
import { Dependency, ApiResponse, ResponseType, AppDataKey, HttpStatusCode } from '../utils/types';
import { User, Rate } from '../db/model';
import { getRate, deleteRate, getRateChart } from '../db/operations';
import { isObject } from '../utils/typeChecker';
import { ObjectID } from 'mongodb';

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
      const { id } = req.body.payload;
      if (!id) {
        throw 'Not sufficient data';
      }

      const loggedInUser = req[AppDataKey.LoggedInUser] as User;
      const rateRow = (await getRate(dependency, id)) as Rate;
      if (String(rateRow.userId) !== String(loggedInUser._id)) {
        throw 'User not allowed to delete entry';
      }

      const deleteResponse = await deleteRate(dependency, id);
      if (!deleteResponse.result.ok || deleteResponse.result.n === 0) {
        throw 'Delete ops failed';
      }

      const rateChart = await getRateChart(dependency, loggedInUser._id);
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
