'use client'

import { ArrowUpRight, Clock3, Filter, Lock, Unlock } from 'lucide-react'
import { useMemo, useState } from 'react'
import TerminalButton from '@/components/terminal-button'
import { InternalOnlyTooltip } from '@/components/ui/tooltip'
import { useLocale, useTranslations } from '@/i18n/react'
import {
	formatEventDateRange,
	getLocalizedEventDescription,
	getLocalizedEventTitle
} from '@/lib/events'
import { cn } from '@/lib/utils'
import type { fetchAllEvents } from '@/services/events'

type VisibilityFilter = 'all' | 'public' | 'internal'
type TimeFilter = 'all' | 'upcoming' | 'past'

interface EventsPageClientProps {
	initialData: Awaited<ReturnType<typeof fetchAllEvents>>
	error?: string | null
}

interface FilterButtonProps {
	active: boolean
	label: string
	onClick: () => void
}

function FilterButton({ active, label, onClick }: FilterButtonProps) {
	return (
		<button
			type="button"
			onClick={onClick}
			className={cn(
				'px-3 py-1.5 border text-sm font-mono transition-colors duration-200',
				active
					? 'border-terminal-cyan bg-terminal-cyan/80 text-terminal-onAccent'
					: 'border-terminal-window-border text-terminal-text/80 hover:border-terminal-cyan/70 hover:text-terminal-cyan'
			)}
		>
			{label}
		</button>
	)
}

const EventsPageClient = ({ initialData, error }: EventsPageClientProps) => {
	const t = useTranslations('Events')
	const locale = useLocale()
	const [visibilityFilter, setVisibilityFilter] =
		useState<VisibilityFilter>('all')
	const [timeFilter, setTimeFilter] = useState<TimeFilter>('upcoming')

	const filteredEvents = useMemo(() => {
		const now = Date.now()
		const visibleEvents = initialData.events.filter((event) => {
			const timestamp = event.startDateTime
				? new Date(event.startDateTime).getTime()
				: null
			const hasValidDate =
				typeof timestamp === 'number' && !Number.isNaN(timestamp)
			const isPast = hasValidDate ? timestamp < now : false

			const visibilityMatch =
				visibilityFilter === 'all' ||
				(visibilityFilter === 'public' && !event.isInternal) ||
				(visibilityFilter === 'internal' && event.isInternal)

			const timeMatch =
				timeFilter === 'all' ||
				(timeFilter === 'upcoming' && !isPast) ||
				(timeFilter === 'past' && isPast)

			return visibilityMatch && timeMatch
		})

		return [...visibleEvents].sort((a, b) => {
			const aTimestamp = new Date(a.startDateTime || a.nextOccurrence).getTime()
			const bTimestamp = new Date(b.startDateTime || b.nextOccurrence).getTime()
			const aValid = !Number.isNaN(aTimestamp)
			const bValid = !Number.isNaN(bTimestamp)

			if (!aValid && !bValid) return a.id - b.id
			if (!aValid) return 1
			if (!bValid) return -1

			if (timeFilter === 'past') {
				return bTimestamp - aTimestamp
			}
			if (timeFilter === 'upcoming') {
				return aTimestamp - bTimestamp
			}

			const aPast = aTimestamp < now
			const bPast = bTimestamp < now
			if (aPast !== bPast) return aPast ? 1 : -1
			return aPast ? bTimestamp - aTimestamp : aTimestamp - bTimestamp
		})
	}, [initialData.events, timeFilter, visibilityFilter])

	return (
		<div className="min-h-screen py-18 px-4 md:px-8">
			<div className="max-w-6xl mx-auto">
				<div className="mb-8">
					<h1 className="text-3xl md:text-4xl font-bold font-mono">
						{t('title')}
					</h1>
					<p className="mt-3 text-terminal-text/80 font-mono max-w-3xl">
						{t('subtitle')}
					</p>
					<p className="mt-4 text-sm text-terminal-text/60 font-mono">
						{t('eventsFound', { count: filteredEvents.length })}
					</p>
				</div>

				<div className="mb-8 space-y-4">
					<div className="flex items-center gap-3">
						<Filter size={18} className="text-terminal-cyan" />
						<span className="text-terminal-text/80 font-mono text-sm">
							{t('filters.visibility')}
						</span>
						<div className="flex flex-wrap gap-2">
							<FilterButton
								active={visibilityFilter === 'all'}
								label={t('filters.all')}
								onClick={() => setVisibilityFilter('all')}
							/>
							<FilterButton
								active={visibilityFilter === 'public'}
								label={t('filters.public')}
								onClick={() => setVisibilityFilter('public')}
							/>
							<FilterButton
								active={visibilityFilter === 'internal'}
								label={t('filters.internal')}
								onClick={() => setVisibilityFilter('internal')}
							/>
						</div>
					</div>

					<div className="flex items-center gap-3">
						<Clock3 size={18} className="text-terminal-cyan" />
						<span className="text-terminal-text/80 font-mono text-sm">
							{t('filters.time')}
						</span>
						<div className="flex flex-wrap gap-2">
							<FilterButton
								active={timeFilter === 'upcoming'}
								label={t('filters.upcoming')}
								onClick={() => setTimeFilter('upcoming')}
							/>
							<FilterButton
								active={timeFilter === 'past'}
								label={t('filters.past')}
								onClick={() => setTimeFilter('past')}
							/>
							<FilterButton
								active={timeFilter === 'all'}
								label={t('filters.all')}
								onClick={() => setTimeFilter('all')}
							/>
						</div>
					</div>
				</div>

				{error ? (
					<div className="p-4 text-terminal-lightGreen border border-terminal-window-border rounded-sm bg-terminal-window">
						<p className="text-md mb-2">{t('apiErrorTitle')}</p>
						<p className="text-sm text-terminal-lightGreen/60">{error}</p>
					</div>
				) : filteredEvents.length === 0 ? (
					<div className="p-6 border border-terminal-window-border bg-terminal-window text-terminal-text/80 font-mono">
						{t('emptyState')}
					</div>
				) : (
					<div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-stretch">
						{filteredEvents.map((event) => {
							const title = getLocalizedEventTitle(event, locale)
							const description = getLocalizedEventDescription(event, locale)

							return (
								<article
									key={event.id}
									className="relative bg-terminal-window border border-terminal-window-border overflow-hidden p-5 h-full flex flex-col"
								>
									<div className="absolute top-0 left-0 w-8 h-8">
										<div className="absolute top-0 left-0 w-4 h-px bg-terminal-cyan/35" />
										<div className="absolute top-0 left-0 w-px h-4 bg-terminal-cyan/35" />
									</div>
									<div className="absolute bottom-0 right-0 w-8 h-8">
										<div className="absolute bottom-0 right-0 w-4 h-px bg-terminal-cyan/35" />
										<div className="absolute bottom-0 right-0 w-px h-4 bg-terminal-cyan/35" />
									</div>

									<div className="relative z-10 h-full flex flex-col">
										<div className="flex items-start justify-between gap-3">
											<h2 className="text-2xl font-semibold text-terminal-lightGreen leading-tight ">
												{title}
											</h2>
											<div className="shrink-0">
												{event.isInternal ? (
													<InternalOnlyTooltip>
														<span className="inline-flex items-center gap-1 border border-terminal-window-border/80 bg-terminal-card/70 px-2 py-0.5 text-[0.6rem] font-semibold uppercase tracking-[0.08em] text-terminal-text/80">
															<Lock size={10} />
															{t('filters.internal')}
														</span>
													</InternalOnlyTooltip>
												) : (
													<span className="inline-flex items-center gap-1 border border-terminal-window-border/80 bg-terminal-card/70 px-2 py-0.5 text-[0.6rem] font-semibold uppercase tracking-[0.08em] text-terminal-text/80">
														<Unlock size={10} />
														{t('filters.public')}
													</span>
												)}
											</div>
										</div>

										<p className=">text-terminal-text/80 mb-1">
											{formatEventDateRange(event, locale, t('tbd'))}
										</p>
										{event.location && (
											<p className="text-sm text-terminal-text/65 mb-4">
												@{event.location}
											</p>
										)}

										{description && (
											<p className="text-sm text-terminal-text/75 mb-5 leading-relaxed">
												{description}
											</p>
										)}

										<div className="mt-auto pt-4 border-t border-terminal-window-border/50">
											<div className="flex flex-wrap gap-2">
												<TerminalButton
													href={`/events/${event.id}`}
													className="group"
												>
													{t('openDetails')}
													<ArrowUpRight
														size={16}
														className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
													/>
												</TerminalButton>
												{event.eventUrl && (
													<TerminalButton
														href={event.eventUrl}
														target="_blank"
														rel="noreferrer noopener"
													>
														{t('eventWebsite')}
													</TerminalButton>
												)}
											</div>
										</div>
									</div>
								</article>
							)
						})}
					</div>
				)}
			</div>
		</div>
	)
}

export default EventsPageClient
