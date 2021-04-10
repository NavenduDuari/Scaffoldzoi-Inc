import express from 'express';
import cors from 'cors';
import { getClient } from './db/connection';
import { createRequiredCollections } from './db/operations';
import conf from './utils/config';
import { Dependency } from './utils/types';
import apiRoutes from './api';

const app = express();
app.use(cors());
app.use(express.json());
const port = conf.port || 8888;

if (!conf.mLabUserName || !conf.mLabPass) {
  console.error('Env file not set correctly');
  process.exit();
}

getClient()
  .then(async (client) => {
    const dependency: Dependency = {
      mongoClient: client,
    };

    await createRequiredCollections(dependency);

    app.get('/', (_, res) => {
      res.send('Welcome to API');
    });

    app.use('/api', apiRoutes(dependency));

    app.listen(port, () => {
      console.log(`Example app listening at http://localhost:${port}`);
    });
  })
  .catch((e) => {
    console.log(e);
  });
