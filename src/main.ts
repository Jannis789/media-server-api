import { db, sqlite } from '@db/index';
import { todo } from '../drizzle/schema';

async function main() {
  await sqlite.exec(`
    CREATE TABLE IF NOT EXISTS todo (
      id SERIAL PRIMARY KEY,
      task TEXT,
      done BOOLEAN DEFAULT false
    );
  `);

  await db.insert(todo).values({ task: 'Test Eintrag' }).execute();

  const result = await db.select().from(todo).execute();
  console.log(result);
}

main();
