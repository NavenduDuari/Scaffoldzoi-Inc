import dotenv from 'dotenv';

dotenv.config();

export default {
  mongodbUserName: process.env.MONGODB_ROOT_USERNAME,
  mongodbPass: process.env.MONGODB_ROOT_PASSWORD,
  mongodbURL: process.env.MONGODB_URL,
  mongodbDBName: process.env.MONGODB_DB_NAME,
  userCollection: 'user',
  rateCollection: 'rate',
  port: process.env.PORT,
};
