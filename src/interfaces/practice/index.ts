import { AttendanceInterface } from 'interfaces/attendance';
import { TeamInterface } from 'interfaces/team';

export interface PracticeInterface {
  id?: string;
  team_id: string;
  date: Date;
  time: Date;
  location: string;
  attendance?: AttendanceInterface[];
  team?: TeamInterface;
  _count?: {
    attendance?: number;
  };
}
