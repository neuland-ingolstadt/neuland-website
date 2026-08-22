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
		const rawHost =
			request.headers.get('x-forwarded-host') ?? request.headers.get('host')
		const host = rawHost?.split(',')[0]?.trim().toLowerCase()
		const allowedHost =
			host &&
			(host === 'neuland-ingolstadt.de' ||
				host === 'www.neuland-ingolstadt.de' ||
				host.startsWith('localhost:') ||
				host === 'localhost')
				? host
				: null
		const protocol =
			request.headers.get('x-forwarded-proto') ??
			(allowedHost?.includes('localhost') ? 'http' : 'https')
		const origin = allowedHost
			? `${protocol}://${allowedHost}`
			: 'https://neuland-ingolstadt.de'

		return {
			event,
			shareUrl: `${origin}/${data.locale}/events/${event.id}`
		}
	})
