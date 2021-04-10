import { Request, Response } from 'express';
import { Dependency, ApiResponse, ResponseType, AppDataKey, HttpStatusCode } from '../utils/types';
import { User, Rate, WeightUnit, Currency } from '../db/model';
import { insertRate, getRateChart } from '../db/operations';
import { isObject, isNumber, isString } from '../utils/typeChecker';

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
      const { orangeName, orangePrice } = req.body.payload;
      if (!isString(orangeName) || !isNumber(orangePrice)) {
        throw 'Not sufficient data';
      }

      const rate = {} as Rate;
      const loggedInUser = req[AppDataKey.LoggedInUser] as User;
      rate.userId = loggedInUser._id;
      rate.goodsMeta = {
        type: orangeName,
        price: orangePrice,
        weightUnit: WeightUnit.Kg, // hard-coded as of now
        currency: Currency.INR, // hard-coded as of now
      };

      const insertResponse = await insertRate(dependency, rate);
      if (!insertResponse.result.ok || insertResponse.result.n === 0) {
        throw 'Insertion falied';
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
