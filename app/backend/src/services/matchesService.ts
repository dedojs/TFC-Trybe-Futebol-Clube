import Team from '../database/models/Teams';
import Match from '../database/models/Matches';
import IMatches, { MatchUpdate } from '../interfaces/IMatches';

export default class MatchService {
  constructor(private match = Match) {
    this.match = match;
  }

  // aula xp revisao com sequelize
  // o atribute quando passado define exatamente o que queremos
  async getAll(): Promise<IMatches[]> {
    const matches = this.match.findAll({
      include: [
        { model: Team, as: 'teamHome', attributes: ['teamName'] },
        { model: Team, as: 'teamAway', attributes: ['teamName'] },
      ],
    });
    return matches as unknown as IMatches[];
  }

  async create(data: IMatches) {
    const homeTeam = await this.match.findOne({ where: { id: data.homeTeam } });
    const awayTeam = await this.match.findOne({ where: { id: data.awayTeam } });

    if (data.homeTeam === data.awayTeam) return 'sameteam';

    if (!homeTeam || !awayTeam) {
      return null;
    }

    const newMatch = await this.match.create({ ...data, inProgress: true });
    return newMatch;
  }

  async updateProgress(id: number) {
    await this.match.update({ inProgress: false }, { where: { id } });
  }

  async updateGoals(id: number, data: MatchUpdate) {
    await this.match.update({ ...data }, { where: { id } });
  }
}
