import { drizzle as createDrizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from './schema/User/index';

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

export const drizzle = createDrizzle(pool, { schema });

export const usersModel = drizzle.query.users;
