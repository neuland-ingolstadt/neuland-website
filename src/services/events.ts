import moment from 'moment'
import { Frequency, type Weekday, rrulestr } from 'rrule'
import 'moment/locale/de'
import type { Language } from 'rrule/dist/esm/nlp/i18n'
import type { GetText } from 'rrule/dist/esm/nlp/totext'

interface NeulandEventResponse {
	id: string
	location: string
	createdAt: string
	updatedAt: string
	startTime: string
	endTime: string | null
	rrule: string
	title: {
		de: string
		en: string
	}
	description: {
		de: string
		en: string
	}
}

interface Event {
	title: string
	date: string
	location: string
	description: string
	rruleText?: string
	rruleTextShort?: string
	nextOccurrence: moment.Moment
}

const GERMAN: Language = {
	dayNames: [
		'Sonntag',
		'Montag',
		'Dienstag',
		'Mittwoch',
		'Donnerstag',
		'Freitag',
		'Samstag'
	],
	monthNames: [
		'Januar',
		'Februar',
		'März',
		'April',
		'Mai',
		'Juni',
		'Juli',
		'August',
		'September',
		'Oktober',
		'November',
		'Dezember'
	],
	tokens: {
		every: /jede(n)?/i,
		until: /bis/i,
		day: /Tag/i,
		days: /Tage/i,
		week: /Woche/i,
		weeks: /Wochen/i,
		on: /am/i,
		in: /im/i,
		'on the': /am/i,
		for: /für/i,
		and: /und/i,
		or: /oder/i,
		at: /um/i,
		last: /letzten/i,
		'time(s)': /mal/i,
		'(~ approximate)': /(~ ungefähr)/i,
		times: /mal/i,
		time: /mal/i,
		minutes: /Minuten/i,
		hours: /Stunden/i,
		weekdays: /Wochentage/i,
		weekday: /Wochentag/i,
		months: /Monate/i,
		month: /Monat/i,
		years: /Jahre/i,
		year: /Jahr/i
	}
}

const germanStrings: { [key: string]: string } = {
	every: 'jede(n)',
	until: 'bis',
	day: 'Tag',
	days: 'Tage',
	week: 'Woche',
	weeks: 'Wochen',
	on: 'am',
	in: 'im',
	'on the': 'am',
	for: 'für',
	and: 'und',
	or: 'oder',
	at: 'um',
	last: 'letzten',
	'time(s)': 'mal',
	'(~ approximate)': '(~ ungefähr)',
	times: 'mal',
	time: 'mal',
	minutes: 'Minuten',
	hours: 'Stunden',
	weekdays: 'Wochentage',
	weekday: 'Wochentag',
	months: 'Monate',
	month: 'Monat',
	years: 'Jahre',
	year: 'Jahr',
	first: 'ersten',
	second: 'zweiten',
	third: 'dritten',
	fourth: 'vierten',
	fifth: 'fünften',
	nth: 'ten',
	st: '.',
	nd: '.',
	rd: '.',
	th: '.'
}

const getText: GetText = (id: string | number | Weekday): string => {
	return typeof id === 'string' ? germanStrings[id] || id : String(id)
}

function getDateStr(startDate: moment.Moment, event: NeulandEventResponse) {
	if (!startDate.isValid()) {
		return 'tbd'
	}

	const formattedStart = startDate.format('DD.MM.YYYY, HH:mm')

	let dateStr = formattedStart
	if (event.endTime) {
		const endDate = moment(event.endTime)
		if (startDate.isSame(endDate, 'day')) {
			dateStr += ` - ${endDate.format('HH:mm')}`
		} else {
			dateStr += ` - ${endDate.format('DD.MM.YYYY, HH:mm')}`
		}
	}

	return dateStr
}
const API_URL =
	process.env.NEXT_PUBLIC_API_URL ?? 'https://api.dev.neuland.app/graphql'

export const fetchEvents = async (): Promise<{
	semester: string
	events: Event[]
}> => {
	console.info('Fetching events from API:', API_URL)
	try {
		const response = await fetch(API_URL, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				query: `
					query NeulandEvents {
						neulandEvents {
							id
							location
							createdAt
							updatedAt
							startTime
							endTime
							rrule
							title {
								de
								en
							}
							description {
								de
								en
							}
						}
					}
				`
			})
		})

		if (!response.ok) {
			throw new Error(`API responded with status: ${response.status}`)
		}

		const responseData = await response.json()

		if (!responseData.data || !responseData.data.neulandEvents) {
			console.error('Invalid API response structure:', responseData)
			throw new Error('Invalid API response structure')
		}

		const events = responseData.data.neulandEvents.map(
			(event: NeulandEventResponse): Event => {
				moment.locale('de')

				const startDate = moment(event.startTime)
				let dateStr = getDateStr(startDate, event)
				let nextOccurrence = startDate

				let rruleText = undefined
				let rruleTextShort = undefined
				if (event.rrule) {
					try {
						const rule = rrulestr(event.rrule)

						rruleText = rule.toText(getText, GERMAN)

						if (rule.options.freq !== undefined) {
							const freqMap: { [key in Frequency]?: string } = {
								[Frequency.YEARLY]: 'Jährlich',
								[Frequency.MONTHLY]: 'Monatlich',
								[Frequency.WEEKLY]: 'Wöchentlich',
								[Frequency.DAILY]: 'Täglich'
							}

							rruleTextShort = freqMap[rule.options.freq] || ''

							if (rule.options.interval && rule.options.interval > 1) {
								rruleTextShort = `Alle ${rule.options.interval} ${
									rule.options.freq === Frequency.YEARLY
										? 'Jahre'
										: rule.options.freq === Frequency.MONTHLY
											? 'Monate'
											: rule.options.freq === Frequency.WEEKLY
												? 'Wochen'
												: 'Tage'
								}`
							}
						}

						if (!rruleText.includes('at ') && rule.options.dtstart) {
							const time = moment(rule.options.dtstart).format('HH:mm')
							rruleText += ` um ${time} Uhr`
						}

						nextOccurrence = moment(rule.after(new Date(), true))
						if (nextOccurrence) {
							dateStr = getDateStr(moment(nextOccurrence), event)
						}
					} catch (error) {
						console.error('Error parsing rrule:', error)
					}
				}

				return {
					title: event.title.de,
					date: dateStr,
					location: event.location || '',
					description: event.description.de || '',
					rruleText,
					rruleTextShort,
					nextOccurrence
				}
			}
		)

		const currentMonth = new Date().getMonth() + 1
		const currentYear = new Date().getFullYear()
		const semester =
			currentMonth >= 4 && currentMonth <= 9
				? `SS ${currentYear}`
				: `WS ${
						currentMonth <= 3 ? currentYear - 1 : currentYear
					}/${(currentMonth <= 3 ? currentYear : currentYear + 1)
						.toString()
						.slice(2)}`

		return {
			semester,
			events: events.sort((a: Event, b: Event) => {
				const dateAValid = a.nextOccurrence.isValid()
				const dateBValid = b.nextOccurrence.isValid()

				if (!dateAValid && !dateBValid) {
					return a.title.localeCompare(b.title)
				}

				if (!dateAValid) return 1
				if (!dateBValid) return -1

				const dateA = moment(a.nextOccurrence)
				const dateB = moment(b.nextOccurrence)

				if (dateA.isBefore(dateB)) {
					return -1
				}
				if (dateA.isAfter(dateB)) {
					return 1
				}
				return 0
			})
		}
	} catch (error) {
		console.error('Error fetching events:', error)
		throw error
	}
}
