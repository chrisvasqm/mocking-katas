import { pgTable, real, text, timestamp, uuid } from 'drizzle-orm/pg-core';

export const posts = pgTable('posts', {
  id: uuid().primaryKey().defaultRandom(),
  username: text().notNull(),
  image_url: text().notNull(),
  caption: text().notNull().default(''),
  reach: real().notNull().default(0.7),
  created_at: timestamp({ withTimezone: true }).notNull().defaultNow(),
});
