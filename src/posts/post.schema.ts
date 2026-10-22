import { z } from 'zod';

export const createPostSchema = z.object({
  username: z.string().trim().min(1).max(40),
  image_url: z.url({ protocol: /^https?$/ }).max(2048),
  caption: z.string().max(2200).default(''),
});

export const postIdSchema = z.object({
  id: z.uuid(),
});
