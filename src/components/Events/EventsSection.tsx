import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'
import TerminalEvents from './TerminalEvents'
import { getEventsData } from './EventsLoader'

export default async function EventsSection() {
  // Create a new QueryClient instance
  const queryClient = new QueryClient()
  
  // Prefetch the events data on the server
  const eventsData = await getEventsData()
  
  // Prefill the query cache
  await queryClient.prefetchQuery({
    queryKey: ['eventsData'],
    queryFn: () => eventsData.events,
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
  
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <TerminalEvents />
    </HydrationBoundary>
  )
}