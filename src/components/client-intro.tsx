import { motion, useScroll, useTransform } from 'motion/react'
import NoiseOverlay from '@/components/noise-overlay'
import SponsorsStrip from '@/components/sponsors-strip'
import TerminalButton from '@/components/terminal-button'
import TypewriterText from '@/components/typewriter-text'
import { useTranslations } from '@/i18n/react'

export default function ClientIntro() {
	const t = useTranslations('Home.clientIntro')
	const { scrollY } = useScroll()
	const bgY = useTransform(scrollY, [0, 1000], [0, 450])

	return (
		<div className="relative mb-32 flex min-h-[calc(100svh-var(--navbar-height,4.5rem))] items-center justify-center pb-40 pt-16 text-center md:mb-40">
			<div
				aria-hidden="true"
				className="pointer-events-none absolute -top-[var(--navbar-height,4.5rem)] bottom-0 left-1/2 w-screen -translate-x-1/2"
				style={{
					backgroundImage:
						'radial-gradient(ellipse 45% 55% at 18% 35%, var(--backdrop-glow-a), transparent 70%), radial-gradient(ellipse 40% 50% at 82% 65%, var(--backdrop-glow-b), transparent 70%), radial-gradient(var(--backdrop-dot) 1px, transparent 1px), linear-gradient(180deg, var(--terminal-bg) 60%, var(--backdrop-end) 100%)',
					backgroundSize: 'auto, auto, 24px 24px, auto',
					maskImage: 'linear-gradient(to bottom, black 55%, transparent 100%)',
					WebkitMaskImage:
						'linear-gradient(to bottom, black 55%, transparent 100%)'
				}}
			>
				<div className="absolute inset-0 overflow-hidden">
					<motion.div
						className="absolute inset-x-0 -top-1/2 bottom-0 bg-cover bg-center grayscale"
						style={{
							backgroundImage: "url('/assets/hero-bg.jpg')",
							y: bgY,
							opacity: 'var(--backdrop-photo-opacity)'
						}}
					/>
				</div>
				<NoiseOverlay />
			</div>
			<div className="relative z-10 mx-auto max-w-5xl">
				<p className="font-script marker mb-4 inline-block -rotate-1 text-2xl text-terminal-ink">
					{t('greeting')}
				</p>
				<TypewriterText
					text={t('typewriter')}
					className="font-mono text-3xl font-bold leading-tight tracking-tight hyphens-none sm:text-5xl lg:text-6xl xl:text-7xl"
					delay={25}
					preventLayoutJumps={true}
				/>
				<div className="mt-10 flex flex-wrap items-center justify-center gap-4">
					<TerminalButton href="/#membership" primary>
						{t('primaryCta')}
					</TerminalButton>
					<TerminalButton href="/projects">{t('secondaryCta')}</TerminalButton>
				</div>
			</div>
			<div className="absolute inset-x-0 bottom-[14%] z-10 px-6">
				<SponsorsStrip />
			</div>
		</div>
	)
}
