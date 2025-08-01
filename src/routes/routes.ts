import type Elysia from "elysia";
import resolveUserRoutes from "./User/user.route.ts";
import { createLoginMiddleware } from "../middleware/login.ts";
import resolveTranslationRoutes from "./Translation/translation.route.ts";

export const MiddlewareRoutes = {
    login: "/login",
    logout: "/logout"
};

export default async function resolveRoutes(app: Elysia) {
    await createLoginMiddleware(app, MiddlewareRoutes);
    
    await resolveUserRoutes(app, "/User/graphql");
    await resolveTranslationRoutes(app, "/Translation/graphql");
}