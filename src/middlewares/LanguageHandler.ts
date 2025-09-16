import { Context } from "koa";
import { parseAcceptLanguage } from "../utils/translations/_backendTranslations";
import { availableLanguages } from "../utils/translations/_languages";
import { Middleware } from "routing-controllers";
import { requestContext } from "../utils/RequestContext";

@Middleware({ type: "before" })
export class LanguageHandlerMiddleware {
    async use(ctx: Context, next: () => Promise<any>) {
        const header = ctx.headers["accept-language"];
        const languageArray = parseAcceptLanguage(header || "en");
        const language =
            languageArray.find(l => Object.keys(availableLanguages).includes(l.lang))?.lang ?? "en";
        ctx.state.language = language;

        // Sprache im AsyncLocalStorage für diesen Request speichern
        return requestContext.run({ language }, async () => {
            await next();
        });
    }
}