import { drizzle } from 'drizzle-orm/node-postgres';
import { config } from '../config.js';

export const database = drizzle(config.databaseUrl);
export type Database = typeof database;
