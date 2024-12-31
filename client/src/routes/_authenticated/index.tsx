import { api } from '@/lib/api'
import { useQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

export const Route = createFileRoute('/_authenticated/')({
  component: Index,
})

async function getTotalSpent() {
  const res = await api.expenses.total.$get()
  const data = await res.json()
  return data
}

function Index() {
  const { data, isFetching, isPending, error } = useQuery({
    queryKey: ['get-total-spent'],
    queryFn: getTotalSpent,
    staleTime: Infinity,
  })

  if (error) {
    return <div>Error: {error.message}</div>
  }

  return (
    <>
      <Card className="max-w-lg mx-auto space-y-2">
        <CardHeader>
          <CardTitle className="text-3xl">Total spent</CardTitle>
          <CardDescription className="text-lg">
            The total amount you've spent
          </CardDescription>
        </CardHeader>
        <CardContent className="text-2xl font-semibold">
          {isPending ? '...' : data?.total || 0}
        </CardContent>
      </Card>
    </>
  )
}

export default Index
