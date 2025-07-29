
import { Session } from "../entities/User/session.entity";
import { orm } from "../index";
import type { Elysia } from "elysia";
import { MiddlewareRoutes } from "../routes";
import { guest_only } from "./permissions";


// Cookie-Parser minimal
function getCookie(req: Request, name: string): string | undefined {
  const cookie = req.headers.get("cookie");
  if (!cookie) return undefined;
  const match = cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return match && typeof match[1] === "string"
    ? decodeURIComponent(match[1])
    : undefined;
}

// Registriert die Middleware direkt auf das übergebene app
export async function createLoginMiddleware(app: Elysia, loginRoutes: typeof MiddlewareRoutes) {
  app.onBeforeHandle(async (ctx) => {
    // Gast-Routen komplett ignorieren (keine Auth-Logik, keine 401)
    if (Object.values(guest_only).includes(ctx.route as guest_only)) {
      return;
    }

    // Authentifizierungslogik für alle anderen Routen
    const em = orm.em.fork();
    const sessionId = getCookie(ctx.request, "session_id");
    let sessionValid = false;
    if (sessionId) {
      const session = await em.findOne(
        Session,
        { uuid: sessionId },
        { populate: ["user"] }
      );
      if (session && (!session.expiresAt || session.expiresAt > new Date())) {
        // @ts-expect-error: dynamisch user an Context
        ctx.user = session.user;
        sessionValid = true;
      }
    }
    if (!sessionValid) {
      return new Response("Unauthorized", { status: 401 });
    }
  });

  // GraphQL-Login-Proxy: POST /login akzeptiert nur Login-Mutation
  app.post("/login", async (ctx) => {
    try {
      const { query, variables } = await ctx.request.json();
      // Nur Login-Mutation erlauben
      if (!query || !/mutation\s+Login/.test(query)) {
        return new Response("Only Login mutation allowed", { status: 400 });
      }
      // Dynamisch UserResolver importieren
      const { UserResolver } = await import("../resolvers/User/user.resolver");
      const resolver = new UserResolver(orm.em.fork());
      const sessionToken = await resolver.login(variables.email, variables.password);
      console.log(sessionToken);
      if (!sessionToken) {
        return new Response(JSON.stringify({ errors: [{ message: "Login fehlgeschlagen." }] }), {
          status: 401,
          headers: { "Content-Type": "application/json" },
        });
      }
      // Session-Cookie setzen
      return new Response(
        JSON.stringify({ data: { login: sessionToken } }),
        {
          status: 200,
          headers: {
            "Set-Cookie": `session_id=${sessionToken}; HttpOnly; Path=/` ,
            "Content-Type": "application/json"
          },
        }
      );
    } catch (e) {
      return new Response(JSON.stringify({ errors: [{ message: "Malformed request" }] }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }
  });
}