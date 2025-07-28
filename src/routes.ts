import type Elysia from "elysia";
import { userHandler } from "./routes/User/user.route";

function resolveRoutes(app: Elysia) {
    app.get("/User/graphql", userHandler);
}

export default resolveRoutes;