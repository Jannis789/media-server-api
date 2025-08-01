import { yoga } from '@elysiajs/graphql-yoga';
import { buildSchema } from 'type-graphql';
import { TranslationResolver } from '../../resolvers/Translation/translation.resolver';
import type Elysia from 'elysia';
import { orm } from '../../index';

async function resolveTranslationRoutes(app: Elysia, graphqlEndpoint: string) {
    console.log('resolveUserRoutes wird aufgerufen mit:', graphqlEndpoint);

    const em = orm.em.fork();
    const schema = await buildSchema({
        resolvers: [TranslationResolver],
        validate: false,
        container: { get: (cls: any) => new TranslationResolver(em) },
    });
    app.use(
        yoga({
            schema: schema,
            path: graphqlEndpoint,
        }),
    );
}

export default resolveTranslationRoutes;
