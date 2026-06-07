import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email({ message: 'A valid email is required to summon your logs.' }),
  password: z.string().min(6, { message: 'Password must have at least 6 characters.' }),
});

export const registerSchema = z
  .object({
    name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
    email: z.string().email({ message: 'Please provide a valid diagnostic email.' }),
    password: z.string().min(6, { message: 'Password must be at least 6 characters long for security.' }),
    confirmPassword: z.string().min(6),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Confirm password must match.',
    path: ['confirmPassword'],
  });

export const forgotSchema = z.object({
  email: z.string().email({ message: 'Enter the email linked with your reflection desk.' }),
});

export const resetSchema = z.object({
  tempToken: z.string().min(4, { message: 'Enter the 4-digit code dispatched to your inbox.' }),
  newPassword: z.string().min(6, { message: 'Secure passwords require at least 6 characters.' }),
});

export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
export type ForgotFormData = z.infer<typeof forgotSchema>;
export type ResetFormData = z.infer<typeof resetSchema>;

export const changePasswordSchema = z
  .object({
    currentPassword: z.string(),
    newPassword: z.string().min(6, { message: 'New password must be at least 6 characters.' }),
    confirmPassword: z.string().min(6),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'Confirm password must match.',
    path: ['confirmPassword'],
  });

export type ChangePasswordFormData = z.infer<typeof changePasswordSchema>;
