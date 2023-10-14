import { z } from 'zod';

const signUpSchema = z.object({
  email: z.string().email(),
  fullName: z.string().trim().min(1, 'Full name is required'),
  group: z.string().min(1, 'Group is required'),
  password: z
    .string()
    .trim()
    .min(8, 'Password must be at least 8 characters long'),
  variant: z
    .number({ invalid_type_error: 'Must be a valid number' })
    .positive('Variant must be greater than 0'),
});

export { signUpSchema };
