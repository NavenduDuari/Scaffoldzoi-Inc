import { Request, Response } from 'express';
import { Dependency, ApiResponse, ResponseType, HttpStatusCode } from '../utils/types';
import { getUser } from '../db/operations';
import { User } from '../db/model';

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
    const { id } = payload;

    console.log('body :: ', payload);
    if (!id) {
      throw 'Insufficient parameter';
    }

    const userFromDB = (await getUser(dependency, '_id', id)) as User;

    if (!userFromDB) {
      throw 'User not found';
    }
    delete userFromDB.password;

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
