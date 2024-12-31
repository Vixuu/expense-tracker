import { sql } from "drizzle-orm";
import { index, int, numeric, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const expenseTable = sqliteTable("expense_table", {
  id: int().primaryKey({ autoIncrement: true }),
  userId: text().notNull(),
  title: text().notNull(),
  amount: numeric().notNull(),
  date: text().notNull(),
  createdAt: text().notNull(),
}, (table) => {
  return [
    index('userIdIndex').on(table.userId)
  ]
}); 