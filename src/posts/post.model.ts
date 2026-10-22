import { posts } from '../database/schema.ts';

export type Post = typeof posts.$inferSelect;
export type NewPost = typeof posts.$inferInsert;
