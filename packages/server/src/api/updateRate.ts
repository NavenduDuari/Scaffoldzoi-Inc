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
  if (isObject(req.body.payload)) {
    try {
      const { id, jobs } = req.body.payload;
      if (!id || !isArray(jobs)) {
        throw 'Insufficient parameter';
      }

      console.log('jobs :: ', jobs);

      const loggedInUser = req[AppDataKey.LoggedInUser] as User;
      const rateRow = (await getRate(dependency, id)) as Rate;

      if (String(rateRow.userId) !== String(loggedInUser._id)) {
        throw 'User not allowed to update entry';
      }

      const updateResponses = await Promise.all(jobs.map((job) => updateRate(dependency, id, job.path, job.value)));

      for (const updateResponse of updateResponses) {
        if (!updateResponse.result.ok || updateResponse.result.nModified !== 1) {
          throw 'Unable to update';
        }
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
