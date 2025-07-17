import { pgTable, serial, text, boolean } from 'drizzle-orm/pg-core';

export const todo = pgTable('todo', {
  id: serial('id').primaryKey(),
  task: text('task').notNull(),
  done: boolean('done').default(false),
});
