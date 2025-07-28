import "reflect-metadata";
import { Elysia } from "elysia";
import { MikroORM } from "@mikro-orm/core";
import mikroOrmConfig from "../mikro-orm.config";
import resolveRoutes from "./routes";

async function main() {
  await MikroORM.init(mikroOrmConfig);

  const app = new Elysia();

  await app.listen(3000);
  console.log("Server läuft auf http://localhost:3000");

  resolveRoutes(app);
}

main().catch(console.error);
