import { Request, Response } from 'express';
import { Dependency, ApiResponse, ResponseType } from '../utils/types';
import { getRateChart } from '../db/operations';

export default async (req: Request, res: Response, dependency: Dependency): Promise<void> => {
  const resp: ApiResponse = {
    status: ResponseType.Error,
    data: {
      global: 'Something went wrong',
    },
  };

  try {
    const userEmail = req.body.email;
    if (!userEmail) {
      throw 'Insufficient parameter';
    }

    const rateChart = await getRateChart(dependency, userEmail);

    if (!rateChart) {
      throw 'Rate chart not found';
    }

    resp.status = ResponseType.Success;
    resp.data = {
      rateChart,
    };
  } catch (err) {
    console.error(err);
    resp.status = ResponseType.Error;
    resp.data = {
      global: 'DB error',
    };
  }

  res.send(JSON.stringify(resp));
};
