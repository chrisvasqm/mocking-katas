import { integer, pgTable, text, timestamp } from 'drizzle-orm/pg-core';

export const posts = pgTable('posts', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  username: text().notNull(),
  image_url: text().notNull(),
  caption: text().notNull().default(''),
  created_at: timestamp({ withTimezone: true }).notNull().defaultNow(),
});
