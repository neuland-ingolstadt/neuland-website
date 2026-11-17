'use client'

import {
	ArrowUpRight,
	Calendar,
	Clock3,
	Filter,
	Lock,
	Unlock
} from 'lucide-react'
import { motion } from 'motion/react'
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
	initialData: Omit<Awaited<ReturnType<typeof fetchAllEvents>>, 'error'>
	error?: string | null
}

const filterChipClass =
	'inline-flex items-center px-2.5 py-1 font-mono text-sm border transition-colors duration-200'
const activeFilterClass =
	'border-transparent bg-terminal-cyan text-terminal-onAccent [:root[data-theme=light]_&]:bg-black [:root[data-theme=light]_&]:text-white'
const inactiveFilterClass =
	'border-terminal-text/30 text-terminal-text/85 hover:border-terminal-cyan hover:text-terminal-ink [:root[data-theme=light]_&]:hover:border-black [:root[data-theme=light]_&]:hover:text-black'

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
				filterChipClass,
				active ? activeFilterClass : inactiveFilterClass
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
		<div className="relative">
			<div
				aria-hidden="true"
				className="pointer-events-none absolute -top-[var(--navbar-height,4.5rem)] left-1/2 -z-10 h-[100vh] w-screen -translate-x-1/2"
				style={{
					backgroundImage:
						'radial-gradient(ellipse 60% 70% at 100% 0%, var(--backdrop-glow-a), transparent 70%)'
				}}
			/>
			<motion.div
				initial={{ opacity: 0, y: -20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6 }}
				className="max-w-6xl mx-auto pt-8 mb-12 md:pt-16 md:mb-16"
			>
				<h1 className="mb-6 mt-0 font-mono text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl xl:text-7xl">
					{t('title')}
				</h1>
				<motion.p
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.6, delay: 0.2 }}
					className="mt-3 text-lg text-terminal-text/90 max-w-3xl"
				>
					{t('subtitle')}
				</motion.p>
				<motion.div
					initial={{ opacity: 0, y: 10 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, delay: 0.4 }}
					className="flex items-center gap-2 mt-4 text-sm text-terminal-text/80 font-mono"
				>
					<Calendar size={16} />
					<span>{t('eventsFound', { count: filteredEvents.length })}</span>
				</motion.div>
			</motion.div>

			<div className="max-w-6xl mx-auto mb-12 md:mb-16 space-y-5">
				<div className="flex flex-wrap items-center gap-x-3 gap-y-3">
					<Filter size={20} className="text-terminal-ink" />
					<span className="text-terminal-text/90 font-mono">
						{t('filters.visibility')}
					</span>
					<div className="flex flex-wrap gap-x-3 gap-y-3">
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

				<div className="flex flex-wrap items-center gap-x-3 gap-y-3">
					<Clock3 size={20} className="text-terminal-ink" />
					<span className="text-terminal-text/90 font-mono">
						{t('filters.time')}
					</span>
					<div className="flex flex-wrap gap-x-3 gap-y-3">
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

			<div className="max-w-6xl mx-auto">
				{error ? (
					<div className="p-4 text-terminal-lightGreen border border-terminal-window-border rounded-sm bg-terminal-window">
						<p className="text-md mb-2">{t('apiErrorTitle')}</p>
						<p className="text-sm text-terminal-lightGreen/80">{error}</p>
					</div>
				) : filteredEvents.length === 0 ? (
					<div className="p-6 border border-terminal-window-border bg-terminal-window text-terminal-text/90 font-mono">
						{t('emptyState')}
					</div>
				) : (
					<div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 items-stretch">
						{filteredEvents.map((event) => {
							const title = getLocalizedEventTitle(event, locale)
							const description = getLocalizedEventDescription(event, locale)

							return (
								<article
									key={event.id}
									className="relative bg-terminal-window border border-terminal-window-border overflow-hidden p-5 h-full flex flex-col"
								>
									<div className="relative z-10 h-full flex flex-col">
										<div className="flex items-start justify-between gap-3">
											<h2 className="text-2xl font-normal text-terminal-lightGreen leading-tight ">
												{title}
											</h2>
											<div className="shrink-0">
												{event.isInternal ? (
													<InternalOnlyTooltip>
														<span className="inline-flex items-center gap-1 border border-terminal-window-border/80 bg-terminal-card/70 px-2 py-0.5 text-[0.6rem] font-semibold uppercase tracking-[0.08em] text-terminal-text/90">
															<Lock size={10} />
															{t('filters.internal')}
														</span>
													</InternalOnlyTooltip>
												) : (
													<span className="inline-flex items-center gap-1 border border-terminal-window-border/80 bg-terminal-card/70 px-2 py-0.5 text-[0.6rem] font-semibold uppercase tracking-[0.08em] text-terminal-text/90">
														<Unlock size={10} />
														{t('filters.public')}
													</span>
												)}
											</div>
										</div>

										<p className="text-terminal-text/90 mb-1">
											{formatEventDateRange(event, locale, t('tbd'))}
										</p>
										{event.location && (
											<p className="text-sm text-terminal-text/85 mb-4">
												@{event.location}
											</p>
										)}

										{description && (
											<p className="text-base text-terminal-text/85 mb-5 leading-relaxed">
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
