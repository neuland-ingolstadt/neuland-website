'use client'
import { AnimatePresence, motion } from 'framer-motion'
import { Calendar, ForkKnife, MapPin } from 'lucide-react'
import { useCallback, useEffect, useRef, useState } from 'react'
import FeatureItem from './FeatureItem'
import TerminalButton from './TerminalButton'

const NextAppShowcase = () => {
	const phoneRef = useRef<HTMLDivElement>(null)
	const [activeIndex, setActiveIndex] = useState(0)
	const screenshots = [
		'/assets/neuland-next/next_1.webp',
		'/assets/neuland-next/next_2.webp',
		'/assets/neuland-next/next_4.webp',
		'/assets/neuland-next/next_3.webp'
	]

	const rotateScreenshot = useCallback(() => {
		setActiveIndex((prev) => (prev + 1) % screenshots.length)
	}, [screenshots.length])

	useEffect(() => {
		const timer = setInterval(rotateScreenshot, 3500)
		return () => clearInterval(timer)
	}, [rotateScreenshot])

	useEffect(() => {
		screenshots.forEach((src) => {
			const img = new Image()
			img.src = src
		})
	}, [screenshots])

	const imageVariants = {
		initial: {
			opacity: 0
		},
		animate: {
			opacity: 1,
			transition: {
				duration: 1,
				ease: 'easeInOut'
			}
		},
		exit: {
			opacity: 0,
			transition: {
				duration: 1.2,
				ease: 'easeInOut'
			}
		}
	}

	return (
		<div className="w-full pt-12 pb-16 relative">
			{}

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
					>
						<div
							className="relative mx-auto w-[270px] h-[560px] rounded-[48px] overflow-hidden"
							style={{ willChange: 'transform' }}
						>
							<AnimatePresence mode="sync">
								<motion.img
									key={activeIndex}
									src={screenshots[activeIndex]}
									alt={`Neuland Next App Screenshot ${activeIndex + 1}`}
									className="absolute inset-0 h-full w-full object-cover"
									variants={imageVariants}
									initial="initial"
									animate="animate"
									exit="exit"
									style={{ willChange: 'opacity' }}
									loading="eager"
								/>
							</AnimatePresence>
						</div>

						<div className="flex justify-center gap-2 mt-4">
							{screenshots.map((_, idx) => (
								<motion.button
									key={idx}
									onClick={() => setActiveIndex(idx)}
									className="w-2 h-2 rounded-full bg-terminal-cyan/30 focus:outline-hidden"
									animate={{
										scale: activeIndex === idx ? 1.4 : 1,
										backgroundColor:
											activeIndex === idx
												? 'rgba(51, 195, 240, 0.8)'
												: 'rgba(51, 195, 240, 0.3)'
									}}
									whileHover={{ scale: 1.2 }}
									transition={{ duration: 0.2 }}
									aria-label={`Show screenshot ${idx + 1}`}
								/>
							))}
						</div>

						<div className="w-40 h-1 bg-linear-to-r from-transparent via-terminal-cyan/30 to-transparent rounded mx-auto mt-5 blur-xs" />
					</motion.div>

					<div className="overflow-x-hidden">
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
								<FeatureItem
									icon={<Calendar className="h-5 w-5 text-terminal-cyan" />}
									title="Stundenplan"
									description="Behalte deine Vorlesungen im Blick"
									delay={0.5}
								/>
								<FeatureItem
									icon={<MapPin className="h-5 w-5 text-terminal-cyan" />}
									title="Raumfinder"
									description="Finde freie Räume zum Lernen"
									delay={0.6}
								/>
								<FeatureItem
									icon={<ForkKnife className="h-5 w-5 text-terminal-cyan" />}
									title="Essen"
									description="Aktuelle Speisepläne der Mensen"
									delay={0.7}
								/>
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
										className="h-12"
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
										className="h-12"
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
		</div>
	)
}

export default NextAppShowcase
