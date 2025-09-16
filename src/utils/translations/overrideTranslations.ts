import { EntityManager } from "@mikro-orm/sqlite";
import { Language, Translation } from "../../db/entities";
import { TranslationService } from "../../services/Translation/TranslationService";
import { LanguageService } from "../../services/Translation/LanguageService";
import { languageKeys } from "./_translations";
import { availableLanguages } from "./_languages";

async function overrideTranslations() {
    const entityManager: EntityManager = em;
    const translationService = new TranslationService(entityManager);
    const languageService = new LanguageService(entityManager);

    for (const [key, keypair] of Object.entries(languageKeys)) {
        for (const [languageCode, text] of Object.entries(keypair)) {
            let language = await entityManager.findOne(Language, { code: languageCode });
            if (!language) {
                console.log(`Creating new language ${languageCode} with name "${availableLanguages[languageCode] || languageCode}"`);
                language = await languageService.createLanguage(languageCode, availableLanguages[languageCode] || languageCode);
                if (!language) 
                    continue;
            } else if (language.name !== (availableLanguages[languageCode] || languageCode)) {
                console.log(`Language ${languageCode} already exists with name "${language.name}", updating to "${availableLanguages[languageCode] || languageCode}"`);
                language = await languageService.updateLanguage(languageCode, availableLanguages[languageCode] || languageCode);
                if (!language)
                    continue;
            } else {
                console.log(`Language ${languageCode} already exists with same name "${language.name}", skipping update`);
            }

            let translation = await entityManager.findOne(Translation, { key, language: language.id });
            if (!translation) {
                console.log(`Creating new translation for key "${key}" in language "${language.code}" with text "${text}"`);
                await translationService.createTranslation(key, text, language);
            } else if (translation.value !== text) {
                console.log(`Updating translation for key "${key}" in language "${language.code}" from "${translation.value}" to "${text}"`);
                await translationService.updateTranslation(translation, {value: text});
            } else {
                console.log(`Translation for key "${key}" in language "${language.code}" already exists with same text "${text}", skipping update`);
            }
        }
    }
}

export { overrideTranslations };