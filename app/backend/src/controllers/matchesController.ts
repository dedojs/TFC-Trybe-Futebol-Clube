import { Request, Response, NextFunction } from 'express';
import MatchService from '../services/matchesService';
// import { Matchers } from '../interfaces/IMatches';

// seguindo outro exemplo da revisao em sequelize da xp, podemos
// instanciar a classe sem o constructor, uma 3 forma de fazer
export default class MatchController {
  private matchService: MatchService = new MatchService();

  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const match = await this.matchService.getAll();
      return res.status(200).json(match);
    } catch (err) {
      next(err);
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const newMatch = await this.matchService.create(req.body);
      // console.log('req', newMatch);
      if (!newMatch) {
        return res.status(404).json({ message: 'There is no team with such id!' });
      }
      if (newMatch === 'sameteam') {
        return res.status(401)
          .json({ message: 'It is not possible to create a match with two equal teams' });
      }
      return res.status(201).json(newMatch);
    } catch (err) {
      next(err);
    }
  }

  async updateProgress(req: Request, res: Response, next: NextFunction) {
    try {
      await this.matchService.updateProgress(Number(req.params.id));
      res.status(200).json({ message: 'Finished' });
    } catch (err) {
      next(err);
    }
  }

  async updateGoals(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      await this.matchService.updateGoals(Number(id), req.body);
      res.status(200).json({ message: 'Goals update' });
    } catch (err) {
      next(err);
    }
  }
}
