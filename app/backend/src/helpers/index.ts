import IMatches, { MatchReturn, MatchTeam } from '../interfaces/IMatches';
import ILeaderboard from '../interfaces/ILeaderboard';

export const victory = (type: string, matchs: IMatches[]) => {
  let victories = 0;

  if (type === 'teamHome') {
    victories = matchs.reduce((acc: number, curr: IMatches) => {
      if (curr.homeTeamGoals > curr.awayTeamGoals) return acc + 1;
      return acc;
    }, 0);
  }

  if (type === 'teamAway') {
    victories = matchs.reduce((acc: number, curr: IMatches) => {
      if (curr.homeTeamGoals < curr.awayTeamGoals) return acc + 1;
      return acc;
    }, 0);
  }
  return victories;
};

export const draw = (matchs: IMatches[]) => {
  const draws = matchs.reduce((acc: number, curr: IMatches) => {
    if (curr.homeTeamGoals === curr.awayTeamGoals) return acc + 1;
    return acc;
  }, 0);
  return draws;
};

export const defeat = (type: string, matchs: IMatches[]) => {
  let losses = 0;

  if (type === 'teamHome') {
    losses = matchs.reduce((acc: number, curr: IMatches) => {
      if (curr.homeTeamGoals < curr.awayTeamGoals) return acc + 1;
      return acc;
    }, 0);
  }

  if (type === 'teamAway') {
    losses = matchs.reduce((acc: number, curr: IMatches) => {
      if (curr.homeTeamGoals > curr.awayTeamGoals) return acc + 1;
      return acc;
    }, 0);
  }
  return losses;
};

export const goalHome = (matchs: IMatches[]) => {
  const goalsFavor = matchs.reduce((acc: number, curr: IMatches) => acc + curr.homeTeamGoals, 0);
  return goalsFavor;
};

export const goalAway = (matchs: IMatches[]) => {
  const goalsOwn = matchs.reduce((acc: number, curr: IMatches) => acc + curr.awayTeamGoals, 0);
  return goalsOwn;
};

export const points = (type: string, matchs: MatchReturn[]) => {
  const victories = victory(type, matchs);
  const draws = draw(matchs);
  const point = victories * 3 + draws;
  return point;
};

export const orderTeams = (a: ILeaderboard, b: ILeaderboard) => {
  if (a.totalPoints < b.totalPoints) { return 1; }
  if (a.totalPoints > b.totalPoints) { return -1; }

  if (a.totalVictories < b.totalVictories) { return 1; }
  if (a.totalVictories > b.totalVictories) { return -1; }

  if (a.goalsBalance < b.goalsBalance) { return 1; }
  if (a.goalsBalance > b.goalsBalance) { return -1; }

  if (a.goalsFavor < b.goalsFavor) { return 1; }
  if (a.goalsFavor > b.goalsFavor) { return -1; }

  if (a.goalsOwn < b.goalsOwn) { return 1; }
  if (a.goalsOwn > b.goalsOwn) { return -1; }

  return 0;
};

export const leaderBoardHome = ({ teamName, teamHome }: MatchTeam) => ({
  name: teamName,
  totalPoints: points('teamHome', teamHome),
  totalGames: teamHome.length,
  totalVictories: victory('teamHome', teamHome),
  totalDraws: draw(teamHome),
  totalLosses: defeat('teamHome', teamHome),
  goalsFavor: goalHome(teamHome),
  goalsOwn: goalAway(teamHome),
  goalsBalance: goalHome(teamHome) - goalAway(teamHome),
  efficiency: Number(((points('teamHome', teamHome) / (teamHome.length * 3)) * 100).toFixed(2)),
});

export const leaderBoardAway = ({ teamName, teamAway }: MatchTeam) => ({
  name: teamName,
  totalPoints: points('teamAway', teamAway),
  totalGames: teamAway.length,
  totalVictories: victory('teamAway', teamAway),
  totalDraws: draw(teamAway),
  totalLosses: defeat('teamAway', teamAway),
  goalsFavor: goalAway(teamAway),
  goalsOwn: goalHome(teamAway),
  goalsBalance: goalAway(teamAway) - goalHome(teamAway),
  efficiency: Number(((points('teamAway', teamAway) / (teamAway.length * 3)) * 100).toFixed(2)),
});

const efficiency = (teamHome: MatchReturn[], teamAway: MatchReturn[]) => {
  const point = points('teamAway', teamAway) + points('teamHome', teamHome);
  const matchs = (teamHome.length + teamAway.length) * 3;
  const eff = Number(((point / matchs) * 100).toFixed(2));
  return eff;
};

export const leaderBoardAll = ({ teamName, teamHome, teamAway }: MatchTeam) => ({
  name: teamName,
  totalPoints: points('teamAway', teamAway) + points('teamHome', teamHome),
  totalGames: teamAway.length + teamHome.length,
  totalVictories: victory('teamAway', teamAway) + victory('teamHome', teamHome),
  totalDraws: draw(teamAway) + draw(teamHome),
  totalLosses: defeat('teamAway', teamAway) + defeat('teamHome', teamHome),
  goalsFavor: goalHome(teamHome) + goalAway(teamAway),
  goalsOwn: goalHome(teamAway) + goalAway(teamHome),
  goalsBalance: goalAway(teamAway) - goalHome(teamAway) + goalHome(teamHome) - goalAway(teamHome),
  efficiency: efficiency(teamHome, teamAway),
});
