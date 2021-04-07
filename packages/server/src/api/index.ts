import { Router, IRouter, Request, Response } from 'express';
import { Dependency } from '../utils/types';
import auth from './middleware/auth';
import login from './login';
import getUser from './getUser';
import updateUser from './updateUser';
import updateRate from './updateRate';
import getRateChart from './getRateChart';
import insertRate from './insertRate';
import deleteRate from './deleteRate';

export default (dependency: Dependency): IRouter => {
  const router = Router();

  router.post('/login', (req: Request, res: Response) => {
    login(req, res, dependency);
  });

  router.get('/getuser', auth(dependency), (req: Request, res: Response) => {
    getUser(req, res, dependency);
  });

  router.post('/updateuser', auth(dependency), (req: Request, res: Response) => {
    updateUser(req, res, dependency);
  });

  router.post('/insertrate', auth(dependency), (req: Request, res: Response) => {
    insertRate(req, res, dependency);
  });

  router.get('/getratechart', auth(dependency), (req: Request, res: Response) => {
    getRateChart(req, res, dependency);
  });

  router.post('/updaterate', auth(dependency), (req: Request, res: Response) => {
    updateRate(req, res, dependency);
  });

  router.post('/deleterate', auth(dependency), (req: Request, res: Response) => {
    deleteRate(req, res, dependency);
  });

  return router;
};
