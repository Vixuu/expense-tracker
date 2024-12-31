import { Hono } from "hono"
import { zValidator } from "@hono/zod-validator"
import { getUser } from "../kinde"

import { db } from '../db/turso'
import { expenseTable } from "../db/schema"
import { eq, sql } from "drizzle-orm"
import { createExpenseSchema } from "../zodTypes"


export const expensesRoutes = new Hono()
  //GET /api/expenses for current logged in user
  .get('/', getUser, async (c) => {
    const userId = c.get('user').id

    const expenses = await db.query.expenseTable.findMany({
      where: eq(expenseTable.userId, userId)
    })

    return c.json({ expenses })
  })
  //POST /api/expenses to create a new expense
  .post('/', getUser, zValidator("json", createExpenseSchema), async (c) => {
    const expense = c.req.valid('json')

    const newExpense = {
      title: expense.title,
      amount: expense.amount.toString(),
      date: expense.date,
      createdAt: new Date().toISOString(),
      userId: c.get('user').id,
    }

    const result = await db.insert(expenseTable).values(newExpense).returning()

    if (!result[0].id) {
      return c.json({ message: 'Failed to create expense' }, 500)
    }
    c.status(201)
    return c.json(result[0])
  })
  //DELETE /api/expenses/:id to delete an expense
  .delete('/:id', getUser, async (c) => {
    const id = Number(c.req.param('id'))

    await db.delete(expenseTable).where(sql`id = ${id}`)

    return c.json({ message: 'Expense deleted' })
  })
  //GET /api/expenses/total to get the total amount of expenses
  .get('/total', getUser, async (c) => {
    const total = await db.select({ sum: sql`SUM(amount)` }).from(expenseTable).then(result => result[0].sum ?? 0)
    return c.json({ total } as { total: number })
  })