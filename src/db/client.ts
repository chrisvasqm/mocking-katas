import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import { config } from '../config.js';
import * as schema from './schema.js';

const pool = new Pool({ connectionString: config.databaseUrl });
pool.on('error', (error) => console.error('Idle Postgres client error', error));

export const db = drizzle({ client: pool, schema });
export type Database = typeof db;
