import Koa from 'koa';
import MikroOrmConfig from './config/mikro-orm.config';
import { MikroORM } from '@mikro-orm/core';
import { useKoaServer } from 'routing-controllers';
import { ValidationErrorHandler } from './middlewares/ValidateErrorHandler';
import { RoleService } from './services/auth/RoleService';
import type { EntityManager } from '@mikro-orm/sqlite';

declare global {
  var orm: MikroORM;
  var app: Koa;
  var em: EntityManager;
}

export async function createApp() {
  const orm = await MikroORM.init(MikroOrmConfig);
  const app = new Koa();
  const em = orm.em.fork();
  global.app = app;
  global.orm = orm;
  global.em = em;

  const roleService = new RoleService(em);
  await roleService.createDefaultRoles();

  useKoaServer(app, {
    controllers: [__dirname + '/controller/**/*.ts'],
    middlewares: [ValidationErrorHandler],
    validation: true,
    classTransformer: true,
    defaultErrorHandler: false,
  });

  return app;
}
