
import type Elysia from "elysia";
import resolveUserRoutes from "./routes/User/user.route";

export default async function resolveRoutes(app: Elysia) {
    await resolveUserRoutes(app, "/User/graphql");
}