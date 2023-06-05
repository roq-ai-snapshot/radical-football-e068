import * as yup from 'yup';

export const playerProfileValidationSchema = yup.object().shape({
  height: yup.number().integer(),
  weight: yup.number().integer(),
  position: yup.string(),
  player_id: yup.string().nullable().required(),
});
