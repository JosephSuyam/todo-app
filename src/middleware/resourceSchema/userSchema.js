import { object, string, ref } from 'yup';

const userSchema = {
  updateUserSchema: (
    object({
      password: string(),
      password_confirmation: string().oneOf([ref('password'), null], 'Passwords must match'),
      first_name: string().required(),
      last_name: string().required(),
    })
  ),
};

export default userSchema;