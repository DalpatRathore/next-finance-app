import { uuid, pgTable, varchar } from "drizzle-orm/pg-core";
import {createInsertSchema} from "drizzle-zod";

export const accounts = pgTable("accounts", {
  // id: integer().primaryKey().generatedAlwaysAsIdentity(),
  id: uuid().primaryKey().defaultRandom(), 
  name: varchar({ length: 255 }).notNull(),
  userId: varchar({ length: 255 }).notNull(),
});

export const insertAccountSchema = createInsertSchema(accounts)