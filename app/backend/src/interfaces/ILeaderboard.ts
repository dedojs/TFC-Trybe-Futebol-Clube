export default interface ILeaderboard {
  name: string;
  totalPoints: number;
  totalGames: number;
  totalVictories: number;
  totalDraws: number;
  totalLosses: number;
  goalsFavor: number;
  goalsOwn: number;
  goalsBalance: number;
  efficiency: number;
}

export interface LeaderBoard {
  finishMatch(type: string): Promise<ILeaderboard[] | void>
  finishAllMatchs(): Promise<ILeaderboard[] | void>
}
