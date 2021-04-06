import { MongoClient } from 'mongodb';
import conf from '../utils/config';

export const getClient = (): Promise<MongoClient> => {
  const HOST = 'localhost';
  const DB_PORT = '27017';
  const uri = `mongodb://${conf.mongodbUserName}:${conf.mongodbPass}@${HOST}:${DB_PORT}`;
  console.log('connection URL :: ', uri);
  return new Promise((resolve, reject) => {
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    client.connect((err) => {
      if (err) {
        reject(err);
      } else {
        resolve(client);
      }
    });
  });
};
