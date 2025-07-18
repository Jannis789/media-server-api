import { drizzle } from 'drizzle-orm/pglite';
import { PGlite } from '@electric-sql/pglite';
import * as schema from '../../drizzle/schema/User/export';

const sqlite = new PGlite('./local.db');

const userDB = drizzle(sqlite, { schema });

export default userDB;
