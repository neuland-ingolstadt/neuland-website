import { createServerFn } from '@tanstack/react-start'
import { fetchEvents } from '@/services/events'

export const getEventsData = createServerFn().handler(async () => {
	const { error, ...events } = await fetchEvents()
	return { events, error }
})
