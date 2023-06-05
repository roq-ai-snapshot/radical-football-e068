import { CoachInterface } from 'interfaces/coach';
import { GameInterface } from 'interfaces/game';
import { PlayerInterface } from 'interfaces/player';
import { PracticeInterface } from 'interfaces/practice';
import { AcademyInterface } from 'interfaces/academy';

export interface TeamInterface {
  id?: string;
  name: string;
  academy_id: string;
  coach?: CoachInterface[];
  game?: GameInterface[];
  player?: PlayerInterface[];
  practice?: PracticeInterface[];
  academy?: AcademyInterface;
  _count?: {
    coach?: number;
    game?: number;
    player?: number;
    practice?: number;
  };
}
