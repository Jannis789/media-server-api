import { pgTable, serial, varchar, timestamp, boolean, integer, text } from "drizzle-orm/pg-core";
import { users } from "./user.schema";

// UserSessions table
export const userSessions = pgTable("user_sessions", {
    id: serial("id").primaryKey(),
    userId: integer("user_id").notNull().references(() => users.id),
    sessionToken: varchar("session_token", { length: 255 }).notNull().unique(),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(),
    isRevoked: boolean("is_revoked").default(false).notNull(),
});

// Permissions table
export const permissions = pgTable("permissions", {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 50 }).notNull().unique(),
    description: text("description"),
});