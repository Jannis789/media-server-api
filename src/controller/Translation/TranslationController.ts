import { EntityManager } from "@mikro-orm/sqlite";
import { Body, Controller, Get, Param, Post } from "routing-controllers";
import { TranslationService } from "../../services/Translation/TranslationService";
import { LanguageService } from "../../services/Translation/LanguageService";
import { SinceDto } from "../../validation/DTO/translation.dto";

@Controller("/Translation")
export class TranslationController {
    private em: EntityManager = em
    private translationService: TranslationService = new TranslationService(em);
    private languageService: LanguageService = new LanguageService(em);



    @Post("/:language_code")
    async getTranslations(@Param("language_code") language_code: string, @Body() body: SinceDto) {
        const language = await this.languageService.getLanguage({code: language_code});
        const translations = await this.translationService.getNewestChanges(language!.code, body.since);

        return {
            status: 200,
            message: "Translations retrieved successfully",
            data: translations,
        };
    }
}