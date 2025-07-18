import { Hono } from "hono";
import userDB from "../../db/index";
import { buildSchema } from 'drizzle-graphql';
import { graphqlServer } from '@hono/graphql-server'

const { schema } = buildSchema(userDB);

export default function registerUserRoutes(resolver: Hono, basePath: string) {
    resolver.use(
      basePath,
      graphqlServer({
        schema,
        graphiql: true,
      })
    )
}