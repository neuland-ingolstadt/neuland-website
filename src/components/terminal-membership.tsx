'use client'
import { Code, Rocket, UserPlus, Users } from 'lucide-react'
import { motion } from 'motion/react'
import { useTranslations } from '@/i18n/react'
import DiscordIcon from './discord-icon'
import NoiseOverlay from './noise-overlay'
import TerminalButton from './terminal-button'

// Eased vertical fade so the band blends in without a visible edge
const FADE_MASK =
	'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.03) 8%, rgba(0,0,0,0.12) 16%, rgba(0,0,0,0.3) 24%, rgba(0,0,0,0.55) 32%, rgba(0,0,0,0.8) 40%, black 48%, black 52%, rgba(0,0,0,0.8) 60%, rgba(0,0,0,0.55) 68%, rgba(0,0,0,0.3) 76%, rgba(0,0,0,0.12) 84%, rgba(0,0,0,0.03) 92%, transparent 100%)'

const TerminalMembership = () => {
	const t = useTranslations('Home.membershipSection')

	const benefitCards = [
		{
			icon: <Users size={22} />,
			text: t('benefits.line1'),
			style: '-rotate-[1.5deg] hover:-rotate-2'
		},
		{
			icon: <Code size={22} />,
			text: t('benefits.line2'),
			style: 'rotate-1 hover:rotate-[1.5deg]'
		},
		{
			icon: <Rocket size={22} />,
			text: t('benefits.line3'),
			style: '-rotate-1 hover:-rotate-[1.5deg]'
		}
	]

	return (
		<section
			id="membership"
			className="relative isolate mb-32 md:mb-40 text-terminal-text"
		>
			{/* Light mode: no photo, a white band that fades out softly */}
			<div
				aria-hidden="true"
				className="pointer-events-none absolute -bottom-40 -top-40 left-1/2 -z-20 hidden w-screen -translate-x-1/2 bg-white [:root[data-theme=light]_&]:block"
				style={{
					maskImage: FADE_MASK,
					WebkitMaskImage: FADE_MASK
				}}
			/>
			{/* Film grain with the same soft fade */}
			<div
				aria-hidden="true"
				className="pointer-events-none absolute -bottom-40 -top-40 left-1/2 -z-10 w-screen -translate-x-1/2"
				style={{
					maskImage: FADE_MASK,
					WebkitMaskImage: FADE_MASK
				}}
			>
				<NoiseOverlay opacity={0.12} />
			</div>
			<div className="mx-auto flex max-w-3xl flex-col items-center px-6 py-10 text-center sm:px-8 lg:py-14">
				<motion.h2
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5 }}
					viewport={{ once: true }}
					className="mb-8 font-mono text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl"
				>
					<span className="marker">{t('title')}</span>
				</motion.h2>

				{/* Price note, stuck to the corner like the sticky note in the events terminal */}
				<motion.div
					initial={{ opacity: 0, scale: 0.9 }}
					whileInView={{ opacity: 1, scale: 1 }}
					transition={{ duration: 0.4, delay: 0.2 }}
					viewport={{ once: true }}
					className="relative mb-10 w-44 rotate-3 overflow-hidden rounded-sm bg-terminal-paper px-4 pb-4 pt-6 text-terminal-paper-text shadow-md lg:absolute lg:right-8 lg:top-8 lg:mb-0 lg:rotate-6"
				>
					<div className="absolute -bottom-4 -right-4 h-12 w-12 rotate-45 bg-terminal-paper-text/5 shadow-inner" />
					<div className="absolute left-1/2 top-0 h-3 w-10 -translate-x-1/2 bg-terminal-paper-text/10" />
					<div className="font-script relative flex flex-col gap-3 text-center leading-tight">
						<div>
							<div className="text-lg">{t('pricing.students')}</div>
							<div className="text-2xl font-bold">
								10€ / {t('pricing.year')}
							</div>
						</div>
						<div>
							<div className="text-lg">{t('pricing.externals')}</div>
							<div className="text-2xl font-bold">
								20€ / {t('pricing.year')}
							</div>
						</div>
					</div>
				</motion.div>

				{/* Benefits */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5, delay: 0.1 }}
					viewport={{ once: true }}
					className="mb-10 w-full"
				>
					<div className="flex flex-col items-center gap-8">
						{benefitCards.map((card) => (
							<div
								key={card.text}
								className={`relative flex w-fit max-w-full cursor-default items-center gap-4 rounded-md border border-terminal-window-border bg-terminal-window px-5 py-4 text-left text-terminal-text shadow-[0_10px_24px_rgba(0,0,0,0.35)] [:root[data-theme=light]_&]:shadow-[0_10px_24px_rgba(0,0,0,0.12)] transition-transform duration-300 ease-out hover:scale-105 ${card.style}`}
							>
								<span className="shrink-0 text-terminal-ink">{card.icon}</span>
								<p className="mb-0 text-base leading-relaxed">{card.text}</p>
							</div>
						))}
					</div>
				</motion.div>

				{/* Actions */}
				<div className="flex w-fit flex-col items-start">
					<div className="flex flex-wrap justify-center gap-3">
						<TerminalButton
							href="https://discord.gg/gsxgQqvVue"
							target="_blank"
							rel="noreferrer noopener"
							className="shrink-0 whitespace-nowrap !px-6 !py-3 !border-terminal-cyan !bg-terminal-cyan !text-terminal-onAccent hover:!bg-terminal-cyan/80 [:root[data-theme=light]_&]:!border-black [:root[data-theme=light]_&]:!bg-black [:root[data-theme=light]_&]:!text-white [:root[data-theme=light]_&]:hover:!border-neutral-700 [:root[data-theme=light]_&]:hover:!bg-neutral-700 [:root[data-theme=light]_&]:hover:!text-white"
						>
							<DiscordIcon
								size={16}
								className="mr-2 group-hover:rotate-8 transition-transform duration-300"
							/>
							{t('benefits.writeEmail')}
						</TerminalButton>
						<TerminalButton
							href="https://join.neuland-ingolstadt.de/"
							target="_blank"
							rel="noreferrer noopener"
							className="whitespace-nowrap !px-6 !py-3 !border-terminal-cyan !text-terminal-ink hover:!bg-terminal-cyan [:root[data-theme=light]_&]:!border-black [:root[data-theme=light]_&]:!text-black [:root[data-theme=light]_&]:hover:!bg-black [:root[data-theme=light]_&]:hover:!text-white hover:!text-terminal-onAccent"
						>
							<UserPlus
								size={16}
								className="mr-2 group-hover:rotate-8 transition-transform duration-300"
							/>
							{t('benefits.becomeMember')}
						</TerminalButton>
					</div>
					<div className="ml-8 mt-1 flex items-end gap-1">
						<svg
							aria-hidden="true"
							viewBox="0 0 50 50"
							fill="none"
							stroke="currentColor"
							strokeWidth="2.5"
							strokeLinecap="round"
							strokeLinejoin="round"
							className="h-12 w-12 shrink-0 text-terminal-ink"
						>
							<path d="M46 42 Q 12 42 12 8" />
							<path d="M12 8 L 5 17" />
							<path d="M12 8 L 19 17" />
						</svg>
						<span className="font-script -rotate-3 pb-1 text-lg leading-tight">
							{t('benefits.discordHint')}
						</span>
					</div>
				</div>
			</div>
		</section>
	)
}

export default TerminalMembership
