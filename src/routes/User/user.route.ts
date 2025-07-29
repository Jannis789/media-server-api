import { yoga } from "@elysiajs/graphql-yoga";
import { buildSchema } from "type-graphql";
import { UserResolver } from "../../resolvers/User/user.resolver";
import type Elysia from "elysia";
import { orm } from "../../index";

async function resolveUserRoutes(app: Elysia, graphqlEndpoint: string) {
    console.log("resolveUserRoutes wird aufgerufen mit:", graphqlEndpoint);

    const em = orm.em.fork();
    const schema = await buildSchema({
        resolvers: [UserResolver],
        validate: false,
        container: { get: (cls: any) => new UserResolver(em) }
    });
    app.use(
        yoga({
            schema: schema,
            path: graphqlEndpoint // <-- geändert von graphqlEndpoint zu path
        })
    );
}

export default resolveUserRoutes;