import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';

export const posts = pgTable('posts', {
  id: uuid().primaryKey().defaultRandom(),
  username: text().notNull(),
  image_url: text().notNull(),
  caption: text().notNull().default(''),
  created_at: timestamp({ withTimezone: true }).notNull().defaultNow(),
});
