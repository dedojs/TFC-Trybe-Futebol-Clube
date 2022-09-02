import { Router } from 'express';
import LeaderBoardService from '../services/leaderboardService';
import LeaderBoardController from '../controllers/leaderboardController';

const leaderBoardService = new LeaderBoardService();
const leaderBoardController = new LeaderBoardController(leaderBoardService);

const leaderRouter = Router();

leaderRouter.get('/home', (req, res, next) => leaderBoardController.matchHome(req, res, next));
leaderRouter.get('/away', (req, res, next) => leaderBoardController.matchAway(req, res, next));
leaderRouter.get('/', (req, res, next) => leaderBoardController.matchAll(req, res, next));

export default leaderRouter;
