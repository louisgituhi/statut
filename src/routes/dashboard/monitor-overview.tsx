import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/monitor-overview')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/dashboard/monitor-overview"!</div>
}
