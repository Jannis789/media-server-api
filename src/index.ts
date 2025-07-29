import "reflect-metadata";
import { Elysia } from "elysia";
import { MikroORM } from "@mikro-orm/core";
import mikroOrmConfig from "../mikro-orm.config";
import resolveRoutes from "./routes";

const orm = await MikroORM.init(mikroOrmConfig);
await orm.getMigrator().up(); // Migrationen ausführen

async function main() {
  const app = new Elysia();

  await resolveRoutes(app);

  await app.listen(3000);
  console.log("Server läuft auf http://localhost:3000");
}

main().catch(console.error);

export { orm };