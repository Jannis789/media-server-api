import { yoga } from "@elysiajs/graphql-yoga";
import { buildSchema } from "type-graphql";
import { UserResolver } from "../../resolvers/User/user.resolver";
import { MikroORM } from "@mikro-orm/core";
import type Elysia from "elysia";

async function resolveUserRoutes(app: Elysia, graphqlEndpoint: string) {
    const orm = await MikroORM.init();
    const em = orm.em.fork();
    const schema = await buildSchema({
        resolvers: [UserResolver],
        validate: false,
        container: { get: (cls: any) => new UserResolver(em) }
    });
    app.use(
        yoga({
            schema,
            graphqlEndpoint
        })
    );
}

export default resolveUserRoutes;