import { getCurrentUserQueryOptions } from '@/lib/api'
import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated')({
  beforeLoad: async ({ context }) => {
    const queryClient = context.queryClient
    try {
      const data = await queryClient.fetchQuery(getCurrentUserQueryOptions)
      return data
    } catch (e) {
      return { user: null }
    }
  },
  component: RouteComponent,
})

function RouteComponent() {
  const { user } = Route.useRouteContext()
  if (!user) {
    return (
      <div>
        <h2>You have to log in</h2>
        <a href="/api/login">Login</a>
      </div>
    )
  }
  return <Outlet />
}
