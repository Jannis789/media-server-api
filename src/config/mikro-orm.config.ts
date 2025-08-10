import { SqliteDriver, type Options } from '@mikro-orm/sqlite';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';
import { SqlHighlighter } from '@mikro-orm/sql-highlighter';
import { ConfigObject } from './index';

const MikroOrmConfig: Options = {
  driver: SqliteDriver,
  dbName: ConfigObject.databaseName,
  entities: ['src/db/entities/**/*.ts'],
  migrations: {
    path: 'src/db/migrations',
    pathTs: 'src/db/migrations',
  },
  metadataProvider: TsMorphMetadataProvider,
  highlighter: new SqlHighlighter(),
  debug: false,
};


export default MikroOrmConfig;
