import Team from '../database/models/Teams';
import ITeams from '../interfaces/ITeams';

export default class TeamService {
  constructor(private team = Team) {
    this.team = team;
  }

  async listAll(): Promise<ITeams[]> {
    const teams = await this.team.findAll();
    return teams;
  }

  async findById(id: number): Promise<ITeams | null> {
    const team = await this.team.findByPk(id);
    return team;
  }
}
