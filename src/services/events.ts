import { getMonth, getYear, isValid } from 'date-fns'
import { formatInTimeZone, toZonedTime } from 'date-fns-tz'

const EVENT_TIMEZONE = 'Europe/Berlin'

export interface Event {
	id: number
	title: string
	titleDe: string
	titleEn: string
	date: string
	location: string
	description: string
	descriptionDe: string
	descriptionEn: string
	nextOccurrence: string
	startDateTime: string
	endDateTime: string | null
	eventUrl: string | null
	isInternal: boolean
}

function getDateStr(startUtc: Date, event: PublicEventResponse) {
	if (!isValid(startUtc)) {
		return 'tbd'
	}

	const formattedStart = formatInTimeZone(
		startUtc,
		EVENT_TIMEZONE,
		'dd.MM.yyyy, HH:mm'
	)

	let dateStr = formattedStart
	if (event.end_date_time) {
		const endUtc = new Date(event.end_date_time)
		if (!isValid(endUtc)) {
			return dateStr
		}

		const startDay = formatInTimeZone(startUtc, EVENT_TIMEZONE, 'yyyy-MM-dd')
		const endDay = formatInTimeZone(endUtc, EVENT_TIMEZONE, 'yyyy-MM-dd')
		if (startDay === endDay) {
			dateStr += ` - ${formatInTimeZone(endUtc, EVENT_TIMEZONE, 'HH:mm')}`
		} else {
			dateStr += ` - ${formatInTimeZone(
				endUtc,
				EVENT_TIMEZONE,
				'dd.MM.yyyy, HH:mm'
			)}`
		}
	}

	return dateStr
}

const API_URL =
	import.meta.env.VITE_API_URL ??
	process.env.API_URL ??
	'https://cl.neuland-ingolstadt.de/api/ical/4/events'

let cachedAllEvents: { semester: string; events: Event[] } | null = null
let allEventsCacheTimestamp = 0
const CACHE_TTL = 300000

export type PublicEventResponse = {
	description_de?: string | null
	description_en?: string | null
	end_date_time?: string | null
	event_url?: string | null
	id: number
	location?: string | null
	organizer_id: number
	start_date_time: string
	title_de: string
	title_en: string
	is_internal: boolean
}

function getSemesterFromDate(date: Date): string {
	const year = getYear(date)
	const month = getMonth(date) + 1

	if (month >= 4 && month <= 9) {
		return `SS ${year}`
	}
	const winterYear = month <= 3 ? year - 1 : year
	const winterYearNext = month <= 3 ? year : year + 1
	return `WS ${winterYear}/${winterYearNext.toString().slice(-2)}`
}

function sortEventsAscending(a: Event, b: Event) {
	const dateAValid = a.nextOccurrence !== ''
	const dateBValid = b.nextOccurrence !== ''

	if (!dateAValid && !dateBValid) {
		return a.title.localeCompare(b.title)
	}

	if (!dateAValid) return 1
	if (!dateBValid) return -1

	const dateA = new Date(a.nextOccurrence)
	const dateB = new Date(b.nextOccurrence)
	return dateA.getTime() - dateB.getTime()
}

function toEvent(event: PublicEventResponse): Event {
	const startUtc = new Date(event.start_date_time)
	const endUtc = event.end_date_time ? new Date(event.end_date_time) : null
	const titleDe = event.title_de || event.title_en || 'Untitled event'
	const titleEn = event.title_en || event.title_de || 'Untitled event'
	const descriptionDe = event.description_de || event.description_en || ''
	const descriptionEn = event.description_en || event.description_de || ''
	const nextOccurrence = isValid(startUtc) ? startUtc.toISOString() : ''

	return {
		id: event.id,
		title: titleDe,
		titleDe,
		titleEn,
		date: getDateStr(startUtc, event),
		location: event.location || '',
		description: descriptionDe,
		descriptionDe,
		descriptionEn,
		nextOccurrence,
		startDateTime: event.start_date_time,
		endDateTime: endUtc && isValid(endUtc) ? endUtc.toISOString() : null,
		eventUrl: event.event_url || null,
		isInternal: event.is_internal
	}
}

export const fetchAllEvents = async (): Promise<{
	semester: string
	events: Event[]
}> => {
	const now = Date.now()
	if (cachedAllEvents && now - allEventsCacheTimestamp < CACHE_TTL) {
		return cachedAllEvents
	}

	try {
		const response = await fetch(API_URL, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${process.env.CL_API_KEY}`
			}
		})

		if (!response.ok) {
			throw new Error(
				`API responded with status: ${response.status}: ${response.statusText}`
			)
		}

		const responseData = await response.json()
		if (!Array.isArray(responseData)) {
			throw new Error('Invalid events response format')
		}

		const events = (responseData as PublicEventResponse[])
			.map((event) => toEvent(event))
			.sort(sortEventsAscending)

		const nextUpcomingEvent = events.find((event) => {
			if (!event.nextOccurrence) return false
			return new Date(event.nextOccurrence) >= new Date()
		})
		let semester: string
		if (nextUpcomingEvent?.nextOccurrence) {
			semester = getSemesterFromDate(
				toZonedTime(new Date(nextUpcomingEvent.nextOccurrence), EVENT_TIMEZONE)
			)
		} else {
			semester = getSemesterFromDate(toZonedTime(new Date(), EVENT_TIMEZONE))
		}

		const result = {
			semester,
			events
		}

		cachedAllEvents = result
		allEventsCacheTimestamp = now

		return result
	} catch (error) {
		console.error('Error fetching events:', error)
		throw error
	}
}

export const fetchEvents = async (): Promise<{
	semester: string
	events: Event[]
}> => {
	const allEvents = await fetchAllEvents()
	const now = new Date()
	const events = allEvents.events.filter((event) => {
		if (!event.nextOccurrence) return false
		return new Date(event.nextOccurrence) >= now
	})

	return {
		semester: allEvents.semester,
		events
	}
}
