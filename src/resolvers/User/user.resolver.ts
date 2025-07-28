import { Resolver, Mutation, Arg, Query } from "type-graphql";
import { EntityManager } from "@mikro-orm/core";
import { User } from "../../entities/User/user.schema";

@Resolver(() => User)
export class UserResolver {
    private em: EntityManager;
    constructor(em: EntityManager) {
        this.em = em;
    }

    @Query(() => [User])
    async users() {
        return this.em.find(User, {});
    }

    @Mutation(() => User)
    async createUser(
        @Arg("username") username: string,
        @Arg("email") email: string,
        @Arg("password") password: string
    ) {
        const { pbkdf2Sync, randomBytes } = await import("crypto");
        const salt = randomBytes(16).toString("hex");
        const hash = pbkdf2Sync(password, salt, 10000, 64, "sha512").toString("hex");
        const user = new User();
        user.username = username;
        user.email = email;
        user.password_hash = `${salt}:${hash}`;
        await this.em.persistAndFlush(user);
        return user;
    }
}
