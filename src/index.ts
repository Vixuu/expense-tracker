import { Hono } from 'hono'
import { logger } from 'hono/logger'
import { expensesRoutes } from './routes/expenses'
import { serveStatic } from 'hono/bun'
import { authRoutes } from './routes/auth'

const app = new Hono()

app.use("*", logger())

const apiRoutes = app.basePath("/api").route("/expenses", expensesRoutes).route("/", authRoutes)

app.get("*", serveStatic({ root: "./client/dist" }))
app.get("*", serveStatic({ path: "./client/dist/index.html" }))

export default app
export type ApiRoutes = typeof apiRoutes