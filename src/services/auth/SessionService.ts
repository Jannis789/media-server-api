import { EntityManager } from "@mikro-orm/sqlite";
import { Session, User } from "../../db/entities";
import { DateUtility } from "../../utils/DateUtility";
import { IsString } from "class-validator";
import { UUIDParam } from "../../validation/DTO/helper.dto";

export class SessionService {
    private em: EntityManager;

    constructor(em: EntityManager) {
        this.em = em;
    }

    async createSession(user: User, expirationDuration?: Date): Promise<Session> {
        const session = this.em.create(Session, { 
            user: user,
            expiresAt: expirationDuration ?? new DateUtility().addHours(1),
        });
        await this.em.persistAndFlush(session);
        return session;
    }

    async findSessionByUUID(uuid: string): Promise<Session | null> {
        const session = this.em.findOne(Session, uuid)
        if (!session) {
            return null;
        }
        return session;
    }

    async findSessionByUserId(userId: number): Promise<Session | null> {
        const session = await this.em.findOne(Session, { user: { id: userId } });
        if (!session) {
            return null;
        }
        return session;
    }

    async setExpiration(session: Session, expirationDate: Date): Promise<void> {
        session.expiresAt = expirationDate;
        await this.em.persistAndFlush(session);
    }
}