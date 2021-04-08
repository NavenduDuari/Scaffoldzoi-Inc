import { MongoClient } from 'mongodb';

export interface Dependency {
  mongoClient: MongoClient;
}

export enum ResponseType {
  Success = 'success',
  Error = 'error',
}

export enum HttpStatusCode {
  OK = 200,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  NOT_FOUND = 404,
  INTERNAL_SERVER_ERROR = 500,
  SERVICE_UNAVAILABLE = 503,
}
export interface ApiResponse {
  status: ResponseType;
  statusCode: HttpStatusCode;
  data: Record<string, any>;
}

export interface Credential {
  email: string;
  username: string;
  password: string;
}

export enum AppDataKey {
  LoggedInUser = '__loggedInUser__',
}
