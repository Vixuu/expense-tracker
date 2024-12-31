import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/profile')({
  component: Profile,
})

function Profile() {
  const { user } = Route.useRouteContext()
  return (
    <div>
      <h2>User Profile</h2>
      <p>Username: {user?.given_name}</p>
      <p>Email: {user?.email}</p>
      <hr />
      <a href="/api/logout">Logout</a>
    </div>
  )
}
