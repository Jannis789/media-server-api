import type { Elysia } from 'elysia';
import { CookieReader } from '../utils/CookieReader.ts';
import em from '../utils/EntityManager.ts';
import UserResolver from '../resolvers/User/user.resolver';
import SessionResolver from '../resolvers/User/session.resolver';
import type { MiddlewareRoutes } from '../routes/routes.ts';
import { guest_only } from './permissions.ts';

// @todo -> wenn beim Login Tokens mitgegeben werden, Token refreshen
// @todo -> nicht mit $presist speichern, sondern klassisch als Cookie setzen

// Registriert die Middleware direkt auf das übergebene app
export async function createLoginMiddleware(
    app: Elysia,
    loginRoutes: typeof MiddlewareRoutes,
) {
    const userResolver = new UserResolver(em.get());
    const sessionResolver = new SessionResolver(em.get());

    app.onBeforeHandle(async (ctx) => {
        // Gast-Routen komplett ignorieren, z.B. /login
        // Prüfen, ob die aktuelle Route eine Gast-Route ist
        if (Object.values(guest_only).includes(ctx.route)) {
            return;
        }

        // Authorization-Logic for all other routes
        const sharedCookie = ctx.request.headers.get('cookie');
        const cookieReader = new CookieReader(sharedCookie);
        const sessionId = cookieReader.get('session_id');

        if (!sessionId) {
            return new Response('Unauthorized', { status: 401 });
        }

        const session = await sessionResolver.findSessionByUUID(sessionId);

        if (!session) {
            return new Response('Unauthorized', { status: 401 });
        }

        if (session.expiresAt && session.expiresAt <= new Date()) {
            const expiredAt = session.expiresAt.toISOString();
            return new Response(
                `Unauthorized, Session is expired on ${expiredAt}`,
                { status: 401 },
            );
        }

        // Every following request has access to the User Entity
        (ctx as typeof ctx & { user: typeof session.user }).user = session.user;
    });

    // GraphQL-Login-Proxy: POST /login akzeptiert nur Login-Mutation
    app.post(loginRoutes.login, async (ctx) => {
        try {
            const { variables } = await ctx.request.json();

            // Dynamisch UserResolver importieren
            const sessionToken = await userResolver.login(
                variables.email,
                variables.password,
            );

            if (!sessionToken) {
                return new Response(
                    JSON.stringify({
                        errors: [{ message: 'Login fehlgeschlagen.' }],
                    }),
                    {
                        status: 401,
                        headers: { 'Content-Type': 'application/json' },
                    },
                );
            }
            // Session-Cookie setzen
            return new Response(
                JSON.stringify({ data: { login: sessionToken } }),
                {
                    status: 200,
                    headers: {
                        'Set-Cookie': `session_id=${sessionToken}; HttpOnly; Path=/`,
                        'Content-Type': 'application/json',
                    },
                },
            );
        } catch (e) {
            return new Response(
                JSON.stringify({ errors: [{ message: 'Malformed request' }] }),
                {
                    status: 400,
                    headers: { 'Content-Type': 'application/json' },
                },
            );
        }
    });
}
