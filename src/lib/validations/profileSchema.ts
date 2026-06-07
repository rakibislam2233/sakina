import { z } from 'zod';

export const profileSchema = z.object({
  name: z.string().min(2, { message: 'Your traveler name cannot remain a hollow blank.' }),
  dailyGoalWords: z.number().min(50).max(2000),
  mindfulnessQuote: z.string().min(10, { message: 'Your mindfulness quote needs a little more depth.' }),
  selectedAuraGoal: z.string().min(5),
  notificationsEnabled: z.boolean(),
  avatarUrl: z.string().url(),
});

export type ProfileFormData = z.infer<typeof profileSchema>;
