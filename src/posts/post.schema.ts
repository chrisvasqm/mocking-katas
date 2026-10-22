import { z } from 'zod';

export const createPostSchema = z.object({
  username: z.string().trim().min(1).max(30),
  imageUrl: z.httpUrl().max(2048),
  caption: z.string().max(2200).default(''),
});

export const postIdSchema = z.object({
  id: z
    .string()
    .regex(/^\d+$/)
    .transform(Number)
    .pipe(z.number().int().positive().max(2_147_483_647)),
});
