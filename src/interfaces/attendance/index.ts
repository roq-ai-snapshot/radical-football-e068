import { PlayerInterface } from 'interfaces/player';
import { PracticeInterface } from 'interfaces/practice';

export interface AttendanceInterface {
  id?: string;
  player_id: string;
  practice_id: string;
  status: string;

  player?: PlayerInterface;
  practice?: PracticeInterface;
  _count?: {};
}
