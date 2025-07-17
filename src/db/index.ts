import { drizzle } from 'drizzle-orm/pglite';
import { PGlite } from '@electric-sql/pglite';
import * as schema from '../../drizzle/schema';

const sqlite = new PGlite('./local.db');

export const db = drizzle(sqlite, { schema });
export { sqlite };
