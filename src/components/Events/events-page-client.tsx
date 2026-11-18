'use client'

import {
	ArrowUpRight,
	Calendar,
	Clock3,
	Filter,
	Lock,
	MapPin,
	Unlock
} from 'lucide-react'
import { motion } from 'motion/react'
import { useMemo, useState } from 'react'
import { InternalOnlyTooltip } from '@/components/ui/tooltip'
import { useNow } from '@/hooks/use-now'
import { Link } from '@/i18n/navigation'
import { useLocale, useTranslations } from '@/i18n/react'
import {
	formatEventDateAndTime,
	getEventCountdown,
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
	icon?: React.ReactNode
	onClick: () => void
}

function FilterButton({ active, label, icon, onClick }: FilterButtonProps) {
	return (
		<button
			type="button"
			onClick={onClick}
			className={cn(
				filterChipClass,
				icon && 'gap-1.5',
				active ? activeFilterClass : inactiveFilterClass
			)}
		>
			{icon}
			{label}
		</button>
	)
}

const EventsPageClient = ({ initialData, error }: EventsPageClientProps) => {
	const t = useTranslations('Events')
	const locale = useLocale()
	const now = useNow()
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
							icon={<Unlock size={12} />}
							onClick={() => setVisibilityFilter('public')}
						/>
						<FilterButton
							active={visibilityFilter === 'internal'}
							label={t('filters.internal')}
							icon={<Lock size={12} />}
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

			<div className="max-w-6xl mx-auto mb-20 md:mb-28">
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
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 items-stretch">
						{filteredEvents.map((event) => {
							const title = getLocalizedEventTitle(event, locale)
							const description = getLocalizedEventDescription(event, locale)
							const schedule = formatEventDateAndTime(event, locale, t('tbd'))
							const timeLabel =
								now === null
									? null
									: getEventCountdown(event, now, locale, t('happeningNow'))

							return (
								<article
									key={event.id}
									className="group relative bg-terminal-window border border-terminal-window-border overflow-hidden h-full flex flex-col transition-colors duration-200 hover:border-terminal-text/40"
								>
									<div className="relative z-10 h-full flex flex-col">
										<Link
											href={`/events/${event.id}`}
											aria-label={title}
											className="absolute inset-0 z-10 after:hidden"
										/>
										{(timeLabel || event.isInternal) && (
											<div className="flex items-center justify-between gap-3 border-b border-terminal-window-border bg-terminal-text/[0.06] px-6 py-2.5 font-mono text-xs text-terminal-text/80">
												<span className="inline-flex items-center gap-2">
													{timeLabel && (
														<>
															<Clock3 size={12} aria-hidden="true" />
															{timeLabel}
														</>
													)}
												</span>
												{event.isInternal && (
													<span className="relative z-20">
														<InternalOnlyTooltip>
															<span className="inline-flex items-center gap-1 border border-terminal-window-border/80 bg-terminal-card/70 px-2 py-0.5 text-[0.6rem] font-semibold uppercase tracking-[0.08em] text-terminal-text/90">
																<Lock size={10} />
																{t('filters.internal')}
															</span>
														</InternalOnlyTooltip>
													</span>
												)}
											</div>
										)}
										<div className="grow p-6">
											<h2 className="mb-4 mt-0 text-xl font-bold text-terminal-lightGreen leading-tight">
												{title}
											</h2>

											<ul className="m-0 mb-4 list-none space-y-1.5 p-0 font-mono [&>li]:mb-0 text-sm text-terminal-text/85">
												<li className="flex items-start gap-2.5">
													<Calendar
														size={14}
														aria-hidden="true"
														className="mt-0.5 shrink-0 text-terminal-ink"
													/>
													{schedule.date}
												</li>
												{schedule.time && (
													<li className="flex items-start gap-2.5">
														<Clock3
															size={14}
															aria-hidden="true"
															className="mt-0.5 shrink-0 text-terminal-ink"
														/>
														{schedule.time}
														{schedule.dayOffset > 0 &&
															` ${t('dayOffset', { count: schedule.dayOffset })}`}
													</li>
												)}
												{event.location && (
													<li className="flex items-start gap-2.5">
														<MapPin
															size={14}
															aria-hidden="true"
															className="mt-0.5 shrink-0 text-terminal-ink"
														/>
														{event.location}
													</li>
												)}
											</ul>

											{description && (
												<p className="m-0 line-clamp-4 font-sans text-sm leading-relaxed text-terminal-text/75">
													{description}
												</p>
											)}
										</div>
										<div className="mt-auto border-t border-terminal-window-border bg-terminal-text/[0.06] px-6 py-5">
											<div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 font-mono text-sm">
												<span className="inline-flex items-center gap-1.5 text-terminal-text/80 transition-colors duration-200 group-hover:text-terminal-ink">
													{t('openDetails')}
													<ArrowUpRight
														size={14}
														className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
													/>
												</span>
												{event.eventUrl && (
													<a
														href={event.eventUrl}
														target="_blank"
														rel="noreferrer noopener"
														className="relative z-20 text-terminal-text/60 no-underline after:hidden transition-colors duration-200 hover:text-terminal-ink"
													>
														{t('eventWebsite')}
													</a>
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
