import dotenv from 'dotenv';
import { expand } from 'dotenv-expand';
import pg from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';
import * as schema from '../db/schema.js';

expand(dotenv.config());

const { Pool } = pg;

export const pool = new Pool(
  process.env.DATABASE_URL && !process.env.DATABASE_URL.includes('${')
    ? { connectionString: process.env.DATABASE_URL }
    : {
        host: process.env.DB_HOST || 'localhost',
        user: process.env.DB_USER || 'postgres',
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        port: Number(process.env.DB_PORT) || 5432,
      }
);

export const db = drizzle(pool, { schema });