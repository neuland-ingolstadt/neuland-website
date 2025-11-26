'use client'
import { motion } from 'framer-motion'
import { Lightbulb, Rocket, Users } from 'lucide-react'
import type React from 'react'
import TerminalSection from '@/components/Layout/terminal-section'

const AboutUsSection: React.FC = () => {
	const features = [
		{
			icon: <Rocket className="h-6 w-6 text-terminal-cyan" />,
			title: 'Projekte & Wettbewerbe',
			desc: 'Wir entwickeln innovative Projekte, nehmen an Wettbewerben teil und fördern Kreativität.'
		},
		{
			icon: <Lightbulb className="h-6 w-6 text-terminal-cyan" />,
			title: 'Veranstaltungen & Wissen',
			desc: 'Wir organisieren Events rund um Informatik und Technik – offen für alle Fakultäten und Studiengänge.'
		},
		{
			icon: <Users className="h-6 w-6 text-terminal-cyan" />,
			title: 'Community & Networking',
			desc: 'Lerne neue Leute kennen, vernetze dich und werde Teil einer aktiven, hilfsbereiten Studierenden-Community.'
		}
	]

	return (
		<TerminalSection title="Über uns" headingLevel={2}>
			{/* Unified container */}
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				whileInView={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6 }}
				viewport={{ once: true }}
				className="relative bg-terminal-window border border-terminal-window-border overflow-hidden"
			>
				{/* Corner accent brackets */}
				<div className="absolute top-0 left-0 w-12 h-12">
					<div className="absolute top-0 left-0 w-6 h-px bg-terminal-cyan/30" />
					<div className="absolute top-0 left-0 w-px h-6 bg-terminal-cyan/30" />
				</div>
				<div className="absolute top-0 right-0 w-12 h-12">
					<div className="absolute top-0 right-0 w-6 h-px bg-terminal-cyan/30" />
					<div className="absolute top-0 right-0 w-px h-6 bg-terminal-cyan/30" />
				</div>
				<div className="absolute bottom-0 left-0 w-12 h-12">
					<div className="absolute bottom-0 left-0 w-6 h-px bg-terminal-cyan/30" />
					<div className="absolute bottom-0 left-0 w-px h-6 bg-terminal-cyan/30" />
				</div>
				<div className="absolute bottom-0 right-0 w-12 h-12">
					<div className="absolute bottom-0 right-0 w-6 h-px bg-terminal-cyan/30" />
					<div className="absolute bottom-0 right-0 w-px h-6 bg-terminal-cyan/30" />
				</div>

				{/* Subtle inner glow */}
				<div className="absolute inset-0 bg-gradient-to-b from-terminal-cyan/3 via-transparent to-transparent pointer-events-none" />

				{/* Main intro section */}
				<div className="p-6 border-b border-terminal-window-border relative z-10">
					<h3 className="text-xl font-semibold text-terminal-text mb-3">
						Gemeinschaft & Plattform
					</h3>
					<p className="text-terminal-text/90 leading-relaxed m-0">
						Wir bieten Studierenden eine Plattform zum Austausch, zur
						Projektarbeit und zur Wissensvermittlung .
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
								className={`relative p-6 flex flex-col h-full group transition-all duration-200 ${idx < features.length - 1 ? 'border-r border-terminal-window-border' : ''}`}
							>
								{/* Hover background accent, similar to NextAppShowcase feature items */}
								<div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-terminal-cyan/3 via-terminal-cyan/1 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

								{/* Top-left corner accessory */}
								<div className="pointer-events-none absolute top-0 left-0 w-8 h-8 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
									<div className="absolute top-0 left-0 w-4 h-px bg-terminal-cyan/40" />
									<div className="absolute top-0 left-0 w-px h-4 bg-terminal-cyan/40" />
								</div>

								<div className="relative z-10">
									<div className="flex items-center gap-3 mb-3">
										<div className="shrink-0">{feature.icon}</div>
										<p className="m-0 text-lg font-semibold text-terminal-text">
											{feature.title}
										</p>
									</div>
									<p className="m-0 text-sm leading-relaxed text-terminal-text/70">
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
