import { createServerFn } from '@tanstack/react-start'
import { getCurrentSemester } from '@/lib/semester'
import { fetchEvents } from '@/services/events'

export const getEventsData = createServerFn().handler(async () => {
	try {
		const events = await fetchEvents()
		return { events, error: null }
	} catch (error) {
		console.error('Error fetching events:', error)
		return {
			events: {
				semester: getCurrentSemester(),
				events: []
			},
			error: error instanceof Error ? error.message : 'Failed to fetch events'
		}
	}
})
