import { EntityManager } from "@mikro-orm/sqlite";
import { Language } from "../../db/entities";
import { GetLanguageBody } from "../../validation/DTO/language.dto";
import { Body } from "routing-controllers";

export class LanguageService {
   em: EntityManager;

    constructor(em: EntityManager) {
        this.em = em;
    }

    async createLanguage(code: string, name: string, nativeName?: string): Promise<Language | null> {
        const existingLanguage = await this.em.findOne(Language, { code });
        if (existingLanguage) {
            return null;
        }

        const language = this.em.create(Language, { code, name, nativeName });
        await this.em.persistAndFlush(language);
        return language;
    }

    async updateLanguage(code: string, name: string, nativeName?: string): Promise<Language | null> {
        const language = await this.em.findOne(Language, { code });
        if (!language) {
            return null;
        }

        language.name = name;
        language.nativeName = nativeName;

        await this.em.persistAndFlush(language);
        return language;
    }

    async getLanguage(@Body() body: GetLanguageBody): Promise<Language | null> {
        return this.em.findOne(Language, body);
    }
}
