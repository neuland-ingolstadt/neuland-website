'use client'
import { Lightbulb, Rocket, Users } from 'lucide-react'
import { animate, motion, useInView } from 'motion/react'
import type React from 'react'
import { useEffect, useRef, useState } from 'react'
import { useLocale, useTranslations } from '@/i18n/react'

// Numbers from the Outline semester review ("Rückblick Sommersemester 2026")
// and the member count. Update these when a new semester review is published.
const STATS = {
	members: 180,
	eventsLastSemester: 32,
	linesOfCode: 160000
}

const CountUp: React.FC<{ to: number }> = ({ to }) => {
	const locale = useLocale()
	const ref = useRef<HTMLSpanElement>(null)
	const inView = useInView(ref, { once: true, margin: '-80px' })
	const [value, setValue] = useState(0)

	useEffect(() => {
		if (!inView) return
		const controls = animate(0, to, {
			duration: 1.4,
			ease: 'easeOut',
			onUpdate: (latest) => setValue(Math.round(latest))
		})
		return () => controls.stop()
	}, [inView, to])

	return (
		<span ref={ref} className="tabular-nums">
			{value.toLocaleString(locale)}
		</span>
	)
}

const AboutUsSection: React.FC = () => {
	const t = useTranslations('Home.aboutUsSection')

	const features = [
		{
			icon: <Rocket className="h-6 w-6 shrink-0 text-terminal-ink" />,
			title: t('container.features.projectsCompetitions.title'),
			desc: t('container.features.projectsCompetitions.description')
		},
		{
			icon: <Lightbulb className="h-6 w-6 shrink-0 text-terminal-ink" />,
			title: t('container.features.eventsKnowledge.title'),
			desc: t('container.features.eventsKnowledge.description')
		},
		{
			icon: <Users className="h-6 w-6 shrink-0 text-terminal-ink" />,
			title: t('container.features.communityNetworking.title'),
			desc: t('container.features.communityNetworking.description')
		}
	]

	const stats = [
		{
			value: STATS.members,
			label: t('stats.members.label'),
			highlight: true
		},
		{
			prefix: '>',
			value: STATS.eventsLastSemester,
			label: t('stats.events.label')
		},
		{
			prefix: '>',
			value: STATS.linesOfCode,
			label: t('stats.linesOfCode.label')
		}
	]

	return (
		<section className="mb-32 md:mb-40">
			<div className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
				{/* Big heading on the left, stays in view while the content scrolls */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
					viewport={{ once: true }}
					className="lg:sticky lg:top-32 lg:self-start"
				>
					<h2 className="mb-6 mt-0 font-mono text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl xl:text-7xl">
						{t('heading')}
					</h2>
					<p className="m-0 max-w-md text-lg leading-relaxed text-terminal-text/80">
						{t('container.subtitle')}
					</p>
				</motion.div>

				<div className="flex flex-col gap-10">
					{/* Key figures */}
					<div className="grid grid-cols-1 border border-terminal-window-border bg-terminal-window sm:grid-cols-3">
						{stats.map((stat, idx) => (
							<motion.div
								key={stat.label}
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.5, delay: 0.1 + idx * 0.1 }}
								viewport={{ once: true }}
								className={`@container flex min-w-0 flex-col gap-3 p-6 ${idx > 0 ? 'border-t border-terminal-window-border sm:border-l sm:border-t-0' : ''}`}
							>
								<div className="flex items-baseline gap-1 font-mono text-[clamp(1.75rem,15cqw,3.75rem)] font-bold leading-none tracking-tight">
									{stat.prefix && (
										<span className="text-lg font-normal text-terminal-text/70">
											{stat.prefix}
										</span>
									)}
									<span className={stat.highlight ? 'marker' : undefined}>
										<CountUp to={stat.value} />
									</span>
								</div>
								<p className="m-0 text-base leading-snug text-terminal-text/70">
									{stat.label}
								</p>
							</motion.div>
						))}
					</div>

					{/* What we do */}
					<div className="flex flex-col gap-4">
						{features.map((feature, idx) => (
							<motion.div
								key={feature.title}
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.5, delay: idx * 0.1 }}
								viewport={{ once: true }}
								className="relative flex gap-4 overflow-hidden border border-terminal-windowTitle bg-terminal-window p-6"
							>
								<div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-terminal-cyan/3 via-transparent to-terminal-cyan/3" />
								<div className="relative z-10 flex gap-4">
									{feature.icon}
									<div>
										<p className="mb-1 font-mono text-lg font-bold text-terminal-text">
											{feature.title}
										</p>
										<p className="m-0 text-base leading-relaxed text-terminal-text/70">
											{feature.desc}
										</p>
									</div>
								</div>
							</motion.div>
						))}
					</div>
				</div>
			</div>
		</section>
	)
}

export default AboutUsSection
