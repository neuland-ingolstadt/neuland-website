'use client'
import { motion } from 'framer-motion'
import { Mail, Zap } from 'lucide-react'
import TerminalButton from './terminal-button'

const TerminalPartners: React.FC = () => {
	// Check if current date is >= December 1st, 2025
	const showPartners = new Date() >= new Date('2025-12-01')

	return (
		<div className="my-10 w-full">
			<div className="relative bg-terminal-window border border-terminal-window-border overflow-hidden">
				{/* Creative accent - top border highlight */}
				<div className="absolute top-0 left-0 right-0 h-px bg-terminal-cyan/40" />

				{/* Subtle inner glow */}
				<div className="absolute inset-0 bg-gradient-to-b from-terminal-cyan/3 via-transparent to-transparent pointer-events-none" />

				<div className="flex flex-col lg:flex-row relative z-10">
					{/* Left Side - Text Content */}
					<div
						className={`${showPartners ? 'lg:w-3/5' : 'w-full'} flex flex-col md:flex-row border-b lg:border-b-0 ${showPartners ? 'lg:border-r' : ''} border-terminal-window-border`}
					>
						{/* Info Section */}
						<motion.div
							initial={{ opacity: 0, x: -20 }}
							whileInView={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.5 }}
							viewport={{ once: true }}
							className="md:w-2/5 p-6 border-b md:border-b-0 md:border-r border-terminal-window-border"
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
									<p className="text-terminal-text/70 group-hover:text-terminal-text transition-colors duration-300 mb-0">
										Direkter Zugang zu technikaffinen Studierenden
									</p>
								</div>
								<div className="flex items-start group">
									<span className="text-terminal-cyan mr-3 text-xl group-hover:scale-110 transition-transform duration-300 shrink-0 mt-0.5">
										•
									</span>
									<p className="text-terminal-text/70 group-hover:text-terminal-text transition-colors duration-300 mb-0">
										Sichtbarkeit bei Events und auf unseren digitalen
										Plattformen
									</p>
								</div>
								<div className="flex items-start group">
									<span className="text-terminal-cyan mr-3 text-xl group-hover:scale-110 transition-transform duration-300 shrink-0 mt-0.5">
										•
									</span>
									<p className="text-terminal-text/70 group-hover:text-terminal-text transition-colors duration-300 mb-0">
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
								className="relative p-6 flex items-center justify-center h-full min-h-[120px] group/logo transition-all duration-300 overflow-hidden no-underline"
							>
								{/* Animated background on hover */}
								<div className="absolute inset-0 bg-gradient-to-br from-terminal-cyan/5 via-terminal-cyan/2 to-transparent opacity-0 group-hover/logo:opacity-100 transition-opacity duration-300 pointer-events-none" />

								{/* Special accent - corner bracket on hover */}
								<div className="absolute top-0 left-0 w-8 h-8 opacity-0 group-hover/logo:opacity-100 transition-opacity duration-300">
									<div className="absolute top-0 left-0 w-4 h-px bg-terminal-cyan/40" />
									<div className="absolute top-0 left-0 w-px h-4 bg-terminal-cyan/40" />
								</div>

								{/* Logo container that moves up on hover */}
								<div className="relative z-10 flex items-center justify-center transition-transform duration-300 group-hover/logo:-translate-y-3">
									{/** biome-ignore lint/performance/noImgElement: TODO */}
									<img
										src="/assets/thi.webp"
										alt="THI Partner"
										className="max-w-full max-h-28 object-contain"
									/>
								</div>

								{/* Fading subtitle - absolutely positioned so it doesn't affect layout */}
								<div className="absolute -bottom-3 left-0 right-0 z-10 opacity-0 group-hover/logo:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover/logo:translate-y-0 pointer-events-none">
									<p className="text-sm text-terminal-text/70 text-center font-medium ">
										Technische Hochschule Ingolstadt
									</p>
								</div>
							</a>
							<a
								href="https://www.explore.de"
								target="_blank"
								rel="noreferrer noopener"
								className="relative p-6 border-t border-terminal-window-border flex items-center justify-center h-full min-h-[120px] group/logo transition-all duration-300 overflow-hidden no-underline"
							>
								{/* Animated background on hover */}
								<div className="absolute inset-0 bg-gradient-to-br from-terminal-cyan/5 via-terminal-cyan/2 to-transparent opacity-0 group-hover/logo:opacity-100 transition-opacity duration-300 pointer-events-none" />

								{/* Special accent - corner bracket on hover */}
								<div className="absolute top-0 left-0 w-8 h-8 opacity-0 group-hover/logo:opacity-100 transition-opacity duration-300">
									<div className="absolute top-0 left-0 w-4 h-px bg-terminal-cyan/40" />
									<div className="absolute top-0 left-0 w-px h-4 bg-terminal-cyan/40" />
								</div>

								{/* Logo container that moves up on hover */}
								<div className="relative z-10 flex items-center justify-center transition-transform duration-300 group-hover/logo:-translate-y-3">
									{/** biome-ignore lint/performance/noImgElement: TODO */}
									<img
										src="/assets/exp.webp"
										alt="EXP Partner"
										className="max-w-full max-h-14 object-contain"
									/>
								</div>

								{/* Fading subtitle - absolutely positioned so it doesn't affect layout */}
								<div className="absolute -bottom-3 left-0 right-0 z-10 opacity-0 group-hover/logo:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover/logo:translate-y-0 pointer-events-none">
									<p className="text-sm text-terminal-text/70 text-center font-medium ">
										Explore GmbH
									</p>
								</div>
							</a>
						</motion.div>
					)}
				</div>
			</div>
		</div>
	)
}

export default TerminalPartners
