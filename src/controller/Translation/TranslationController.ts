import { Body, Controller, Post } from "routing-controllers";
import { TranslationService } from "../../services/Translation/TranslationService";
import { LanguageService } from "../../services/Translation/LanguageService";
import { LanguageCodeParam, SinceDto } from "../../validation/DTO/translation.dto";
import { ValidParam } from "../../validation/decorators/ValidParam";
import { GetTranslationsResponse } from "../../validation/shared/translation.responses";

@Controller("/Translation")
export class TranslationController {
    private translationService: TranslationService = new TranslationService(em);
    private languageService: LanguageService = new LanguageService(em);

    @Post("/:language_code")
    async getTranslations(
        @ValidParam(LanguageCodeParam, "language_code") language_code: string, 
        @Body() body: SinceDto
    ): Promise<GetTranslationsResponse> {
        const language = await this.languageService.getLanguage({code: language_code});
        const translations = this.translationService.getNewestChanges(language!.code, body.since);

        return {
            status: 200,
            success: true,
            message: "Translations fetched successfully",
            data: translations,
        };
    }
}