import resolver from "../resolver";
import { usersModel } from "../../../drizzle/config";
import { Hono } from "hono";

export default function registerUserRoutes(resolver: Hono) {
    resolver.post('/users/list', async (context) => {
        try {
            const { limit = 10, offset = 0 } = await context.req.json().catch(() => ({}));
            console.log('Query-Parameter:', { limit, offset });

            const result = await usersModel.findMany({
                limit: Number(limit),
                offset: Number(offset),
            });

            return context.json(result ?? []);
        } catch (error) {
            console.error('Fehler in /users/list:', error);
            const errorMessage = (error instanceof Error) ? error.message : 'Internal Server Error';
            return context.json({ error: errorMessage }, 500);
        }
    });
}
