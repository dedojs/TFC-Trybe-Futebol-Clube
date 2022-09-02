export default interface IMatches {
  id?: number;
  homeTeam: number;
  homeTeamGoals: number;
  awayTeam: number;
  awayTeamGoals: number;
  inProgress?: boolean;
  teamHome?: { teamName: string };
  teamAway?: { teamName: string };
}

export interface MatchUpdate {
  homeTeamGoals?: number;
  awayTeamGoals?: number;
}

export interface MatchReturn {
  id?: number;
  homeTeam: number;
  homeTeamGoals: number;
  awayTeam: number;
  awayTeamGoals: number;
  inProgress?: boolean;
}

export interface MatchTeam{
  id?: number;
  teamName: string;
  teamHome: MatchReturn[];
  teamAway: MatchReturn[];
}

export interface Matchers {
  getAll(): Promise<IMatches[]>;
  create(data: IMatches): Promise <IMatches | void>;
  update(id: number): Promise<void>;
  updateGoals(data: MatchUpdate): Promise<void>;
}
