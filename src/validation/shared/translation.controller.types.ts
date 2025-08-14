// POST -> /Translation/:language_code
interface GetTranslationsResponse {
    status: number;
    message: string;
    data?: {
        key: string;
        value: string;
    }[];
}

enum TranslationPath {
    GetTranslations = "/Translation/:language_code",
}

export { GetTranslationsResponse, TranslationPath };