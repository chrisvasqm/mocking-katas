import { integer, pgTable, serial, text } from 'drizzle-orm/pg-core';

export const videos = pgTable('videos', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  description: text('description').notNull(),
  duration: integer('duration').notNull(),
});
