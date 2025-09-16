import Koa from 'koa';
import MikroOrmConfig from './config/mikro-orm.config';
import cors from "@koa/cors";
import { MikroORM } from '@mikro-orm/core';
import { useKoaServer } from 'routing-controllers';
import { ValidationErrorHandler } from './middlewares/ValidateErrorHandler';
import { LanguageHandlerMiddleware } from './middlewares/LanguageHandler';
import { RoleService } from './services/User/RoleService';
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

  app.use(cors({
    origin: "*",        // alle Origins
    allowMethods: ["GET","POST","PUT","DELETE","OPTIONS"], // alle Methoden
    allowHeaders: ["Content-Type", "Authorization", "x-Session-UUID", "Accept-Language"],       // gängige Header
  }));

  const roleService = new RoleService(em);
  await roleService.createDefaultRoles();

  useKoaServer(app, {
    controllers: [__dirname + '/controller/**/*.ts'],
    middlewares: [ValidationErrorHandler, LanguageHandlerMiddleware],
    validation: true,
    classTransformer: true,
    defaultErrorHandler: false,
  });

  app.use(cors({
    origin: '*',
  }));

  return app;
}
