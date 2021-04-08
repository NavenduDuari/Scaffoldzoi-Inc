import { Request, Response } from 'express';
import { Dependency, ApiResponse, ResponseType } from '../utils/types';
import { getUser } from '../db/operations';

export default async (req: Request, res: Response, dependency: Dependency): Promise<void> => {
  const resp: ApiResponse = {
    status: ResponseType.Error,
    data: {
      global: 'Something went wrong',
    },
  };

  console.log('body :: ', req.body);

  try {
    const userEmail = req.body.email;
    if (!userEmail) {
      throw 'Insufficient parameter';
    }

    const userFromDB = await getUser(dependency, userEmail);

    if (!userFromDB) {
      throw 'User not found';
    }

    resp.status = ResponseType.Success;
    resp.data = {
      user: userFromDB,
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
