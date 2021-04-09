import { Request, Response } from 'express';
import { Dependency, ApiResponse, ResponseType, HttpStatusCode } from '../utils/types';
import { getAllUsers } from '../db/operations';
import { User, ProfileType } from '../db/model';

export default async (req: Request, res: Response, dependency: Dependency): Promise<void> => {
  const resp: ApiResponse = {
    status: ResponseType.Error,
    statusCode: HttpStatusCode.BAD_REQUEST,
    data: {
      global: 'Something went wrong',
    },
  };

  try {
    const sellersFromDB = (await getAllUsers(dependency, 'profileType', ProfileType.Seller)) as User[];

    console.log('getAllSellers :: ', sellersFromDB);
    if (!sellersFromDB) {
      throw 'Failed to fetch sellers';
    }

    resp.status = ResponseType.Success;
    resp.statusCode = HttpStatusCode.OK;
    resp.data = {
      sellers: sellersFromDB.map((seller) => {
        delete seller.password;
        return seller;
      }),
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
