import { drizzle } from 'drizzle-orm/node-postgres';
import { config } from '../config.ts';

export const database = drizzle(config.databaseUrl);
database.$client.on('error', (error) => console.error('Idle Postgres client error', error));

export type Database = typeof database;
