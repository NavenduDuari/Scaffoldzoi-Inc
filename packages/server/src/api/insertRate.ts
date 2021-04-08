import { Request, Response } from 'express';
import { Dependency, ApiResponse, ResponseType, AppDataKey, HttpStatusCode } from '../utils/types';
import { User, Rate } from '../db/model';
import { insertRateRow } from '../db/operations';
import { isObject } from '../utils/typeChecker';

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
      console.log('payload :: ', req.body);
      const { type, price, weightUnit, currency } = req.body;
      if (!type || !price || !weightUnit || !currency) {
        throw 'Not sufficient data';
      }

      const rate = {} as Rate;
      const loggedInUser = req[AppDataKey.LoggedInUser] as User;
      rate.email = loggedInUser.email;
      rate.goodsMeta = {
        type,
        price,
        weightUnit,
        currency,
      };
      const insertResponse = await insertRateRow(dependency, rate);
      if (!insertResponse.result.ok || insertResponse.result.n === 0) {
        throw 'Insertion falied';
      }

      resp.status = ResponseType.Success;
      resp.statusCode = HttpStatusCode.OK;
      resp.data.global = 'Success';
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
