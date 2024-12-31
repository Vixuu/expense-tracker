import { z } from "zod"

export const expenseSchema = z.object({
  id: z.number().int().positive(),
  title: z
    .string()
    .min(3, { message: 'Title must be at least 3 characters' })
    .max(100, { message: 'Title must be at most 100 characters' }),
  amount: z.number().positive(),
  date: z.string(),
})

export const createExpenseSchema = expenseSchema.omit({ id: true })