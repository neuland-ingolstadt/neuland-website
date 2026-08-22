import { createServerFn } from '@tanstack/react-start'
import { getRequest } from '@tanstack/react-start/server'
import { fetchAllEvents, fetchEvents } from '@/services/events'

export const getAllEvents = createServerFn().handler(() => fetchAllEvents())

export const getUpcomingEvents = createServerFn().handler(() => fetchEvents())

export const getEventDetail = createServerFn()
	.validator((input: { eventId: number; locale: string }) => input)
	.handler(async ({ data }) => {
		const eventData = await fetchAllEvents()
		const event = eventData.events.find(
			(candidate) => candidate.id === data.eventId
		)
		if (!event) {
			return null
		}

		const request = getRequest()
		const host =
			request.headers.get('x-forwarded-host') ?? request.headers.get('host')
		const protocol =
			request.headers.get('x-forwarded-proto') ??
			(host?.includes('localhost') ? 'http' : 'https')
		const origin = host
			? `${protocol}://${host}`
			: 'https://neuland-ingolstadt.de'

		return {
			event,
			shareUrl: `${origin}/${data.locale}/events/${event.id}`
		}
	})
