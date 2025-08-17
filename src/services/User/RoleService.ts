import { EntityManager } from "@mikro-orm/sqlite";
import { Role, User } from "../../db/entities";

export class RoleService {
   em: EntityManager;

    constructor(em: EntityManager) {
        this.em = em;
    }

    async createRole(user: User, roleName: string): Promise<Role> {
        const role = await em.findOneOrFail(Role, { name: roleName });
        user.roles.add(role);

        await this.em.persistAndFlush(user);
        return role;
    }

    async createDefaultRoles(): Promise<void> {
        const roles = ["admin", "user", "guest"];
        for (const roleName of roles) {
            const existingRole = await this.em.findOne(Role, { name: roleName });
            if (!existingRole) {
                const role = new Role();
                role.name = roleName;
                this.em.persist(role);
            }
        }
        await this.em.flush();
    }

    async getUserRole(user: User): Promise<Role | null> {
        const roles = await this.em.find(Role, { users: user });
        return roles.length > 0 ? roles[0] : null;
    }
}