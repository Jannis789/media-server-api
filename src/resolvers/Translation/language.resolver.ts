import { Resolver, Query } from "type-graphql";
import { EntityManager } from "@mikro-orm/core";
import { Language } from "../../entities/Translation/language.entity.ts";


@Resolver(() => Language)
export class LanguageResolver {
    private em: EntityManager;
    constructor(em: EntityManager) {
        this.em = em;
    }

    @Query(() => [Language])
    async languages(): Promise<Language[]> {
        return this.em.find(Language, {});
    }

    async getLanguageByIsoCode(isoCode: string): Promise<Language | null> {
        return this.em.findOne(Language, { iso_code: isoCode });
    }
}