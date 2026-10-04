'use client'
import { Lightbulb, Rocket, Users } from 'lucide-react'
import { motion } from 'motion/react'
import type React from 'react'
import TerminalSection from '@/components/Layout/terminal-section'
import { useTranslations } from '@/i18n/react'

const AboutUsSection: React.FC = () => {
	const t = useTranslations('Home.aboutUsSection')

	const features = [
		{
			icon: <Rocket className="h-6 w-6 text-terminal-cyan" />,
			title: t('container.features.projectsCompetitions.title'),
			desc: t('container.features.projectsCompetitions.description')
		},
		{
			icon: <Lightbulb className="h-6 w-6 text-terminal-cyan" />,
			title: t('container.features.eventsKnowledge.title'),
			desc: t('container.features.eventsKnowledge.description')
		},
		{
			icon: <Users className="h-6 w-6 text-terminal-cyan" />,
			title: t('container.features.communityNetworking.title'),
			desc: t('container.features.communityNetworking.description')
		}
	]

	return (
		<TerminalSection title={t('title')} headingLevel={2}>
			{/* Unified container */}
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				whileInView={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6 }}
				viewport={{ once: true }}
				className="relative bg-terminal-card border border-terminal-cyan/60 rounded-md overflow-hidden"
			>
				{/* Main intro section */}
				<div className="p-6 border-b border-terminal-window-border relative z-10">
					<h3 className="text-xl font-bold font-mono text-terminal-text mb-3">
						{t('container.title')}
					</h3>
					<p className="text-terminal-text/90 leading-relaxed m-0">
						{t('container.subtitle')}
					</p>
				</div>

				{/* Feature cards section */}
				<div className="relative z-10">
					<div className="grid grid-cols-1 md:grid-cols-3">
						{features.map((feature, idx) => (
							<motion.div
								key={feature.title}
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.5, delay: idx * 0.1 }}
								viewport={{ once: true }}
								className={`relative p-6 flex flex-col h-full group ${idx < features.length - 1 ? 'border-r border-terminal-window-border' : ''}`}
							>
								<div className="relative z-10">
									<div className="flex items-center gap-3 mb-3">
										<div className="shrink-0">{feature.icon}</div>
										<p className="m-0 text-lg font-bold font-mono text-terminal-text">
											{feature.title}
										</p>
									</div>
									<p className="m-0 text-sm leading-relaxed text-terminal-text/85">
										{feature.desc}
									</p>
								</div>
							</motion.div>
						))}
					</div>
				</div>
			</motion.div>
		</TerminalSection>
	)
}

export default AboutUsSection
