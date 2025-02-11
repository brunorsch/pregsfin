import { MariaDbDriver, Options } from '@mikro-orm/mariadb';
import { Migrator } from '@mikro-orm/migrations';
import { SoftDeleteHandler } from 'mikro-orm-soft-delete';

const config: Options = {
  migrations: {
    tableName: 'mikroorm_migrations',
    path: './migrations',
    transactional: true,
    disableForeignKeys: false,
    allOrNothing: true,
    dropTables: false,
    emit: 'ts',
  },
  extensions: [Migrator, SoftDeleteHandler],
  entities: ['./dist/**/*.entity.js'],
  entitiesTs: ['./src/**/*.entity.ts'],
  dbName: 'pregsfin-mariadb',
  driver: MariaDbDriver,
};

export default config;
