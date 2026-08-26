import { createFileRoute } from '@tanstack/react-router'
import EventsPageClient from '@/components/Events/events-page-client'
import { createTranslator, resolveLocale } from '@/i18n/react'
import { getAllEvents } from '@/server/events'

export const Route = createFileRoute('/$locale/events/')({
	loader: async () => {
		const { error, ...eventsData } = await getAllEvents()
		return {
			eventsData,
			error
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
