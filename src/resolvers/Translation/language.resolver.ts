import { Resolver, Query } from "type-graphql";
import { EntityManager } from "@mikro-orm/core";
import { Language } from "../../entities/Translation/language.entity";


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
}