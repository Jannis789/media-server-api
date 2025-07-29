import { Session } from "../entities/User/session.entity";
import { User } from "../entities/User/user.entity";
import { orm } from "../index";
import { pbkdf2Sync, randomUUID } from "crypto";
import PasswordOptions from "../utils/passwordOptions";
import type { Elysia } from "elysia";
import { MiddlewareRoutes } from "../routes";


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
    console.log("Login-Middleware wird aufgerufen");
    const em = orm.em.fork();

    // 1. Session prüfen
    const sessionId = getCookie(ctx.request, "session_id");
    if (sessionId) {
      const session = await em.findOne(
        Session,
        { uuid: sessionId }, // <-- uuid statt id
        { populate: ["user"] }
      );
      if (session && (!session.expiresAt || session.expiresAt > new Date())) {
        // @ts-expect-error: dynamisch user an Context
        ctx.user = session.user;
      }
    }


    // 2. Login-Request abfangen
    if (ctx.request.method === "POST" && ctx.route === loginRoutes.login) {
      const { email, password } = await ctx.request.json();
      const user = await em.findOne(User, { email }); // Suche per Email!
      if (!user) {
        return new Response("Unauthorized", { status: 401 });
      }
      const [salt, hash] = user.password_hash.split(":");
      if (!salt || !hash || typeof password !== "string") {
        return new Response("Unauthorized", { status: 401 });
      }
      const inputHash = pbkdf2Sync(
        password,
        salt,
        PasswordOptions.ITERATIONS,
        PasswordOptions.HASH_LENGTH,
        PasswordOptions.DIGEST
      ).toString("hex");
      if (inputHash !== hash) {
        return new Response("Unauthorized", { status: 401 });
      }
      // Session anlegen
      const session = new Session();
      session.uuid = randomUUID(); // <-- uuid statt id
      session.user = user;
      await em.persistAndFlush(session);
      return new Response(
        JSON.stringify({ sessionId: session.uuid }),
        {
          status: 200,
          headers: {
            "Set-Cookie": `session_id=${session.uuid}; HttpOnly; Path=/`,
            "Content-Type": "application/json"
          },
        }
      );
    }

    // 3. Logout-Request abfangen
    if (ctx.request.method === "POST" && ctx.route === loginRoutes.logout) {
      if (sessionId) {
        const session = await em.findOne(Session, { uuid: sessionId }); // <-- uuid statt id
        if (session) {
          await em.removeAndFlush(session);
        }
      }
      return new Response("OK", {
        status: 200,
        headers: {
          "Set-Cookie": "session_id=; HttpOnly; Path=/; Max-Age=0",
        },
      });
    }
  });
}