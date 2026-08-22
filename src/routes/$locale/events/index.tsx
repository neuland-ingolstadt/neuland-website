import { createFileRoute } from '@tanstack/react-router'
import EventsPageClient from '@/components/Events/events-page-client'
import { createTranslator, resolveLocale } from '@/i18n/react'
import { getCurrentSemester } from '@/lib/semester'
import { getAllEvents } from '@/server/events'

export const Route = createFileRoute('/$locale/events/')({
	loader: async () => {
		try {
			const eventsData = await getAllEvents()
			return {
				eventsData: {
					semester: eventsData.semester,
					events: eventsData.events
				},
				error: null as string | null
			}
		} catch (error) {
			return {
				eventsData: {
					semester: getCurrentSemester(),
					events: []
				},
				error: error instanceof Error ? error.message : 'Failed to fetch events'
			}
		}
	},
	head: ({ params }) => {
		const t = createTranslator(resolveLocale(params.locale), 'Events.metadata')
		return {
			meta: [
				{ title: t('title'), name: 'description', content: t('description') }
			]
		}
	},
	component: EventsPage
})

function EventsPage() {
	const loaderData = Route.useLoaderData()

	return (
		<EventsPageClient
			initialData={loaderData.eventsData}
			error={loaderData.error ?? undefined}
		/>
	)
}
