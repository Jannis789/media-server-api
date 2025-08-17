import { EntityManager } from "@mikro-orm/sqlite";
import { Translation } from "../../db/entities/Translation/translation.entity";
import { Language } from "../../db/entities";
import { UpdateTranslationBody } from "../../validation/DTO/translation.dto";

export class TranslationService {
    em: EntityManager;
    static cache: Map<string, Array<{ key: string; value: string; updated_at: Date }>> = new Map();

    constructor(em: EntityManager) {
        this.em = em;
    }

    // Lädt alle Translations komplett und baut Cache pro Sprache komplett neu auf
    async cacheAllTranslations(): Promise<void> {
        const translations = await this.em.find(Translation, {}, {
            orderBy: { updated_at: "DESC" },
            populate: ['language']
        });

        console.info(`Caching ${translations.length} translations...`);
        TranslationService.cache.clear();

        for (const translation of translations) {
            const langCode = translation.language.code;
            const entry = {
                key: translation.key,
                value: translation.value,
                updated_at: translation.updated_at,
            };

            if (!TranslationService.cache.has(langCode)) {
                TranslationService.cache.set(langCode, []);
            }

            TranslationService.cache.get(langCode)!.push(entry);
        }

        console.info("Languages cached:", Array.from(TranslationService.cache.keys()));
    }


    getNewestChanges(language: string, since?: Date): Array<{ [key: string]: string }> {
        const arr = TranslationService.cache.get(language) || [];
        const result = [];

        if (!since) {
            return arr.map(entry => ({ key: entry.key, value: entry.value }));
        }
        
        for (const entry of arr) {
            if (entry.updated_at > since) {
                result.push({ [entry.key]: entry.value });
            } else {
                break;
            }
        }
        return result;
    }

    async updateCacheSince(since: Date) {
        const newTranslations = await this.em.find(Translation, { updated_at: { $gt: since } }, {
            populate: ['language']
        });

        for (const t of newTranslations) {
            const lang = t.language.code;
            const arr = TranslationService.cache.get(lang) || [];
            const entry = { key: t.key, value: t.value, updated_at: t.updated_at };

            const idx = arr.findIndex(e => e.key === entry.key);
            if (idx !== -1) arr[idx] = entry;
            else arr.unshift(entry);

            TranslationService.cache.set(lang, arr);
        }

    }

    async createTranslation(key: string, value: string, language: Language): Promise<Translation | null> {
        const existing = await this.em.findOne(Translation, { key, language });
        if (existing) {
            return null;
        }
        const translation = this.em.create(Translation, {
            key,
            value,
            language,
        } as Translation);
        await this.em.persistAndFlush(translation);
        this.updateCacheSince(new Date());
        return translation;
    }

    async updateTranslation(translation: Translation, entity: UpdateTranslationBody): Promise<Translation | null> {
        if (entity.value) 
            translation.value = entity.value;        

        if (entity.key) 
            translation.key = entity.key;

        if (entity.language) 
            translation.language = entity.language;

        if (entity.description) 
            translation.description = entity.description;
        
        await this.em.persistAndFlush(translation);
        this.updateCacheSince(new Date());
        return translation;
    }

    async deleteTranslation(translation: Translation) {
        await this.em.removeAndFlush(translation);
        this.updateCacheSince(new Date());
    }
}
