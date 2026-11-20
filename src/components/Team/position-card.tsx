import { Binoculars, ChevronRight, Clock } from 'lucide-react'
import type React from 'react'
import { memo } from 'react'
import { Link } from '@/i18n/navigation'
import { resolveLocale, useLocale, useTranslations } from '@/i18n/react'
import { localize, type Position } from '@/lib/positions'
import { markerRotation } from '@/lib/utils'

export const badgeClass =
	'text-xs px-2.5 py-1 bg-terminal-windowTitle text-terminal-text/70 font-medium rounded-sm'

const statusBadgeClass: Record<Position['status'], string> = {
	open: 'text-xs px-2.5 py-1 font-medium rounded-sm bg-terminal-cyan/15 text-terminal-ink border border-terminal-cyan/40 [:root[data-theme=light]_&]:bg-black [:root[data-theme=light]_&]:text-white [:root[data-theme=light]_&]:border-black',
	filled: badgeClass
}

export const StatusBadge: React.FC<{ status: Position['status'] }> = ({
	status
}) => {
	const t = useTranslations('Team')
	return (
		<span
			className={`${statusBadgeClass[status]}${status === 'open' ? ' inline-flex items-center gap-1.5' : ''}`}
		>
			{status === 'open' && <Binoculars size={12} aria-hidden="true" />}
			{t(`status.${status}`)}
		</span>
	)
}

interface PositionCardProps {
	position: Position
}

const PositionCard: React.FC<PositionCardProps> = ({ position }) => {
	const t = useTranslations('Team')
	const locale = resolveLocale(useLocale())

	return (
		<Link
			href={`/open-positions/${position.id}`}
			className="h-full border border-terminal-windowTitle bg-terminal-window group relative overflow-hidden flex flex-col transition-all duration-200 hover:border-terminal-window-border text-left w-full no-underline"
		>
			{/* Subtle background effect */}
			<div className="absolute inset-0 bg-gradient-to-br from-terminal-cyan/3 via-transparent to-terminal-cyan/3 pointer-events-none" />

			<div className="p-5 pb-2 flex flex-col items-start gap-2 relative">
				<div className="font-mono text-xl font-bold text-terminal-text">
					{localize(position.title, locale)}
				</div>
				<div className="flex flex-wrap gap-2 mt-1">
					<span className={badgeClass}>{t(`teams.${position.team}`)}</span>
					<span className={badgeClass}>
						{t(`language.${position.language}`)}
					</span>
					<StatusBadge status={position.status} />
				</div>
			</div>
			<div className="pt-2 pb-4 px-5 grow relative">
				<p className="text-base text-terminal-text/70 mb-2 leading-relaxed font-sans font-normal">
					{localize(position.shortDescription, locale)}
				</p>
			</div>
			<div className="px-5 pb-5 pt-0 flex items-center min-h-[56px] relative">
				<span className="inline-flex items-center gap-2 font-mono text-sm text-terminal-text/70">
					<Clock size={14} />
					{t('hoursPerWeek', {
						min: position.hoursPerWeek.min,
						max: position.hoursPerWeek.max
					})}
				</span>
			</div>

			{/* Details marker, as on the project cards */}
			<span
				className="marker-stroke absolute bottom-3 right-3 z-10 flex items-center justify-center px-2.5 py-1.5"
				style={{ transform: markerRotation(position.id) }}
			>
				<ChevronRight
					size={24}
					aria-label={t('card.more')}
					className="group-hover:translate-x-1 transition-transform text-terminal-text/70 group-hover:text-terminal-ink"
				/>
			</span>
		</Link>
	)
}

export default memo(PositionCard)
