import { PlayerInterface } from 'interfaces/player';

export interface PlayerProfileInterface {
  id?: string;
  player_id: string;
  height?: number;
  weight?: number;
  position?: string;

  player?: PlayerInterface;
  _count?: {};
}
