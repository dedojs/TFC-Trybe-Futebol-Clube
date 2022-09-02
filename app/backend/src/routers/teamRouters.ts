import { Router } from 'express';
import TeamService from '../services/teamsService';
import TeamController from '../controllers/teamController';

const teamRouter = Router();
const teamService = new TeamService();
const teamController = new TeamController(teamService);

teamRouter.get('/:id', (req, res, next) => teamController.findById(req, res, next));

teamRouter.get('/', (req, res, next) => teamController.listAll(req, res, next));

export default teamRouter;
