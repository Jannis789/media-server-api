import translations from '../assets/translations.json';
import Alpine from 'alpinejs';

interface TranslationsJson {
    metadata: {
        version: string;
        lastUpdated: string;
    };
    currentLanguage: string;
    translations: {
        [key: string]: {
            [lang: string]: string;
        };
    };
}

type CurrentLanguages = keyof TranslationsJson['translations'];

function initializeTranslations() {
    Alpine.store('currentLanguage', translations.currentLanguage);
    Alpine.store('translations', translations.translations);
    Alpine.magic('translate', () => (key: CurrentLanguages): string => {
        return translate(key as string);
    });
    Alpine.magic('t', () => (key: CurrentLanguages): string => {
        return translate(key as string);
    });
}

function translate(key: string): string {
    const currentLanguage = Alpine.store('currentLanguage') as CurrentLanguages;
    const translationsStore = Alpine.store('translations') as TranslationsJson['translations'];
    const translation = translationsStore[key];
    if (translation && translation[currentLanguage]) {
        return translation[currentLanguage];
    }
    throw new Error(`Translation for key "${key}" not found in language "${currentLanguage}, please add the Translation to translations.json"`);
}

export { initializeTranslations, translate };