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
  const userEmail = req.body.email;
  console.log('getuser :: email :: ', userEmail);

  try {
    const userFromDB = await getUser(dependency, userEmail);

    if (userFromDB) {
      resp.status = ResponseType.Success;
      resp.data = {
        user: userFromDB,
      };
    }
  } catch (err) {
    console.error(err);
    resp.status = ResponseType.Error;
    resp.data = {
      global: 'DB error',
    };
  }

  res.send(JSON.stringify(resp));
};
