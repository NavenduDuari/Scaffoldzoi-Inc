import { Request, Response } from 'express';
import { Dependency, ApiResponse, ResponseType, HttpStatusCode } from '../utils/types';
import { getUser } from '../db/operations';

export default async (req: Request, res: Response, dependency: Dependency): Promise<void> => {
  const resp: ApiResponse = {
    status: ResponseType.Error,
    statusCode: HttpStatusCode.BAD_REQUEST,
    data: {
      global: 'Something went wrong',
    },
  };

  try {
    const payload = JSON.parse(req.query.payload as string);
    const { email } = payload;
    if (!email) {
      throw 'Insufficient parameter';
    }

    const userFromDB = await getUser(dependency, email);

    if (!userFromDB) {
      throw 'User not found';
    }

    resp.status = ResponseType.Success;
    resp.statusCode = HttpStatusCode.OK;
    resp.data = {
      user: userFromDB,
    };
  } catch (err) {
    console.error(err);
    resp.status = ResponseType.Error;
    resp.statusCode = HttpStatusCode.BAD_REQUEST;
    resp.data = {
      global: 'DB error',
    };
  }

  res.status(resp.statusCode).send(JSON.stringify(resp));
};
