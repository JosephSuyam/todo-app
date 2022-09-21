import { object, string, ref } from 'yup';

const authSchema = {
  signupSchema: (
    object({
      email: string().email('Invalid Email.').required('Email is required'),
      password: string().required('Password is required'),
      password_confirmation: string().required().oneOf([ref('password'), null], 'Passwords must match'),
      first_name: string().required(),
      last_name: string().required(),
    })
  ),
  loginSchema: (
    object({
      email: string().email('Invalid Email.').required('Email is required'),
      password: string().required('Password is required'),
    })
  )
};

export default authSchema;