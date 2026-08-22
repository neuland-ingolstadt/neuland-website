import { createFileRoute, notFound } from '@tanstack/react-router'
import { ArrowLeft, ExternalLink } from 'lucide-react'
import ShareEventLinkButton from '@/components/Events/share-event-link-button'
import TerminalButton from '@/components/terminal-button'
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbSeparator
} from '@/components/ui/breadcrumb'
import { Link } from '@/i18n/navigation'
import { createTranslator, resolveLocale, useTranslations } from '@/i18n/react'
import {
	formatEventDateRange,
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

	return (
		<div className="min-h-screen py-18 px-4 md:px-8">
			<div className="mx-auto max-w-5xl">
				<Breadcrumb>
					<BreadcrumbList className="flex items-center">
						<BreadcrumbItem className="flex items-center">
							<BreadcrumbLink asChild className="flex items-center">
								<Link href="/" className="flex items-center">
									{t('breadcrumbs.home')}
								</Link>
							</BreadcrumbLink>
						</BreadcrumbItem>
						<BreadcrumbSeparator className="mx-1 flex items-center" />
						<BreadcrumbItem className="flex items-center">
							<BreadcrumbLink asChild className="flex items-center">
								<Link href="/events" className="flex items-center">
									{t('breadcrumbs.events')}
								</Link>
							</BreadcrumbLink>
						</BreadcrumbItem>
						<BreadcrumbSeparator className="mx-1 flex items-center" />
						<BreadcrumbItem className="flex items-center">
							<BreadcrumbLink className="flex items-center">
								{title.length > 36 ? `${title.slice(0, 36)}...` : title}
							</BreadcrumbLink>
						</BreadcrumbItem>
					</BreadcrumbList>
				</Breadcrumb>

				<div className="bg-terminal-window relative mt-8 overflow-hidden border border-terminal-window-border p-6 md:p-8">
					<div className="pointer-events-none absolute inset-0 bg-linear-to-br from-terminal-cyan/3 via-transparent to-terminal-cyan/3" />
					<div className="relative z-10">
						<div className="mb-4 flex items-start justify-between gap-3">
							<h1 className="text-terminal-lightGreen text-3xl leading-tight font-bold">
								{title}
							</h1>
							<div className="shrink-0">
								<span className="text-terminal-text/80 inline-flex items-center border border-terminal-window-border/80 bg-terminal-card/70 px-2 py-0.5 text-[0.65rem] font-semibold tracking-[0.08em] uppercase">
									{event.isInternal
										? t('filters.internal')
										: t('filters.public')}
								</span>
							</div>
						</div>

						<div className="text-terminal-text/80 mb-6 space-y-2">
							<div>
								<span className="text-terminal-text/60 mr-2">{t('date')}:</span>
								{formatEventDateRange(event, locale, t('tbd'))}
							</div>
							{event.location && (
								<div>
									<span className="text-terminal-text/60 mr-2">
										{t('location')}:
									</span>
									{event.location}
								</div>
							)}
						</div>

						<div className="border-terminal-window-border/60 pt-6 border-t">
							<h2 className="text-terminal-text mb-3 text-xl font-semibold">
								{t('details')}
							</h2>
							{description ? (
								<p className="text-terminal-text/85 leading-relaxed whitespace-pre-wrap">
									{description}
								</p>
							) : (
								<p className="text-terminal-text/60">{t('noDescription')}</p>
							)}
						</div>

						<div className="mt-6">
							<p className="text-terminal-text/75 mb-2 text-xs">
								{t('shareableHint')}
							</p>
							<div className="text-terminal-text border border-terminal-window-border/70 bg-terminal-card/70 px-3 py-2 font-mono text-sm break-all">
								{shareUrl}
							</div>
						</div>

						<div className="flex flex-wrap gap-3 pt-8">
							<TerminalButton href="/events" className="group">
								<ArrowLeft
									size={16}
									className="transition-transform duration-200 group-hover:-translate-x-0.5"
								/>
								{t('backToEvents')}
							</TerminalButton>
							<ShareEventLinkButton url={shareUrl} />
							{event.eventUrl && (
								<TerminalButton
									href={event.eventUrl}
									target="_blank"
									rel="noreferrer noopener"
								>
									{t('eventWebsite')}
									<ExternalLink size={16} />
								</TerminalButton>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
