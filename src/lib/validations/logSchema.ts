/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { z } from 'zod';

export const moodEnum = z.enum(['Peaceful', 'Thoughtful', 'Sad', 'Stressed', 'Creative']);

export const journalLogSchema = z.object({
  title: z
    .string()
    .max(80, { message: 'The title should be brief, like a book chapter (maximum 80 characters).' })
    .optional()
    .or(z.literal('')),
  content: z
    .string()
    .min(10, { message: 'Write at least 10 letters to gather your thoughts of the midnight hour.' })
    .max(5000, { message: 'That is a deep nocturne entry. Please limit to 5,000 characters.' }),
  mood: moodEnum,
});

export type JournalLogFormData = z.infer<typeof journalLogSchema>;
