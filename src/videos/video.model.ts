import { videos } from '../db/schema.js';

export type Video = typeof videos.$inferSelect;
export type NewVideo = typeof videos.$inferInsert;
