import { MongoClient } from 'mongodb';

export interface Dependency {
  mongoClient: MongoClient;
}

export enum ResponseType {
  Success = 'success',
  Error = 'error',
}

export interface ApiResponse {
  status: ResponseType;
  data: Record<string, any>;
}

export interface Credential {
  email: string;
  username: string;
  password: string;
}

export enum AppDataKey {
  LoggedInUser = 'loggedInUser',
}
