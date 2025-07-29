import type Elysia from "elysia";
import resolveUserRoutes from "./routes/User/user.route";
import { createLoginMiddleware } from "./middleware/login";
export enum MiddlewareRoutes {
    login = "/login",
    logout = "/logout"
}

export default async function resolveRoutes(app: Elysia) {
    await createLoginMiddleware(app, {login: MiddlewareRoutes.login, logout: MiddlewareRoutes.logout});

    app.post("/login", () => {});
    app.post("/logout", () => {});

    await resolveUserRoutes(app, "/User/graphql");
}