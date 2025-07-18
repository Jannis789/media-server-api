import { pgTable, integer, primaryKey } from "drizzle-orm/pg-core";
import { users } from "./user.schema";
import { roles } from "./role.schema";
import { permissions } from "./permission.schema";

// Many-to-Many: user_roles
export const userRoles = pgTable("user_roles", {
    userId: integer("user_id").notNull().references(() => users.id),
    roleId: integer("role_id").notNull().references(() => roles.id),
}, (table) => [
    primaryKey({ columns: [table.userId, table.roleId] })
]);

// Many-to-Many: role_permissions
export const rolePermissions = pgTable("role_permissions", {
    roleId: integer("role_id").notNull().references(() => roles.id),
    permissionId: integer("permission_id").notNull().references(() => permissions.id),
}, (table) => [
    primaryKey({ columns: [table.roleId, table.permissionId] })
]);

export { users, roles, permissions };
