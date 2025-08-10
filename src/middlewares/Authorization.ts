import { KoaMiddlewareInterface } from "routing-controllers";
import { Session } from "../db/entities/User/session.entity";
import { EntityManager } from "@mikro-orm/sqlite";

export class Authorization implements KoaMiddlewareInterface {
    async use(context: any, next: (err?: any) => Promise<any>) {
        const sessionKey = context.headers["x-Session-UUID"];
        if (!sessionKey || typeof sessionKey !== "string") {
            context.status = 401;
            context.body = { status: 401, message: "Session key missing" };
            return;
        }

        const em: EntityManager = global.em;
        const session = await em.findOne(Session, { uuid: sessionKey });

        if (!session) {
            context.status = 401;
            context.body = { status: 401, message: "Invalid session" };
            return;
        }

        if (session.expiresAt && session.expiresAt < new Date()) {
            context.status = 401;
            context.body = { status: 401, message: "Session expired" };
            return;
        }

        context.state.user = session.user;
        await next();
    }
}