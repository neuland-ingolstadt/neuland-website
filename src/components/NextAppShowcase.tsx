import { motion } from 'framer-motion'
import { Calendar, ForkKnife, MapPin } from 'lucide-react'
import { useRef } from 'react'
import TerminalButton from './TerminalButton'

const NextAppShowcase = () => {
	const phoneRef = useRef<HTMLDivElement>(null)

	return (
		<div className="w-full overflow-hidden pt-12 pb-16 relative">
			<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-3xl max-h-96 bg-terminal-cyan/5 blur-[100px] rounded-full pointer-events-none" />

			<div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
					viewport={{ once: true }}
					className="text-center mb-12"
				>
					<h2 className="text-3xl mb-3 font-bold">Neuland Next</h2>
					<p className="text-xl text-terminal-text">
						Deine inoffizielle{' '}
						<span className="text-terminal-cyan">Campus App</span> für die{' '}
						<span className="text-terminal-cyan">TH Ingolstadt</span>
					</p>
				</motion.div>

				<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
					<motion.div
						ref={phoneRef}
						initial={{ opacity: 0, x: -50 }}
						whileInView={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.8, delay: 0.2 }}
						viewport={{ once: true }}
						className="relative"
					>
						<div className="relative mx-auto w-[280px] h-[580px] rounded-[48px] overflow-hidden shadow-[0_0_40px_rgba(51,195,240,0.15)]">
							<img
								src="/assets/neuland_next_screenshot.png"
								alt="Neuland Next App Screenshot"
								className="h-full w-full object-cover"
							/>
						</div>

						<div className="w-40 h-1 bg-gradient-to-r from-transparent via-terminal-cyan/30 to-transparent rounded mx-auto mt-5 blur-sm" />
					</motion.div>

					<motion.div
						initial={{ opacity: 0, x: 50 }}
						whileInView={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.8, delay: 0.4 }}
						viewport={{ once: true }}
					>
						<h3 className="text-xl mb-6 font-bold relative pl-4 border-l-2 border-terminal-cyan">
							Unser Flaggschiff-Projekt
						</h3>

						<p className="mb-6">
							Die moderne Campus-App von Studierenden für Studierende der TH
							Ingolstadt.
							<br />
							Neuland Next bietet alle wichtigen Funktionen für deinen
							Studienalltag.
						</p>

						<div className="space-y-4 mb-8">
							<motion.div
								initial={{ opacity: 0, x: 20 }}
								whileInView={{ opacity: 1, x: 0 }}
								transition={{ duration: 0.5, delay: 0.5 }}
								viewport={{ once: true }}
								className="flex items-start"
							>
								<div className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-full bg-terminal-bg mr-4">
									<Calendar className="h-5 w-5 text-terminal-cyan" />
								</div>
								<div>
									<h4 className="font-medium text-terminal-cyan leading-tight mb-0">
										Stundenplan
									</h4>
									<p className="text-sm opacity-80 mt-0.5">
										Behalte deine Vorlesungen im Blick
									</p>
								</div>
							</motion.div>

							<motion.div
								initial={{ opacity: 0, x: 20 }}
								whileInView={{ opacity: 1, x: 0 }}
								transition={{ duration: 0.5, delay: 0.6 }}
								viewport={{ once: true }}
								className="flex items-start"
							>
								<div className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-full bg-terminal-bg mr-4">
									<MapPin className="h-5 w-5 text-terminal-cyan" />
								</div>
								<div>
									<h4 className="font-medium text-terminal-cyan leading-tight mb-0">
										Raumfinder
									</h4>
									<p className="text-sm opacity-80 mt-0.5">
										Finde freie Räume zum Lernen
									</p>
								</div>
							</motion.div>

							<motion.div
								initial={{ opacity: 0, x: 20 }}
								whileInView={{ opacity: 1, x: 0 }}
								transition={{ duration: 0.5, delay: 0.7 }}
								viewport={{ once: true }}
								className="flex items-start"
							>
								<div className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-full bg-terminal-bg mr-4">
									<ForkKnife className="h-5 w-5 text-terminal-cyan" />
								</div>
								<div>
									<h4 className="font-medium text-terminal-cyan leading-tight mb-0">
										Essen
									</h4>
									<p className="text-sm opacity-80 mt-0.5">
										Aktuelle Speisepläne der Mensen
									</p>
								</div>
							</motion.div>
						</div>

						<div className="flex items-center flex-wrap gap-4 pb-4">
							<a
								href="https://apps.apple.com/app/neuland-next/id1617096811"
								rel="noreferrer noopener"
								target="_blank"
								className="no-underline"
							>
								<img
									src="assets/app_store_badge_de.svg"
									alt="Apple App Store"
									className="h-14"
								/>
							</a>
							<a
								href="https://play.google.com/store/apps/details?id=app.neuland"
								rel="noreferrer noopener"
								target="_blank"
								className="no-underline"
							>
								<img
									src="assets/play_store_badge_de.svg"
									alt="Google Play Store"
									className="h-14"
								/>
							</a>
						</div>
						<TerminalButton href="https://next.neuland.app">
							Weitere Infos
						</TerminalButton>
					</motion.div>
				</div>
			</div>
		</div>
	)
}

export default NextAppShowcase
