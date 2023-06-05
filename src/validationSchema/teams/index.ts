import * as yup from 'yup';
import { coachValidationSchema } from 'validationSchema/coaches';
import { gameValidationSchema } from 'validationSchema/games';
import { playerValidationSchema } from 'validationSchema/players';
import { practiceValidationSchema } from 'validationSchema/practices';

export const teamValidationSchema = yup.object().shape({
  name: yup.string().required(),
  academy_id: yup.string().nullable().required(),
  coach: yup.array().of(coachValidationSchema),
  game: yup.array().of(gameValidationSchema),
  player: yup.array().of(playerValidationSchema),
  practice: yup.array().of(practiceValidationSchema),
});
