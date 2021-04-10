import { Dependency } from '../utils/types';
import conf from '../utils/config';
import { User, Rate } from './model';
import { InsertOneWriteOpResult, ObjectID, UpdateWriteOpResult } from 'mongodb';

const dbName = conf.mLabDBName;

export const createRequiredCollections = (dependency: Dependency): Promise<void> => {
  return new Promise(async (resolve, reject) => {
    try {
      // const DB = dependency.mongoClient.db(conf.mongodbDBName);
      const DB = dependency.mongoClient.db(dbName);
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
  const DB = dependency.mongoClient.db(dbName);
  const userCollection = DB.collection(conf.collections.userCollection);
  return userCollection.insertOne(user);
};

export const updateUser = (
  dependency: Dependency,
  id: string,
  path: string[],
  updatedValue: any,
): Promise<UpdateWriteOpResult> => {
  const DB = dependency.mongoClient.db(dbName);
  const userCollection = DB.collection(conf.collections.userCollection);
  const query = { _id: new ObjectID(id) };

  const newValue = {};
  let targetObj = newValue;
  for (let i = 0; i < path.length; i++) {
    const key = path[i];
    if (i === path.length - 1) {
      targetObj[key] = updatedValue;
    } else {
      targetObj[key] = {};
      targetObj = targetObj[key];
    }
  }

  return userCollection.updateOne(query, {
    $set: newValue,
  });
};

export const getUser = (dependency: Dependency, key: string, value: any): Promise<any> => {
  const DB = dependency.mongoClient.db(dbName);
  const userCollection = DB.collection(conf.collections.userCollection);
  const query = {};
  query[key] = key === '_id' ? new ObjectID(value) : value;
  return userCollection.findOne(query);
};

export const getAllUsers = (dependency: Dependency, key: string, value: any): Promise<any> => {
  const DB = dependency.mongoClient.db(dbName);
  const userCollection = DB.collection(conf.collections.userCollection);
  const query = {};
  query[key] = value;
  return userCollection.find(query).toArray();
};

export const insertRate = (dependency: Dependency, rateRow: Rate): Promise<InsertOneWriteOpResult<any>> => {
  const DB = dependency.mongoClient.db(dbName);
  const userCollection = DB.collection(conf.collections.rateCollection);
  return userCollection.insertOne(rateRow);
};

export const getRate = (dependency: Dependency, id: string): Promise<any> => {
  const DB = dependency.mongoClient.db(dbName);
  const userCollection = DB.collection(conf.collections.rateCollection);
  return userCollection.findOne({ _id: new ObjectID(id) });
};

export const getRateChart = (dependency: Dependency, userId: string): Promise<any> => {
  const DB = dependency.mongoClient.db(dbName);
  const userCollection = DB.collection(conf.collections.rateCollection);
  return userCollection.find({ userId }).toArray();
};

export const deleteRate = (dependency: Dependency, id: string): Promise<any> => {
  const DB = dependency.mongoClient.db(dbName);
  const userCollection = DB.collection(conf.collections.rateCollection);
  return userCollection.deleteOne({ _id: new ObjectID(id) });
};

export const updateRate = (
  dependency: Dependency,
  id: string,
  path: string[],
  updatedValue: any,
): Promise<UpdateWriteOpResult> => {
  const DB = dependency.mongoClient.db(dbName);
  const userCollection = DB.collection(conf.collections.rateCollection);
  const query = { _id: new ObjectID(id) };

  const newValue = {};
  let targetObj = newValue;
  for (let i = 0; i < path.length; i++) {
    const key = path[i];
    if (i === path.length - 1) {
      targetObj[key] = updatedValue;
    } else {
      targetObj[key] = {};
      targetObj = targetObj[key];
    }
  }

  return userCollection.updateOne(query, {
    $set: newValue,
  });
};
