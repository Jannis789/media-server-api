import { EntityManager } from "@mikro-orm/sqlite";
import { Translation } from "../../db/entities/Translation/translation.entity";
import { Language } from "../../db/entities";
import { UpdateTranslationBody } from "../../validation/DTO/translation.dto";

import { Translations } from "../../validation/shared/translation.responses";

class TranslationCache {
    private static cache: Map<string, Map<string, { value: string | null; updated_at: Date }>> = new Map();

    static clearAll() {
        TranslationCache.cache.clear();
    }

    static setAll(langCode: string, entries: Array<{ key: string; value: string; updated_at: Date }>) {
        const map = new Map<string, { value: string | null; updated_at: Date }>();
        for (const e of entries) {
            map.set(e.key, { value: e.value, updated_at: e.updated_at });
        }
        TranslationCache.cache.set(langCode, map);
    }

    static addOrUpdate(langCode: string, key: string, value: string, updated_at: Date) {
        let map = TranslationCache.cache.get(langCode);
        if (!map) {
            map = new Map();
            TranslationCache.cache.set(langCode, map);
        }
        map.set(key, { value, updated_at });
    }

    static delete(langCode: string, key: string, deleted_at: Date) {
        let map = TranslationCache.cache.get(langCode);
        if (!map) {
            map = new Map();
            TranslationCache.cache.set(langCode, map);
        }
        map.set(key, { value: null, updated_at: deleted_at });
    }

    static getDelta(langCode: string, since?: Date): Translations {
        const map = TranslationCache.cache.get(langCode);
        const result: Translations = {};
        if (!map) return result;
        for (const [key, { value, updated_at }] of map.entries()) {
            if (!since || updated_at > since) {
                result[key] = value;
            }
        }
        return result;
    }
}

export class TranslationService {
    em: EntityManager;
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
        TranslationCache.clearAll();

        // Gruppiere nach Sprache
        const grouped: Record<string, Array<{ key: string; value: string; updated_at: Date }>> = {};
        for (const t of translations) {
            const lang = t.language.code;
            if (!grouped[lang]) grouped[lang] = [];
            grouped[lang].push({ key: t.key, value: t.value, updated_at: t.updated_at });
        }
        for (const lang in grouped) {
            TranslationCache.setAll(lang, grouped[lang]);
        }
        console.info("Languages cached:", Object.keys(grouped));
    }


    getNewestChanges(language: string, since?: Date): { refreshAll: boolean; translations: Translations } {
        const map = (TranslationCache as any).cache.get(language) as Map<string, { value: string | null; updated_at: Date }> | undefined;
        if (!map) return { refreshAll: true, translations: {} as Translations };
        if (!since) return { refreshAll: true, translations: TranslationCache.getDelta(language) };
        // Finde ältesten updated_at
        let oldest: Date | undefined = undefined;
        for (const { updated_at } of map.values()) {
            if (!oldest || updated_at < oldest) oldest = updated_at;
        }
        if (oldest && since < oldest) {
            return { refreshAll: true, translations: TranslationCache.getDelta(language) };
        }
        return { refreshAll: false, translations: TranslationCache.getDelta(language, since) };
    }

    async updateCacheSince(since: Date) {
        const newTranslations = await this.em.find(Translation, { updated_at: { $gt: since } }, {
            populate: ['language']
        });
        for (const t of newTranslations) {
            const lang = t.language.code;
            TranslationCache.addOrUpdate(lang, t.key, t.value, t.updated_at);
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
        TranslationCache.addOrUpdate(language.code, key, value, translation.updated_at);
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
        TranslationCache.addOrUpdate(translation.language.code, translation.key, translation.value, translation.updated_at);
        return translation;
    }

    async deleteTranslation(translation: Translation) {
        const langCode = translation.language.code;
        const key = translation.key;
        const now = new Date();
        await this.em.removeAndFlush(translation);
        TranslationCache.delete(langCode, key, now);
    }
}
