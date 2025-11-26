'use client'
import { motion } from 'framer-motion'
import { Mail, Zap } from 'lucide-react'
import TerminalButton from './TerminalButton'

const TerminalPartners: React.FC = () => {
	// Check if current date is >= December 1st, 2025
	const showPartners = new Date() >= new Date('2025-11-01')

	return (
		<div className="my-10 w-full">
			<div className="relative bg-[#0b0b0b] border border-neutral-800 overflow-hidden">
				{/* Creative accent - top border highlight */}
				<div className="absolute top-0 left-0 right-0 h-px bg-terminal-cyan/40" />

				{/* Subtle inner glow */}
				<div className="absolute inset-0 bg-gradient-to-b from-terminal-cyan/3 via-transparent to-transparent pointer-events-none" />

				<div className="flex flex-col lg:flex-row relative z-10">
					{/* Left Side - Text Content */}
					<div
						className={`${showPartners ? 'lg:w-3/5' : 'w-full'} flex flex-col md:flex-row border-b lg:border-b-0 ${showPartners ? 'lg:border-r' : ''} border-neutral-800`}
					>
						{/* Info Section */}
						<motion.div
							initial={{ opacity: 0, x: -20 }}
							whileInView={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.5 }}
							viewport={{ once: true }}
							className="md:w-2/5 p-6 border-b md:border-b-0 md:border-r border-neutral-800"
						>
							<div className="text-terminal-text/60 mb-4 font-mono text-sm">
								$ cat sponsoring-info.txt
							</div>
							<div className="text-terminal-text">
								<p className="font-medium">
									Jetzt Partner werden und unseren Verein unterstützen!
								</p>
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
								Ihre Vorteile:
							</h4>

							<div className="space-y-3">
								<div className="flex items-start group">
									<span className="text-terminal-cyan mr-3 text-xl group-hover:scale-110 transition-transform duration-300 shrink-0 mt-0.5">
										•
									</span>
									<p className="text-gray-400 group-hover:text-terminal-text transition-colors duration-300 mb-0">
										Direkter Zugang zu technikaffinen Studierenden
									</p>
								</div>
								<div className="flex items-start group">
									<span className="text-terminal-cyan mr-3 text-xl group-hover:scale-110 transition-transform duration-300 shrink-0 mt-0.5">
										•
									</span>
									<p className="text-gray-400 group-hover:text-terminal-text transition-colors duration-300 mb-0">
										Sichtbarkeit bei Events und auf unseren digitalen
										Plattformen
									</p>
								</div>
								<div className="flex items-start group">
									<span className="text-terminal-cyan mr-3 text-xl group-hover:scale-110 transition-transform duration-300 shrink-0 mt-0.5">
										•
									</span>
									<p className="text-gray-400 group-hover:text-terminal-text transition-colors duration-300 mb-0">
										Möglichkeit zur Vorstellung von Technologien und
										Fachvorträgen
									</p>
								</div>
							</div>

							<div className="pt-2">
								<TerminalButton
									href="mailto:info@neuland-ingolstadt.de?subject=Anfrage%20zur%20Partnerschaft"
									dark
								>
									<Mail
										size={16}
										className="mr-2 group-hover:rotate-8 transition-transform duration-300"
									/>
									Partner werden
								</TerminalButton>
							</div>
						</motion.div>
					</div>

					{/* Right Side - Partners Logos */}
					{showPartners && (
						<motion.div
							initial={{ opacity: 0, x: 20 }}
							whileInView={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.5, delay: 0.2 }}
							viewport={{ once: true }}
							className="lg:w-2/5 flex flex-col"
						>
							<a
								href="https://www.thi.de"
								target="_blank"
								rel="noreferrer noopener"
								className="p-6 flex items-center justify-center h-full min-h-[120px] group/logo transition-all duration-200 hover:bg-neutral-800/30 no-underline"
							>
								{/** biome-ignore lint/performance/noImgElement: TODO */}
								<img
									src="/assets/thi.webp"
									alt="THI Partner"
									className="max-w-full max-h-28 object-contain transition-all duration-200 group-hover/logo:scale-105 group-hover/logo:opacity-90"
								/>
							</a>
							<a
								href="https://www.explore.de"
								target="_blank"
								rel="noreferrer noopener"
								className="p-6 border-t border-neutral-800 flex items-center justify-center h-full min-h-[120px] group/logo transition-all duration-200 hover:bg-neutral-800/30 no-underline"
							>
								{/** biome-ignore lint/performance/noImgElement: TODO */}
								<img
									src="/assets/exp.webp"
									alt="EXP Partner"
									className="max-w-full max-h-14 object-contain transition-all duration-200 group-hover/logo:scale-105 group-hover/logo:opacity-90"
								/>
							</a>
						</motion.div>
					)}
				</div>
			</div>
		</div>
	)
}

export default TerminalPartners
