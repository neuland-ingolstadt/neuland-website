import type { Event } from '@/services/events'

const EVENT_TIMEZONE = 'Europe/Berlin'

function getLocaleTag(locale: string) {
	return locale.startsWith('de') ? 'de-DE' : 'en-GB'
}

export function getEventTimestamp(event: Event): number | null {
	const candidate = event.startDateTime || event.nextOccurrence
	if (!candidate) return null

	const timestamp = new Date(candidate).getTime()
	if (Number.isNaN(timestamp)) return null
	return timestamp
}

export function getLocalizedEventTitle(event: Event, locale: string) {
	return locale.startsWith('de')
		? event.titleDe || event.titleEn || event.title
		: event.titleEn || event.titleDe || event.title
}

export function getLocalizedEventDescription(event: Event, locale: string) {
	return locale.startsWith('de')
		? event.descriptionDe || event.descriptionEn || event.description
		: event.descriptionEn || event.descriptionDe || event.description
}

/** Splits the event schedule into a date line and a time line. */
export function formatEventDateAndTime(
	event: Event,
	locale: string,
	fallback = 'TBD'
): { date: string; time: string | null; dayOffset: number } {
	const timestamp = getEventTimestamp(event)
	if (!timestamp) return { date: fallback, time: null, dayOffset: 0 }

	const start = new Date(timestamp)
	const end = event.endDateTime ? new Date(event.endDateTime) : null
	const hasEnd = end !== null && !Number.isNaN(end.getTime())
	const localeTag = getLocaleTag(locale)
	const dateFormatter = new Intl.DateTimeFormat(localeTag, {
		timeZone: EVENT_TIMEZONE,
		weekday: 'short',
		day: '2-digit',
		month: '2-digit',
		year: 'numeric'
	})
	const timeFormatter = new Intl.DateTimeFormat(localeTag, {
		timeZone: EVENT_TIMEZONE,
		hour: '2-digit',
		minute: '2-digit'
	})
	const dayKey = new Intl.DateTimeFormat('en-CA', {
		timeZone: EVENT_TIMEZONE,
		year: 'numeric',
		month: '2-digit',
		day: '2-digit'
	})

	let date = dateFormatter.format(start)
	let time = timeFormatter.format(start)
	let dayOffset = 0
	if (hasEnd && end) {
		dayOffset = Math.round(
			(Date.parse(dayKey.format(end)) - Date.parse(dayKey.format(start))) /
				86_400_000
		)
		if (dayOffset > 0) date = dateFormatter.formatRange(start, end)
		time += ` - ${timeFormatter.format(end)}`
	}

	return { date, time, dayOffset }
}

const MINUTE = 60_000
const HOUR = 60 * MINUTE
const DAY = 24 * HOUR

/** Relative time until the event starts, or `liveLabel` while it is running. */
export function getEventCountdown(
	event: Event,
	now: number,
	locale: string,
	liveLabel: string
): string | null {
	const start = getEventTimestamp(event)
	if (!start) return null

	const end = event.endDateTime ? new Date(event.endDateTime).getTime() : start
	if (start <= now && now < (Number.isNaN(end) ? start : end)) return liveLabel

	const rtf = new Intl.RelativeTimeFormat(getLocaleTag(locale), {
		numeric: 'auto'
	})
	const diff = start - now
	const abs = Math.abs(diff)
	if (abs < HOUR) return rtf.format(Math.round(diff / MINUTE), 'minute')
	if (abs < DAY) return rtf.format(Math.round(diff / HOUR), 'hour')
	if (abs < 14 * DAY) return rtf.format(Math.round(diff / DAY), 'day')
	if (abs < 60 * DAY) return rtf.format(Math.round(diff / (7 * DAY)), 'week')
	return rtf.format(Math.round(diff / (30 * DAY)), 'month')
}
