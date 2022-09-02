import Matches from '../database/models/Matches';
import Team from '../database/models/Teams';
import { MatchTeam } from '../interfaces/IMatches';
import ILeaderboard from '../interfaces/ILeaderboard';
import { orderTeams, leaderBoardHome, leaderBoardAway, leaderBoardAll } from '../helpers';

export default class LeaderBoardService {
  constructor(private board = Team) {
    this.board = board;
  }

  async finishMatch(type: string): Promise<ILeaderboard[]> {
    let leaderBoard: ILeaderboard[] = [];
    const matches = await this.board.findAll({
      include: [
        { model: Matches, as: `${type}`, where: { inProgress: 0 } },
      ],
    });
    const finish = matches as unknown as MatchTeam[];

    if (type === 'teamHome') leaderBoard = finish.map(leaderBoardHome);

    if (type === 'teamAway') leaderBoard = finish.map(leaderBoardAway);

    const orderLeaderBoard = leaderBoard.sort(orderTeams);
    return orderLeaderBoard;
  }

  async finishAllMatchs(): Promise<ILeaderboard[]> {
    const matches = await this.board.findAll({
      include: [
        { model: Matches, as: 'teamHome', where: { inProgress: 0 } },
        { model: Matches, as: 'teamAway', where: { inProgress: 0 } },
      ],
    });
    const finish = matches as unknown as MatchTeam[];

    const leaderBoard = finish.map(leaderBoardAll);

    const orderLeaderBoard = leaderBoard.sort(orderTeams);
    return orderLeaderBoard;
  }
}
