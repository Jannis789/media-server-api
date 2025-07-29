import { Resolver, Mutation, Arg, Query } from "type-graphql";
import { EntityManager } from "@mikro-orm/core";
import { User } from "../../entities/User/user.entity";
import PasswordOptions from "../../utils/PasswordOptions";
import { Session } from "../../entities/User/session.entity";
import { pbkdf2Sync, randomUUID } from "crypto";

@Resolver(() => User)
export class UserResolver {
    private em: EntityManager;
    constructor(em: EntityManager) {
        this.em = em;
    }

    @Query(() => [User])
    async users() {
        try {
            const result = await this.em.find(User, {});
            return result;
        } catch (e) {
            console.info("Es konnte kein Benutzer gefunden werden:", e);
            return [];
        }
    }

    @Mutation(() => User)
    async createUser(
        @Arg("username") username: string,
        @Arg("email") email: string,
        @Arg("password") password: string
    ) {
        const { pbkdf2Sync, randomBytes } = await import("crypto");
        const salt = randomBytes(PasswordOptions.SALT_LENGTH).toString("hex");
        const hash = pbkdf2Sync(password, salt, PasswordOptions.ITERATIONS, PasswordOptions.HASH_LENGTH, PasswordOptions.DIGEST).toString("hex");
        const user = new User();
        user.username = username;
        user.email = email;
        user.password_hash = `${salt}:${hash}`;
        await this.em.persistAndFlush(user);
        return user;
    }

    @Mutation(() => String, { nullable: true, description: "Login with email and password. Returns session token (uuid) or null on failure." })
    async login(
        @Arg("email") email: string,
        @Arg("password") password: string
    ): Promise<string | null> {
        const user = await this.em.findOne(User, { email });
        if (!user) return null;
        const [salt, hash] = user.password_hash.split(":");
        if (!salt || !hash || typeof password !== "string") return null;
        const inputHash = pbkdf2Sync(
            password,
            salt,
            PasswordOptions.ITERATIONS,
            PasswordOptions.HASH_LENGTH,
            PasswordOptions.DIGEST
        ).toString("hex");
        if (inputHash !== hash) return null;
        // Session anlegen
        const session = new Session();
        session.uuid = randomUUID();
        session.user = user;
        await this.em.persistAndFlush(session);
        return session.uuid;
    }
}
