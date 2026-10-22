import { posts } from '../db/schema.js';

export type Post = typeof posts.$inferSelect;
export type NewPost = typeof posts.$inferInsert;
