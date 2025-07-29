import { Resolver, Query, Mutation, Arg } from "type-graphql";
import { EntityManager } from "@mikro-orm/core";
import { Session } from "../../entities/User/session.entity";

@Resolver(() => Session)
export class SessionResolver {
  private em: EntityManager;
  constructor(em: EntityManager) {
    this.em = em;
  }

  @Query(() => [Session])
  async sessions(): Promise<Session[]> {
    return this.em.find(Session, {});
  }

  @Query(() => Session, { nullable: true })
  async sessionById(@Arg("sessionId") sessionId: string): Promise<Session | null> {
    return this.em.findOne(Session, { uuid: sessionId }, { populate: ['user'] });
  }

  @Mutation(() => Boolean)
  async deleteSession(@Arg("uuid") uuid: string): Promise<boolean> {
    const session = await this.em.findOne(Session, { uuid });
    if (!session) return false;
    await this.em.removeAndFlush(session);
    return true;
  }
}
