import { MongoClient } from 'mongodb';

export type Dependency = {
  mongoClient: MongoClient;
};
