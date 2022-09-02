import { Router } from 'express';
// import MatchService from '../services/matchesService';
import tokenValidate from '../middlewares/tokenValidate';
import MatchController from '../controllers/matchesController';

const matchRouter = Router();
// const matchService = new MatchService();
const matchController = new MatchController();

matchRouter
  .patch('/:id/finish', tokenValidate, (req, res, next) => matchController
    .updateProgress(req, res, next));

matchRouter
  .patch('/:id', tokenValidate, (req, res, next) => matchController
    .updateGoals(req, res, next));

matchRouter.get('/', (req, res, next) => matchController.getAll(req, res, next));

matchRouter.post('/', tokenValidate, (req, res, next) => matchController.create(req, res, next));

export default matchRouter;
