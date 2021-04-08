import { Request, Response } from 'express';
import { Dependency, ApiResponse, ResponseType, HttpStatusCode } from '../utils/types';
import { updateUser } from '../db/operations';
import { isArray, isObject } from '../utils/typeChecker';

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
      const { email, path, value } = req.body;
      if (!email || !isArray(path) || !value) {
        throw 'Insufficient parameter';
      }

      const updateResponse = await updateUser(dependency, email, path, value);
      if (!updateResponse.result.ok || updateResponse.result.nModified !== 1) {
        throw 'Unable to update';
      }

      resp.status = ResponseType.Success;
      resp.statusCode = HttpStatusCode.OK;
      resp.data = {
        global: 'Success',
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
