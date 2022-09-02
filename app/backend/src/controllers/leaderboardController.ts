import { Request, Response, NextFunction } from 'express';

import { LeaderBoard } from '../interfaces/ILeaderboard';

export default class LeaderBoardController {
  constructor(private leaderBoardService: LeaderBoard) {
    this.leaderBoardService = leaderBoardService;
  }

  async matchHome(req: Request, res: Response, next: NextFunction) {
    try {
      const leaderBoard = await this.leaderBoardService.finishMatch('teamHome');
      return res.status(200).json(leaderBoard);
    } catch (err) {
      next(err);
    }
  }

  async matchAway(req: Request, res: Response, next: NextFunction) {
    try {
      const leaderBoard = await this.leaderBoardService.finishMatch('teamAway');
      return res.status(200).json(leaderBoard);
    } catch (err) {
      next(err);
    }
  }

  async matchAll(req: Request, res: Response, next: NextFunction) {
    try {
      const leaderBoard = await this.leaderBoardService.finishAllMatchs();
      return res.status(200).json(leaderBoard);
    } catch (err) {
      next(err);
    }
  }
}
