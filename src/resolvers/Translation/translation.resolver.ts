import { Resolver, Query, Mutation, Arg } from "type-graphql";
import { EntityManager, type FilterQuery } from "@mikro-orm/core";
import { Translation } from "../../entities/Translation/translation.entity.ts";
import { LanguageResolver } from "./language.resolver.ts";

@Resolver(() => Translation)
export class TranslationResolver {
    private languageResolver: LanguageResolver;
    private em: EntityManager;
    constructor(em: EntityManager) {
        this.em = em;
        this.languageResolver = new LanguageResolver(em);
    }

    @Query(() => [Translation])
    async translations(): Promise<Translation[]> {
        return this.em.find(Translation, {});
    }
  

    @Mutation(() => String)
    async getNewLanguageTranslation(
        @Arg("languageCode") languageCode: string,
        @Arg("dateFrom", { nullable: true }) dateFrom?: Date
    ): Promise<string> {
        const language = await this.languageResolver.getLanguageByIsoCode(languageCode);
        if (!language) {
            throw new Error(`Language with code ${languageCode} not found`);
        }

        const where: FilterQuery<Translation> = { language: language.id };

        if (dateFrom) {
            where.updated_at = { $gt: dateFrom };
        }

        const translations = await this.em.find(Translation, where);
        return translations.length.toString();
    }

}
