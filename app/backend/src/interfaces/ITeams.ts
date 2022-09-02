export default interface ITeams {
  id: number,
  teamName: string,
}

export interface Teams {
  listAll(): Promise<ITeams[]>;
  findById(id:number): Promise<ITeams | null>
}
