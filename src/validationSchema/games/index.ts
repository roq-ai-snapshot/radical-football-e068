import * as yup from 'yup';

export const gameValidationSchema = yup.object().shape({
  date: yup.date().required(),
  time: yup.date().required(),
  location: yup.string().required(),
  opponent: yup.string().required(),
  team_id: yup.string().nullable().required(),
});
