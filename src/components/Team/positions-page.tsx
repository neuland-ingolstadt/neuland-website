import {
	BadgeCheck,
	Filter,
	Network,
	Rocket,
	Sparkles,
	Terminal,
	Users
} from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useMemo, useState } from 'react'
import PositionCard from '@/components/Team/position-card'
import TerminalButton from '@/components/terminal-button'
import { useTranslations } from '@/i18n/react'
import {
	DISCORD_URL,
	filterPositions,
	type PositionTeam,
	positions,
	positionTeams
} from '@/lib/positions'

const filterChipClass =
	'inline-flex items-center px-2.5 py-1 font-mono text-sm border transition-colors duration-200'
const activeFilterClass =
	'border-transparent bg-terminal-cyan text-terminal-onAccent [:root[data-theme=light]_&]:bg-black [:root[data-theme=light]_&]:text-white'
const inactiveFilterClass =
	'border-terminal-text/30 text-terminal-text/85 hover:border-terminal-cyan hover:text-terminal-ink [:root[data-theme=light]_&]:hover:border-black [:root[data-theme=light]_&]:hover:text-black'

const whyItems = [
	{ key: 'learn', Icon: Rocket },
	{ key: 'team', Icon: Users },
	{ key: 'network', Icon: Network },
	{ key: 'impact', Icon: Sparkles },
	{ key: 'volunteer', Icon: BadgeCheck }
] as const

const usedTeams = positionTeams.filter((team) =>
	positions.some((position) => position.team === team)
)

const PositionsPage = () => {
	const t = useTranslations('Team')
	const [activeTeam, setActiveTeam] = useState<PositionTeam | null>(null)

	const filtered = useMemo(
		() => filterPositions(positions, { team: activeTeam }),
		[activeTeam]
	)

	return (
		<div className="relative">
			<div
				aria-hidden="true"
				className="pointer-events-none absolute -top-[var(--navbar-height,4.5rem)] left-1/2 -z-10 h-[44rem] w-screen -translate-x-1/2 overflow-hidden"
			>
				<img
					src="/assets/ersti-tag.webp"
					alt=""
					className="h-full w-full object-cover opacity-60 [:root[data-theme=light]_&]:opacity-40"
				/>
				<div className="absolute inset-0 bg-gradient-to-t from-terminal-bg via-terminal-bg/60 to-terminal-bg/10" />
				<div className="absolute inset-0 bg-gradient-to-r from-terminal-bg/70 via-terminal-bg/20 to-transparent" />
			</div>
			<div
				aria-hidden="true"
				className="pointer-events-none absolute -top-[var(--navbar-height,4.5rem)] left-1/2 -z-10 h-[100vh] w-screen -translate-x-1/2"
				style={{
					backgroundImage:
						'radial-gradient(ellipse 60% 70% at 100% 0%, var(--backdrop-glow-a), transparent 70%)'
				}}
			/>
			{/* Header Section */}
			<div className="max-w-6xl mx-auto pt-8 mb-12 md:pt-16 md:mb-16 lg:grid lg:grid-cols-[minmax(0,1fr)_24rem] lg:items-center lg:gap-12">
				<motion.div
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
					className="mb-12 w-fit max-w-full lg:mb-0"
				>
					<h1 className="mb-6 mt-0 font-mono text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl xl:text-7xl">
						{t('title')}
					</h1>
					<motion.p
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 0.6, delay: 0.2 }}
						className="mt-3 w-0 min-w-full text-lg text-terminal-text/90"
					>
						{t('subtitle')}
					</motion.p>
				</motion.div>
				{/* Why join */}
				<div>
					<div className="relative bg-terminal-window border border-terminal-window-border overflow-hidden">
						<div className="absolute inset-0 bg-gradient-to-br from-terminal-cyan/3 via-transparent to-terminal-cyan/3 pointer-events-none" />
						<div className="relative z-10 p-5 sm:p-8">
							<h2 className="text-sm font-semibold mb-5 mt-0 text-terminal-ink uppercase tracking-wider">
								{t('why.title')}
							</h2>
							<ol className="m-0 grid list-none grid-cols-1 gap-x-8 gap-y-5 p-0 sm:grid-cols-2 lg:grid-cols-1">
								{whyItems.map(({ key, Icon }, idx) => (
									<motion.li
										key={key}
										initial={{ opacity: 0, y: 10 }}
										whileInView={{ opacity: 1, y: 0 }}
										transition={{ duration: 0.4, delay: idx * 0.06 }}
										viewport={{ once: true }}
										className="flex gap-3"
									>
										<Icon
											size={20}
											aria-hidden="true"
											className="mt-0.5 shrink-0 text-terminal-ink"
										/>
										<div>
											<h3 className="font-mono text-base font-bold text-terminal-text m-0">
												{t(`why.${key}.title`)}
											</h3>
											<p className="text-sm text-terminal-text/80 leading-relaxed mt-1 mb-0">
												{t(`why.${key}.description`)}
											</p>
										</div>
									</motion.li>
								))}
							</ol>
						</div>
					</div>
				</div>
			</div>

			{/* Filter Section */}
			<div className="max-w-6xl mx-auto mb-12 md:mb-16">
				<div className="flex items-center gap-3 mb-4">
					<Filter size={20} className="text-terminal-ink" />
					<span className="text-terminal-text/90 font-mono">
						{t('filter.teamLabel')}
					</span>
				</div>
				<div className="flex flex-wrap gap-x-3 gap-y-4">
					<button
						type="button"
						className={`${filterChipClass} ${!activeTeam ? activeFilterClass : inactiveFilterClass}`}
						onClick={() => setActiveTeam(null)}
					>
						{t('filter.allTeams')}
					</button>
					{usedTeams.map((team) => (
						<button
							type="button"
							key={team}
							className={`${filterChipClass} ${activeTeam === team ? activeFilterClass : inactiveFilterClass}`}
							onClick={() => setActiveTeam(team)}
						>
							{t(`teams.${team}`)}
						</button>
					))}
				</div>
				<p className="mt-6 mb-0 font-mono text-sm text-terminal-text/80">
					{t('positionsFound', { count: filtered.length })}
				</p>
			</div>

			{/* Positions Grid */}
			<div className="max-w-6xl mx-auto">
				<AnimatePresence>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
						{filtered.map((position) => (
							<motion.div
								key={position.id}
								initial={{ opacity: 0, scale: 0.98 }}
								animate={{ opacity: 1, scale: 1 }}
								exit={{ opacity: 0, scale: 0.98 }}
								transition={{ duration: 0.18 }}
							>
								<PositionCard position={position} />
							</motion.div>
						))}
					</div>
				</AnimatePresence>

				{/* Empty State */}
				{filtered.length === 0 && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						className="relative bg-terminal-window border border-terminal-window-border overflow-hidden"
					>
						<div className="p-5 sm:p-8 font-mono">
							<div className="flex items-center gap-2 text-terminal-ink mb-3">
								<Terminal size={18} />
								<span className="font-bold">{t('empty.title')}</span>
							</div>
							<p className="text-terminal-text/80 mb-6">
								{t('empty.description')}
							</p>
							<TerminalButton
								href={DISCORD_URL}
								target="_blank"
								rel="noreferrer noopener"
							>
								{t('empty.cta')}
							</TerminalButton>
						</div>
					</motion.div>
				)}
			</div>

			{/* Join anytime / spontaneous application */}
			<motion.div
				initial={{ opacity: 0 }}
				whileInView={{ opacity: 1 }}
				transition={{ duration: 0.6 }}
				viewport={{ once: true }}
				className="max-w-6xl mx-auto mt-12 md:mt-16 p-8 md:p-12 border border-dashed border-terminal-text/30 bg-transparent"
			>
				<div className="text-center">
					<h2 className="font-mono text-2xl font-bold mb-4 mt-0">
						{t('spontaneous.title')}
					</h2>
					<p className="text-terminal-text/90 max-w-2xl mx-auto mb-6">
						{t('spontaneous.description')}
					</p>
					<div className="flex flex-col sm:flex-row items-center justify-center gap-3">
						<TerminalButton primary href="/#membership">
							{t('spontaneous.ctaMembership')}
						</TerminalButton>
						<TerminalButton
							href={DISCORD_URL}
							target="_blank"
							rel="noreferrer noopener"
						>
							{t('spontaneous.cta')}
						</TerminalButton>
					</div>
				</div>
			</motion.div>
		</div>
	)
}

export default PositionsPage
