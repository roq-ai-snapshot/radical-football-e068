import * as yup from 'yup';
import { attendanceValidationSchema } from 'validationSchema/attendances';

export const practiceValidationSchema = yup.object().shape({
  date: yup.date().required(),
  time: yup.date().required(),
  location: yup.string().required(),
  team_id: yup.string().nullable().required(),
  attendance: yup.array().of(attendanceValidationSchema),
});
