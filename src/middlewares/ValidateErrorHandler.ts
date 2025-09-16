import { Middleware, KoaMiddlewareInterface } from "routing-controllers";
import { GenericResponse } from "../validation/shared/basic.response.types";
import { Context } from "koa";

@Middleware({ type: "before" })
export class ValidationErrorHandler implements KoaMiddlewareInterface {
    async use(ctx: Context, next: () => Promise<any>) {
        try {
            await next();
        } catch (error: any) {
            if (Array.isArray(error?.errors)) {
                // Felder und deren Fehlermeldungen extrahieren
                const fields = error.errors.map((e: any) => ({
                    field: e.property,
                    messages: e.constraints ? Object.values(e.constraints) : []
                }));
                const response: GenericResponse<null> = {
                    status: 400,
                    message: "Validation failed",
                    success: false,
                    error: {
                        code: "VALIDATION_ERROR",
                        fields
                    }
                };
                ctx.status = 400;
                ctx.body = response;
            } else if (error.name === "BadRequestError" && error.errors) {
                const fields = error.errors.map((e: any) => ({
                    field: e.property,
                    messages: e.constraints ? Object.values(e.constraints) : []
                }));
                const response: GenericResponse<null> = {
                    status: 400,
                    message: "Bad request",
                    success: false,
                    error: {
                        code: "BAD_REQUEST",
                        fields
                    }
                };
                ctx.status = 400;
                ctx.body = response;
            } else {
                throw error;
            }
        }
    }
}