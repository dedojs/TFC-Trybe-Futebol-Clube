import { Request, Response, NextFunction } from 'express';
// import TeamService from '../services/teamsService';
import { Teams } from '../interfaces/ITeams';

export default class TeamController {
  constructor(private teamService: Teams) {
    this.teamService = teamService;
  }

  async listAll(req: Request, res: Response, next: NextFunction) {
    try {
      const team = await this.teamService.listAll();
      return res.status(200).json(team);
    } catch (err) {
      next(err);
    }
  }

  async findById(req: Request, res: Response, next: NextFunction) {
    try {
      const team = await this.teamService.findById(Number(req.params.id));
      if (!team) {
        return res.status(404).json({ message: 'Team not found' });
      }
      return res.status(200).json(team);
    } catch (err) {
      next(err);
    }
  }
}
