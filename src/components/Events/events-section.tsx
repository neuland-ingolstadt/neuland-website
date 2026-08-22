import type { Event } from '@/services/events'
import TerminalEvents from './terminal-events'

export default function EventsSection({
	eventsData,
	error
}: {
	eventsData: { semester: string; events: Event[] }
	error: string | null
}) {
	return <TerminalEvents initialData={eventsData} error={error} />
}
