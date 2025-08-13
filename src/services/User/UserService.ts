import { EntityManager } from "@mikro-orm/core";
import { User } from "../../db/entities";
import { encryptPassword, verifyPassword } from "../../utils/LoginUtils";
import { UpdateUserBody } from "../../validation/DTO/user.dto";
import { SessionService } from "./SessionService";
import { DateUtility } from "../../utils/DateUtility";
import { Session } from "../../db/entities/User/session.entity";

export class UserService {
    private em: EntityManager;

    private sessionService: SessionService = new SessionService(em);

    constructor(em: EntityManager) {
        this.em = em;
    }

    async findById(id: number): Promise<User | null> {
        return this.em.findOne(User, { id });
    }

    async findByEmail(email: string): Promise<User | null> {
        return this.em.findOne(User, { email });
    }

    async findByUsername(username: string): Promise<User | null> {
        return this.em.findOne(User, { username });
    }

    async createUser(username: string, email: string, password: string): Promise<User> {
        const password_hash = await encryptPassword(password)
        const user = this.em.create(User, {
            username: username,
            email: email,
            password_hash: password_hash,
        } as User);
        await this.em.persistAndFlush(user);
        return user;
    }

    async updateUser(id: number, data: UpdateUserBody): Promise<User | null> {
        const user = await this.findById(id);
        if (!user) return null;
        
        if (data.username) 
            user.username = data.username;
        
        if (data.email) 
            user.email = data.email;
        
        if (data.password) 
            user.password_hash = await encryptPassword(data.password);
        
        await this.em.persistAndFlush(user);
        return user;
    }
    
    async login(email: string, password: string, remember?: boolean): Promise<Session | null> {
        const user = await this.findByEmail(email);
        if (!user) return null;

        const isValid = await verifyPassword(password, user.password_hash);
        if (!isValid) return null;

        const sessionDuration = remember
            ? new DateUtility().addDays(30)
            : new DateUtility().addHours(1);

        let session = await this.sessionService.findSessionByUserId(user.id);
        if (!session) {
            session = await this.sessionService.createSession(user, sessionDuration);
        } else {
            await this.sessionService.setExpiration(session, sessionDuration);
        }
        return session;
    }

    async isEmailUnique(email: string): Promise<boolean> {
        const user = await this.findByEmail(email);
        return !user;
    }
    
    async isUsernameUnique(username: string): Promise<boolean> {
        const user = await this.findByUsername(username);
        return !user;
    }
}