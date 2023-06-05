import * as yup from 'yup';
import { attendanceValidationSchema } from 'validationSchema/attendances';
import { playerProfileValidationSchema } from 'validationSchema/player-profiles';

export const playerValidationSchema = yup.object().shape({
  user_id: yup.string().nullable().required(),
  team_id: yup.string().nullable().required(),
  attendance: yup.array().of(attendanceValidationSchema),
  player_profile: yup.array().of(playerProfileValidationSchema),
});
