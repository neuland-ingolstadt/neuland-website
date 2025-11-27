import {
	dehydrate,
	HydrationBoundary,
	QueryClient
} from '@tanstack/react-query'
import { getEventsData } from './events-loader'
import TerminalEvents from './terminal-events'

export default async function EventsSection() {
	const queryClient = new QueryClient()
	const eventsData = await getEventsData()

	await queryClient.prefetchQuery({
		queryKey: ['eventsData'],
		queryFn: () => eventsData.events,
		staleTime: 5 * 60 * 1000
	})

	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			<TerminalEvents
				initialData={eventsData.events}
				error={eventsData.error}
			/>
		</HydrationBoundary>
	)
}
