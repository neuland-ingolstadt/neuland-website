'use server'
import { fetchEvents } from '@/services/events'

export async function getEventsData() {
	try {
		const events = await fetchEvents()
		return { events, error: null }
	} catch (error) {
		console.error('Error fetching events in server component:', error)
		return {
			events: {
				semester: `SS ${new Date().getFullYear()}`,
				events: []
			},
			error: error instanceof Error ? error.message : 'Failed to fetch events'
		}
	}
}
