import { TeamInterface } from 'interfaces/team';

export interface GameInterface {
  id?: string;
  team_id: string;
  date: Date;
  time: Date;
  location: string;
  opponent: string;

  team?: TeamInterface;
  _count?: {};
}
