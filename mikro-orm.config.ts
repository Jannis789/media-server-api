import type { Options } from '@mikro-orm/sqlite';
import { SqliteDriver } from '@mikro-orm/sqlite';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';
import { SqlHighlighter } from '@mikro-orm/sql-highlighter';

const config: Options = {
  driver: SqliteDriver,
  dbName: 'sqlite.db',
  entities: ['dist/entities'],
  entitiesTs: ['src/entities'],
    migrations: {
    path: 'migrations',
    pathTs: 'migrations',
  },
  metadataProvider: TsMorphMetadataProvider,
  highlighter: new SqlHighlighter(),
  debug: true,
};

export default config;