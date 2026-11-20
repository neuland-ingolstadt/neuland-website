import { createFileRoute, notFound } from '@tanstack/react-router'
import {
	ArrowLeft,
	Calendar,
	Clock3,
	ExternalLink,
	Lock,
	MapPin
} from 'lucide-react'
import ShareEventLinkButton from '@/components/Events/share-event-link-button'
import TerminalButton from '@/components/terminal-button'
import { Link } from '@/i18n/navigation'
import { createTranslator, resolveLocale, useTranslations } from '@/i18n/react'
import {
	formatEventDateAndTime,
	getLocalizedEventDescription,
	getLocalizedEventTitle
} from '@/lib/events'
import { getEventDetail } from '@/server/events'

export const Route = createFileRoute('/$locale/events/$id')({
	loader: async ({ params }) => {
		const eventId = Number(params.id)
		if (Number.isNaN(eventId)) {
			throw notFound()
		}

		const result = await getEventDetail({
			data: { eventId, locale: params.locale }
		})
		if (!result) {
			throw notFound()
		}

		return result
	},
	head: ({ params, loaderData }) => {
		const locale = resolveLocale(params.locale)
		const t = createTranslator(locale, 'Events.metadata')
		const tEvents = createTranslator(locale, 'Events')

		if (!loaderData) {
			return { meta: [{ title: t('notFound') }] }
		}

		const title = getLocalizedEventTitle(loaderData.event, locale)
		const description =
			getLocalizedEventDescription(loaderData.event, locale) || t('description')

		return {
			meta: [
				{
					title: `${title} - ${t('title')}`,
					name: 'description',
					content: description ?? tEvents('description')
				}
			]
		}
	},
	component: EventDetailPage
})

function EventDetailPage() {
	const { event, shareUrl } = Route.useLoaderData()
	const params = Route.useParams() as { locale: string }
	const locale = resolveLocale(params.locale)
	const t = useTranslations('Events')

	const title = getLocalizedEventTitle(event, locale)
	const description = getLocalizedEventDescription(event, locale)
	const schedule = formatEventDateAndTime(event, locale, t('tbd'))

	return (
		<div className="mx-auto max-w-3xl pt-8 md:pt-16 mb-20 md:mb-28">
			<div className="mb-10 flex justify-start">
				<Link
					href="/events"
					className="group inline-flex items-center gap-2 font-mono text-sm text-terminal-text/70 no-underline hover:text-terminal-ink transition-colors duration-200"
				>
					<ArrowLeft
						size={14}
						className="group-hover:-translate-x-1 transition-transform"
					/>
					<span>{t('backToEvents')}</span>
				</Link>
			</div>

			<div className="bg-terminal-window relative overflow-hidden border border-terminal-window-border p-6 md:p-8">
				<div className="pointer-events-none absolute inset-0 bg-linear-to-br from-terminal-cyan/3 via-transparent to-terminal-cyan/3" />
				<div className="relative z-10">
					{event.isInternal && (
						<span className="text-terminal-text/90 mb-4 inline-flex items-center gap-1 border border-terminal-window-border/80 bg-terminal-card/70 px-2 py-0.5 text-[0.65rem] font-semibold tracking-[0.08em] uppercase">
							<Lock size={10} />
							{t('filters.internal')}
						</span>
					)}
					<h1 className="text-terminal-lightGreen mb-4 mt-0 text-3xl leading-tight font-bold break-words">
						{title}
					</h1>

					<ul className="text-terminal-text/90 m-0 mb-6 list-none space-y-2 p-0 font-mono">
						<li className="flex items-start gap-3">
							<Calendar
								size={16}
								aria-hidden="true"
								className="mt-1 shrink-0 text-terminal-ink"
							/>
							{schedule.date}
						</li>
						{schedule.time && (
							<li className="flex items-start gap-3">
								<Clock3
									size={16}
									aria-hidden="true"
									className="mt-1 shrink-0 text-terminal-ink"
								/>
								{schedule.time}
								{schedule.dayOffset > 0 &&
									` ${t('dayOffset', { count: schedule.dayOffset })}`}
							</li>
						)}
						{event.location && (
							<li className="flex items-start gap-3">
								<MapPin
									size={16}
									aria-hidden="true"
									className="mt-1 shrink-0 text-terminal-ink"
								/>
								{event.location}
							</li>
						)}
					</ul>

					<div className="border-terminal-window-border/60 pt-6 border-t">
						<h2 className="text-terminal-text mb-3 text-xl font-semibold">
							{t('details')}
						</h2>
						{description ? (
							<p className="text-terminal-text/85 leading-relaxed whitespace-pre-wrap">
								{description}
							</p>
						) : (
							<p className="text-terminal-text/80">{t('noDescription')}</p>
						)}
					</div>

					<div className="mt-6">
						<p className="text-terminal-text/85 mb-2 text-xs">
							{t('shareableHint')}
						</p>
						<div className="text-terminal-text flex flex-col gap-3 border border-terminal-window-border/70 bg-terminal-card/70 p-3 font-mono text-sm sm:flex-row sm:items-center sm:justify-between">
							<span className="min-w-0 break-all">{shareUrl}</span>
							<ShareEventLinkButton url={shareUrl} />
						</div>
					</div>

					{event.eventUrl && (
						<div className="flex flex-wrap gap-3 pt-8">
							<TerminalButton
								href={event.eventUrl}
								target="_blank"
								rel="noreferrer noopener"
							>
								{t('eventWebsite')}
								<ExternalLink size={16} />
							</TerminalButton>
						</div>
					)}
				</div>
			</div>
		</div>
	)
}
