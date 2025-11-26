'use client'
import { motion } from 'framer-motion'
import { Mail, UserPlus, Zap } from 'lucide-react'
import TerminalButton from './terminal-button'

const TerminalMembership = () => {
	return (
		<div className="my-10 w-full">
			<div className="relative bg-terminal-window border border-terminal-window-border overflow-hidden">
				{/* Creative accent - top border highlight */}
				<div className="absolute top-0 left-0 right-0 h-px bg-terminal-cyan/40" />

				{/* Subtle inner glow with radial effect */}
				<div className="absolute inset-0 bg-gradient-to-br from-terminal-cyan/4 via-transparent to-terminal-cyan/2 pointer-events-none" />

				<div className="flex flex-col lg:flex-row relative z-10">
					{/* Pricing Section */}
					<motion.div
						initial={{ opacity: 0, x: -20 }}
						whileInView={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.5 }}
						viewport={{ once: true }}
						className="lg:w-2/5 p-6 border-b lg:border-b-0 lg:border-r border-terminal-window-border"
					>
						<div className="text-terminal-text/60 mb-4 font-mono text-sm">
							$ cat membership-fees.txt
						</div>
						<div className="flex flex-col gap-5">
							<div className="flex items-center justify-between">
								<span className="text-terminal-highlight font-medium">
									Studierende:
								</span>
								<span className="text-terminal-text ml-2 font-bold font-mono text-lg">
									5€ / Jahr
								</span>
							</div>
							<div className="flex items-center justify-between">
								<span className="text-terminal-highlight font-medium">
									Externe:
								</span>
								<span className="text-terminal-text ml-2 font-bold font-mono text-lg">
									20€ / Jahr
								</span>
							</div>
						</div>
					</motion.div>

					{/* Benefits Section */}
					<motion.div
						initial={{ opacity: 0, x: 20 }}
						whileInView={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.5, delay: 0.1 }}
						viewport={{ once: true }}
						className="md:w-3/5 p-6 space-y-5"
					>
						<h4 className="text-xl font-semibold flex items-center">
							<Zap size={18} className="text-terminal-cyan mr-2" />
							Deine Vorteile:
						</h4>

						<div className="space-y-3">
							<div className="flex items-start group">
								<span className="text-terminal-cyan mr-3 text-xl group-hover:scale-110 transition-transform duration-300 shrink-0 mt-0.5">
									•
								</span>
								<p className="text-terminal-text/70 group-hover:text-terminal-text transition-colors duration-300 mb-0">
									Teil eines aktiven studentischen Vereins mit regelmäßigen
									Treffen und Austausch
								</p>
							</div>
							<div className="flex items-start group">
								<span className="text-terminal-cyan mr-3 text-xl group-hover:scale-110 transition-transform duration-300 shrink-0 mt-0.5">
									•
								</span>
								<p className="text-terminal-text/70 group-hover:text-terminal-text transition-colors duration-300 mb-0">
									Gemeinsame Arbeit an Open-Source Projekten
								</p>
							</div>
							<div className="flex items-start group">
								<span className="text-terminal-cyan mr-3 text-xl group-hover:scale-110 transition-transform duration-300 shrink-0 mt-0.5">
									•
								</span>
								<p className="text-terminal-text/70 group-hover:text-terminal-text transition-colors duration-300 mb-0">
									Exklusive Workshops, Hackathons und soziale Events mit
									Gleichgesinnten
								</p>
							</div>
						</div>

						<div className="pt-2 flex flex-wrap gap-3">
							<TerminalButton
								href="https://join.neuland-ingolstadt.de/"
								dark
								target="_blank"
								rel="noreferrer noopener"
							>
								<UserPlus
									size={16}
									className="mr-2 group-hover:rotate-8 transition-transform duration-300"
								/>
								Mitglied werden
							</TerminalButton>
							<TerminalButton
								href="mailto:info@neuland-ingolstadt.de?subject=Frage%20zur%20Mitgliedschaft"
								dark
							>
								<Mail
									size={16}
									className="mr-2 group-hover:rotate-8 transition-transform duration-300"
								/>
								E-Mail schreiben
							</TerminalButton>
						</div>
					</motion.div>
				</div>
			</div>
		</div>
	)
}

export default TerminalMembership
