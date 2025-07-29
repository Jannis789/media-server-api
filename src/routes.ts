import type Elysia from "elysia";
import resolveUserRoutes from "./routes/User/user.route.ts";
import { createLoginMiddleware } from "./middleware/login.ts";
export enum MiddlewareRoutes {
    login = "/login",
    logout = "/logout"
}

export default async function resolveRoutes(app: Elysia) {
    await createLoginMiddleware(app, {login: MiddlewareRoutes.login, logout: MiddlewareRoutes.logout});

    // Dummy-Handler, der nichts zurückgibt, damit Middleware greift
    app.post(MiddlewareRoutes.login, () => undefined);
    app.post(MiddlewareRoutes.logout, () => undefined);

    await resolveUserRoutes(app, "/User/graphql");
}