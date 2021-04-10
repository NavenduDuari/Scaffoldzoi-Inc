import dotenv from 'dotenv';

dotenv.config();

export default {
  mongodbUserName: process.env.MONGODB_ROOT_USERNAME,
  mongodbPass: process.env.MONGODB_ROOT_PASSWORD,
  mongodbDBName: process.env.MONGODB_DB_NAME,
  mLabUserName: process.env.MLAB_ROOT_USERNAME,
  mLabPass: process.env.MLAB_ROOT_PASSWORD,
  mLabDBName: process.env.MLAB_DB_NAME,
  collections: {
    userCollection: 'user',
    rateCollection: 'rate',
  },
  port: process.env.PORT,
  jwtSecret: process.env.JWT_SECRET,
};
