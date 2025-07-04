import { type QueryClient } from '@tanstack/react-query'
import { createRootRouteWithContext, Link, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'

interface RouterContext {
  queryClient: QueryClient
}

export const Route = createRootRouteWithContext<RouterContext>()({
  component: Root,
})

function Root() {
  return (
    <>
      <div className="p-2 flex gap-2">
        <Link to="/" className="[&.active]:font-bold">
          Home
        </Link>{' '}
        <Link to="/about" className="[&.active]:font-bold">
          About
        </Link>
        <Link to="/expenses" className="[&.active]:font-bold">
          Expenses
        </Link>
        <Link to="/create-expense" className="[&.active]:font-bold">
          Create Expense
        </Link>
        <Link to="/profile" className="[&.active]:font-bold">
          Profile
        </Link>
      </div>
      <hr />
      <Outlet />
      <TanStackRouterDevtools />
    </>
  )
}