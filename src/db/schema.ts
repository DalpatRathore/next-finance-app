import { uuid, pgTable, varchar, timestamp, integer } from "drizzle-orm/pg-core";
import {createInsertSchema} from "drizzle-zod";
import { relations } from 'drizzle-orm';
import { z } from "zod";

export const accounts = pgTable("accounts", {
  id: uuid().primaryKey().defaultRandom(), 
  name: varchar({ length: 255 }).notNull(),
  userId: varchar({ length: 255 }).notNull(),
});

export const accountsRelations = relations(accounts,({many})=>({
  transactions:many(transactions)
}
));



export const insertAccountSchema = createInsertSchema(accounts)

export const categories = pgTable("categories", {
  id: uuid().primaryKey().defaultRandom(), 
  name: varchar({ length: 255 }).notNull(),
  userId: varchar({ length: 255 }).notNull(),
});

export const categoriesRelations = relations(categories,({many})=>({
  transactions:many(transactions)
}
));
export const insertCategorySchema = createInsertSchema(categories)

export const transactions = pgTable("transactions", {
  id: uuid().primaryKey().defaultRandom(), 
  amount: integer().notNull(),
  payee: varchar({ length: 255 }).notNull(),
  notes: varchar({ length: 255 }),
  date: timestamp({ mode: 'string' }).notNull(),
  accountId: uuid('account_id').references(() => accounts.id,{ onDelete:"cascade"}).notNull(),
  categoryId: uuid('category_id').references(() => categories.id,{ onDelete:"set null"}),

});

export const transactionsRelations = relations(transactions,({one})=>({
  account:one(accounts,{
    fields:[transactions.accountId],
    references:[accounts.id]
  }),
  categories:one(categories,{
    fields:[transactions.categoryId],
    references:[categories.id]
  })
}
));

export const insertTranactionSchema = createInsertSchema(transactions,{date:z.coerce.date()})