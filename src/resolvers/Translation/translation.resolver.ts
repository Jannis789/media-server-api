import { Resolver, Query, Mutation } from "type-graphql";
import { EntityManager } from "@mikro-orm/core";
import { Translation } from "../../entities/Translation/translation.entity";
import { LanguageResolver } from "./language.resolver";

export interface TranslationDataObject {
    [key: Translation["key"]]: {
        [key: Translation["language"]["iso_code"]]: Translation["text"];
    };
}

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
    async getTranslationDataObject(): Promise<string> {
        const object: { [key: string]: { [lang: string]: string } } = {};
        const languages = await this.languageResolver.languages();
        for (const language of languages) {
            const translations = await this.em.find(Translation, { language });
            for (const translation of translations as Translation[]) {
                if (!object[translation.key]) {
                  object[translation.key] = {};
                }
                object[translation.key]![language.iso_code] = translation.text;
            }
        }
        return JSON.stringify(object);
    }
}
