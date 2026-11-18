import {
	BadgeCheck,
	ChevronDown,
	Filter,
	Network,
	Rocket,
	Sparkles,
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

const faqKeys = ['cost', 'thi', 'experience', 'time', 'joining'] as const

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
				className="pointer-events-none absolute -top-[var(--navbar-height,4.5rem)] left-1/2 -z-10 h-[56rem] w-screen -translate-x-1/2 overflow-hidden"
			>
				<img
					src="/assets/ersti-tag.webp"
					alt=""
					className="h-full w-full object-cover opacity-60 [:root[data-theme=light]_&]:opacity-40"
				/>
				<div className="absolute inset-0 bg-gradient-to-t from-terminal-bg from-0% via-terminal-bg/70 via-70% to-terminal-bg/10" />
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
			<div className="max-w-6xl mx-auto pt-16 mb-16 md:pt-32 md:mb-24">
				<motion.div
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
					className="mb-16 max-w-full md:mb-24"
				>
					<h1 className="mb-8 mt-0 font-mono text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl md:text-7xl xl:text-8xl">
						{t('title')}
					</h1>
					<motion.p
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 0.6, delay: 0.2 }}
						className="mt-3 max-w-[40rem] text-lg text-terminal-text/90 md:text-xl"
					>
						{t('subtitle')}
					</motion.p>
				</motion.div>
				{/* Why join */}
				<div>
					<ol className="m-0 grid list-none grid-cols-1 gap-x-8 gap-y-5 p-0 sm:grid-cols-2 lg:grid-cols-5">
						{whyItems.map(({ key, Icon }, idx) => (
							<motion.li
								key={key}
								initial={{ opacity: 0, y: 10 }}
								whileInView={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.4, delay: idx * 0.06 }}
								viewport={{ once: true }}
								className="m-0 flex gap-3 sm:flex-col sm:gap-2"
							>
								<Icon
									size={20}
									aria-hidden="true"
									className="shrink-0 text-terminal-ink"
								/>
								<div className="flex flex-col gap-1 sm:gap-2">
									<h3 className="m-0 font-mono text-base font-bold text-terminal-text">
										{t(`why.${key}.title`)}
									</h3>
									<p className="m-0 text-sm leading-relaxed text-terminal-text/80">
										{t(`why.${key}.description`)}
									</p>
								</div>
							</motion.li>
						))}
					</ol>
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
						{/* Filler card: join without a specific position */}
						<div className="relative flex h-full flex-col border border-dashed border-terminal-text/30 bg-terminal-text/[0.06] p-5">
							<h2 className="m-0 font-mono text-xl font-bold text-terminal-text">
								{t('spontaneous.title')}
							</h2>
							<p className="mb-6 mt-3 grow text-base leading-relaxed text-terminal-text/70">
								{t('spontaneous.description')}
							</p>
							<div className="flex flex-col gap-3">
								<TerminalButton
									primary
									href={DISCORD_URL}
									target="_blank"
									rel="noreferrer noopener"
								>
									{t('spontaneous.cta')}
								</TerminalButton>
							</div>
						</div>
					</div>
				</AnimatePresence>
			</div>

			{/* FAQ */}
			<div className="max-w-3xl mx-auto mt-20 mb-12 md:mt-32 md:mb-20">
				<h2 className="font-mono text-2xl font-bold mb-6 mt-0 text-center">
					{t('faq.title')}
				</h2>
				<div className="divide-y divide-terminal-window-border border border-terminal-window-border">
					{faqKeys.map((key) => (
						<details key={key} className="group">
							<summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 font-mono text-base font-bold text-terminal-text marker:hidden [&::-webkit-details-marker]:hidden sm:px-8">
								{t(`faq.items.${key}.q`)}
								<ChevronDown
									size={18}
									aria-hidden="true"
									className="shrink-0 text-terminal-ink transition-transform duration-200 group-open:rotate-180"
								/>
							</summary>
							<p className="m-0 px-5 pb-5 text-terminal-text/80 leading-relaxed sm:px-8 sm:pb-6">
								{t(`faq.items.${key}.a`)}
							</p>
						</details>
					))}
				</div>
			</div>
		</div>
	)
}

export default PositionsPage
