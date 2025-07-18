import { Hono } from "hono";
import userDB from "../../db/index";
import { users } from "../../../drizzle/schema/User/export";
import { buildSchema } from "drizzle-graphql";
import { graphqlServer } from "@hono/graphql-server";
import {
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLString,
    GraphQLInt,
} from "graphql";

const { entities } = buildSchema(userDB);

type CreateUserArgs = {
    username: string;
    email: string;
    passwordHash: string;
};

const createUser = async (_: unknown, args: CreateUserArgs) => {
    const [newUser] = await userDB
        .insert(users)
        .values({
            username: args.username,
            email: args.email,
            passwordHash: args.passwordHash,
        })
        .returning();
    return newUser;
};

const schema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: "Query",
        fields: {
            ...entities.queries,
        },
    }),
    mutation: new GraphQLObjectType({
        name: "Mutation",
        fields: {
            createUser: {
                type: new GraphQLObjectType({
                    name: "User",
                    fields: {
                        id: { type: GraphQLInt },
                        username: { type: GraphQLString },
                        email: { type: GraphQLString },
                    },
                }),
                args: {
                    username: { type: GraphQLString },
                    email: { type: GraphQLString },
                    passwordHash: { type: GraphQLString },
                },
                resolve: createUser,
            },
        },
    }),
    types: [
        ...Object.values(entities.types),
        ...Object.values(entities.inputs),
    ],
});

export default function registerUserRoutes(api: Hono, basePath: string) {
    api.use(
        basePath,
        graphqlServer({
            schema: schema,
            graphiql: true,
        }),
    );
}
