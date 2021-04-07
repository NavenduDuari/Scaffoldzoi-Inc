import { Dependency } from '../utils/types';
import conf from '../utils/config';
import { User, Rate } from './model';
import { InsertOneWriteOpResult, UpdateWriteOpResult } from 'mongodb';

export const createRequiredCollections = (dependency: Dependency): Promise<void> => {
  return new Promise(async (resolve, reject) => {
    try {
      const DB = dependency.mongoClient.db(conf.mongodbDBName);
      DB.collection(conf.collections.userCollection);
      DB.collection(conf.collections.rateCollection);
      console.log('DB :: collections created');
      resolve();
    } catch (err) {
      reject(err);
    }
  });
};

export const insertUser = (dependency: Dependency, user: User): Promise<InsertOneWriteOpResult<any>> => {
  const DB = dependency.mongoClient.db(conf.mongodbDBName);
  const userCollection = DB.collection(conf.collections.userCollection);
  return userCollection.insertOne(user);
};

export const updateUser = (
  dependency: Dependency,
  email: string,
  keyToUpdate: string,
  updatedValue: any,
): Promise<UpdateWriteOpResult> => {
  const DB = dependency.mongoClient.db(conf.mongodbDBName);
  const userCollection = DB.collection(conf.collections.userCollection);
  const query = { email };

  const newValue = {};
  newValue[keyToUpdate] = updatedValue;
  return userCollection.updateOne(query, {
    $set: newValue,
  });
};

export const getUser = (dependency: Dependency, email: string): Promise<any> => {
  const DB = dependency.mongoClient.db(conf.mongodbDBName);
  const userCollection = DB.collection(conf.collections.userCollection);
  return userCollection.findOne({ email });
};

export const insertRateRow = (dependency: Dependency, rateRow: Rate): Promise<InsertOneWriteOpResult<any>> => {
  const DB = dependency.mongoClient.db(conf.mongodbDBName);
  const userCollection = DB.collection(conf.collections.rateCollection);
  return userCollection.insertOne(rateRow);
};

export const getRateChartEntity = (dependency: Dependency, id: string): Promise<any> => {
  const DB = dependency.mongoClient.db(conf.mongodbDBName);
  const userCollection = DB.collection(conf.collections.rateCollection);
  return userCollection.findOne({ _id: id });
};

export const getRateChart = (dependency: Dependency, email: string): Promise<any> => {
  const DB = dependency.mongoClient.db(conf.mongodbDBName);
  const userCollection = DB.collection(conf.collections.rateCollection);
  return userCollection.find({ email }).toArray();
};

export const deleteRateChartEntity = (dependency: Dependency, id: string): Promise<any> => {
  const DB = dependency.mongoClient.db(conf.mongodbDBName);
  const userCollection = DB.collection(conf.collections.rateCollection);
  return userCollection.deleteOne({ _id: id });
};

export const updateRateChartEntity = (
  dependency: Dependency,
  email: string,
  keyToUpdate: string,
  updatedValue: any,
): Promise<UpdateWriteOpResult> => {
  const DB = dependency.mongoClient.db(conf.mongodbDBName);
  const userCollection = DB.collection(conf.collections.rateCollection);
  const query = { email };

  const newValue = {};
  newValue[keyToUpdate] = updatedValue;
  return userCollection.updateOne(query, {
    $set: newValue,
  });
};
