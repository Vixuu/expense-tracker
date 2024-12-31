import { type ApiRoutes } from '@server/index'
import { queryOptions } from '@tanstack/react-query'
import { hc } from 'hono/client'

const client = hc<ApiRoutes>("/")

export const api = client.api

async function getCurrentUser() {
  const res = await api.me.$get()
  if (!res.ok) {
    throw new Error('Failed to get current user')
  }
  const data = await res.json()
  return data
}

export const getCurrentUserQueryOptions = queryOptions({
  queryKey: ['get-current-user'],
  queryFn: getCurrentUser,
  staleTime: Infinity,
})

export async function getAllExpenses() {
  const res = await api.expenses.$get()
  if (!res.ok) {
    throw new Error('Failed to get expenses')
  }
  const data = await res.json()
  return data
}

export const getAllExpensesQueryOptions = queryOptions({
  queryKey: ['get-all-expenses'],
  queryFn: getAllExpenses,
  staleTime: 1000 * 60 * 5,
})