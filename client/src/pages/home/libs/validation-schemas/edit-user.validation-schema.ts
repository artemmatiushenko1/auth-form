import { Role } from '@/lib/enums';
import { z } from 'zod';

const editUserSchema = z.object({
  email: z.string({ required_error: 'Email is required' }).trim().email(),
  fullName: z
    .string({ required_error: 'Full name is required' })
    .trim()
    .min(1, 'Full name is required'),
  group: z
    .string({ required_error: 'Group is required' })
    .min(1, 'Group is required'),
  role: z.nativeEnum(Role, { required_error: 'Role is required' }),
  variant: z
    .number({
      required_error: 'Variant is required',
      invalid_type_error: 'Must be a valid number',
    })
    .positive('Variant must be greater than 0'),
});

export { editUserSchema };
