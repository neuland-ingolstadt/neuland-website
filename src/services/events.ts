import moment from 'moment'
import { rrulestr } from 'rrule'
import 'moment/locale/de'

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
}

export const fetchEvents = async (): Promise<{
	semester: string
	events: Event[]
}> => {
	const response = await fetch('https://api.dev.neuland.app/graphql', {
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

	const { data } = await response.json()
	const events = data.neulandEvents.map(
		(event: NeulandEventResponse): Event => {
			moment.locale('de')

			const startDate = moment(event.startTime)
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

			let rruleText = undefined
			if (event.rrule) {
				try {
					const rule = rrulestr(event.rrule)

					rruleText = rule.toText()

					rruleText = rruleText.charAt(0).toUpperCase() + rruleText.slice(1)

					if (!rruleText.includes('at ') && rule.options.dtstart) {
						const time = moment(rule.options.dtstart).format('HH:mm')
						rruleText += ` at ${time}`
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
				rruleText
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
		events
	}
}
