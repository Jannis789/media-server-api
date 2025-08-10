import { Middleware, KoaMiddlewareInterface } from "routing-controllers";

@Middleware({ type: "before" })
export class ValidationErrorHandler implements KoaMiddlewareInterface {
    async use(ctx: any, next: () => Promise<any>) {
        try {
            await next();
        } catch (error: any) {
            // Prüfe, ob class-validator Fehler-Array vorhanden ist
            if (Array.isArray(error?.errors)) {
                // Sammle ALLE Fehlermeldungen aus allen Properties
                const messages = error.errors.flatMap((e: any) =>
                    e.constraints ? Object.values(e.constraints) : []
                );
                ctx.status = 400;
                ctx.body = { status: ctx.status, messages };
            } else if (error.name === "BadRequestError" && error.errors) {
                // Fallback für BadRequestError mit Fehler-Array
                const messages = error.errors.flatMap((e: any) =>
                    e.constraints ? Object.values(e.constraints) : []
                );
                ctx.status = 400;
                ctx.body = { status: ctx.status, messages };
            } else {
                throw error;
            }
        }
    }
}