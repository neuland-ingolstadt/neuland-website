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

	// Transform API response to match expected format
	const events = data.neulandEvents.map(
		(event: NeulandEventResponse): Event => {
			// Format date from startTime
			const date = new Date(event.startTime)
			const formattedDate = date.toLocaleDateString('de-DE', {
				day: '2-digit',
				month: '2-digit',
				year: 'numeric'
			})

			const formattedTime = date.toLocaleTimeString('de-DE', {
				hour: '2-digit',
				minute: '2-digit'
			})

			return {
				title: event.title.de,
				date: `${formattedDate}, ${formattedTime}`,
				location: event.location || '',
				description: event.description.de || ''
			}
		}
	)

	// Get the current semester (simple estimation)
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
