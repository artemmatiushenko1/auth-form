import { z } from 'zod';

const signInSchema = z.object({
  email: z.string({ required_error: 'Email is required' }).trim().email(),
  password: z
    .string({ required_error: 'Password is required' })
    .trim()
    .min(1, 'Password is required'),
});

export { signInSchema };
