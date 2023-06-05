import { AttendanceInterface } from 'interfaces/attendance';
import { PlayerProfileInterface } from 'interfaces/player-profile';
import { UserInterface } from 'interfaces/user';
import { TeamInterface } from 'interfaces/team';

export interface PlayerInterface {
  id?: string;
  user_id: string;
  team_id: string;
  attendance?: AttendanceInterface[];
  player_profile?: PlayerProfileInterface[];
  user?: UserInterface;
  team?: TeamInterface;
  _count?: {
    attendance?: number;
    player_profile?: number;
  };
}
