import { object, number, string } from 'yup';

const resourceSchema = {
  userSchema: (
    object({
      user_id: number().integer().positive(),
      email: string().email().required(),
      password: string().required(),
      password_confirmation: string(),
      first_name: string().required(),
      last_name: string().required(),
    })
  ),
};

export default resourceSchema;