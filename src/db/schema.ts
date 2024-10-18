import { integer, pgTable, varchar } from "drizzle-orm/pg-core";

export const accounts = pgTable("accounts", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  userId: varchar({ length: 255 }).notNull(),
});