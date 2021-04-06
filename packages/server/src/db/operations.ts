import { Dependency } from '../utils/types';
import conf from '../utils/config';

export const createRequiredCollections = (dependency: Dependency): Promise<void> => {
  return new Promise(async (resolve, reject) => {
    const DB = dependency.mongoClient.db(conf.mongodbDBName);
    const collections = await DB.listCollections().toArray();
    console.log('collections :: ', collections);
    resolve();
  });
};
