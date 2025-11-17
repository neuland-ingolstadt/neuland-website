'use client'
import { AnimatePresence, motion, type Variants } from 'framer-motion'
import {
	ArrowUpRight,
	Bell,
	BookOpen,
	Calendar,
	ForkKnife,
	GithubIcon,
	Globe,
	Laptop,
	MapPin,
	Shield,
	TrendingUp,
	Users,
	Zap
} from 'lucide-react'
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

	const features = [
		{
			icon: <Calendar className="h-5 w-5 text-terminal-cyan" />,
			title: 'Stundenplan & Prüfungen',
			description: 'Dein persönlicher Stundenplan und alle Prüfungen'
		},
		{
			icon: <Calendar className="h-5 w-5 text-terminal-cyan" />,
			title: 'Kalender & Events',
			description: 'Alle wichtigen Semesterdaten und Campus-Events'
		},
		{
			icon: <Users className="h-5 w-5 text-terminal-cyan" />,
			title: 'Profil',
			description: 'Prüfe deine Noten oder dein Druckguthaben'
		},
		{
			icon: <ForkKnife className="h-5 w-5 text-terminal-cyan" />,
			title: 'Mensa',
			description: 'Alle Speisepläne mit Preisen, Allergenen und Nährwerten'
		},
		{
			icon: <MapPin className="h-5 w-5 text-terminal-cyan" />,
			title: 'Campus-Karte',
			description:
				'Finde freie Räume, erkunde Gebäude oder nutze smarte Vorschläge'
		},
		{
			icon: <BookOpen className="h-5 w-5 text-terminal-cyan" />,
			title: 'Bibliothek',
			description: 'Nutze deinen virtuellen Bibliotheks Code zum Ausleihen'
		},
		{
			icon: <Globe className="h-5 w-5 text-terminal-cyan" />,
			title: 'Quick Links',
			description: 'Alle wichtigen Uni-Plattformen wie Moodle oder Primuss'
		},
		{
			icon: <Bell className="h-5 w-5 text-terminal-cyan" />,
			title: 'THI News',
			description: 'Bleibe informiert mit den neuesten Nachrichten der THI'
		}
	]

	const highlights = [
		{ icon: <Shield className="h-4 w-4" />, text: 'Maximaler Datenschutz' },

		{ icon: <Zap className="h-4 w-4" />, text: 'Blitzschnelle Performance' },
		{ icon: <GithubIcon className="h-4 w-4" />, text: '100% Open Source' },
		{ icon: <TrendingUp className="h-4 w-4" />, text: 'Regelmäßige Updates' },
		{ icon: <Globe className="h-4 w-4" />, text: 'Offline-fähig' },
		{ icon: <Laptop className="h-4 w-4" />, text: 'Auch als Web App' }
	]

	return (
		<div className="w-full pt-12 pb-16 relative">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
				{/* Header Section */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
					viewport={{ once: true }}
					className="text-center mb-16"
				>
					<h2 className="text-4xl mb-3 font-bold bg-terminal-cyan  bg-clip-text text-transparent">
						Neuland Next
					</h2>
					<p className="text-xl/loose text-terminal-text mb-6">
						Deine <span className="font-bold">App</span> für die{' '}
						<span className="font-bold">TH Ingolstadt</span>
					</p>
					<p className="text-lg text-terminal-text/80 max-w-3xl mx-auto">
						Deine moderne Campus-App von Neuland Ingolstadt. Entwickelt mit
						Liebe zum Detail und vollständig Open Source.
					</p>
				</motion.div>

				{/* Main Content Grid */}
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start mb-20">
					{/* Phone Showcase */}
					<motion.div
						ref={phoneRef}
						initial={{ opacity: 0, x: -50 }}
						whileInView={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.8, delay: 0.2 }}
						viewport={{ once: true }}
						className="flex flex-col items-center"
					>
						<div
							className="relative mx-auto w-[270px] h-[560px] rounded-[48px] overflow-hidden"
							style={{ willChange: 'transform' }}
						>
							<AnimatePresence mode="sync">
								{/** biome-ignore lint/performance/noImgElement: TODO */}
								<motion.img
									key={activeIndex}
									src={screenshots[activeIndex]}
									alt={`Neuland Next App Screenshot ${activeIndex + 1}`}
									className="absolute inset-0 h-full w-full object-cover"
									variants={imageVariants as Variants}
									initial="initial"
									animate="animate"
									exit="exit"
									style={{ willChange: 'opacity' }}
									loading="eager"
								/>
							</AnimatePresence>
						</div>

						<div className="flex justify-center gap-2 mt-6">
							{screenshots.map((_, idx) => (
								<motion.button
									key={idx}
									onClick={() => setActiveIndex(idx)}
									className="w-3 h-3 rounded-full bg-terminal-cyan/30 focus:outline-hidden"
									animate={{
										scale: activeIndex === idx ? 1.4 : 1,
										backgroundColor:
											activeIndex === idx
												? 'rgba(30, 255, 45, 0.8)'
												: 'rgba(208, 208, 208, 0.3)'
									}}
									whileHover={{ scale: 1.2 }}
									transition={{ duration: 0.2 }}
									aria-label={`Show screenshot ${idx + 1}`}
								/>
							))}
						</div>

						<div className="w-40 h-1 bg-gradient-to-r from-transparent via-terminal-cyan/30 to-transparent rounded mx-auto mt-5 blur-xs" />
					</motion.div>

					{/* Content Section */}
					<div>
						<motion.div
							initial={{ opacity: 0, x: 50 }}
							whileInView={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.8, delay: 0.4 }}
							viewport={{ once: true }}
						>
							<h3 className="text-2xl mb-6 font-bold relative pl-4 border-l-2 border-terminal-cyan">
								Unser Flaggschiff-Projekt
							</h3>

							<p className="mb-8 text-lg leading-relaxed">
								Neuland Next ist mehr als nur eine App – es ist dein digitaler
								Begleiter durch den Studienalltag an der THI. Alle wichtigen
								Funktionen für deinen Campus-Alltag in einer App.
							</p>

							{/* Highlights */}
							<div className="mb-8">
								<h4 className="text-lg font-semibold mb-4 text-terminal-cyan">
									Warum Neuland Next?
								</h4>
								<div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
									{highlights.map((highlight, idx) => (
										<motion.div
											key={idx}
											initial={{ opacity: 0, x: 20 }}
											whileInView={{ opacity: 1, x: 0 }}
											transition={{ duration: 0.4, delay: idx * 0.1 }}
											viewport={{ once: true }}
											className="flex items-center gap-3 text-sm"
										>
											<div className="text-terminal-cyan">{highlight.icon}</div>
											<span className="text-terminal-text/90">
												{highlight.text}
											</span>
										</motion.div>
									))}
								</div>
							</div>

							{/* Download Buttons */}
							<div className="flex items-center flex-wrap gap-4 mb-6">
								<a
									href="https://apps.apple.com/app/neuland-next/id1617096811"
									rel="noreferrer noopener"
									target="_blank"
									className="no-underline transition-transform hover:scale-105"
								>
									{/** biome-ignore lint/performance/noImgElement: TODO */}
									<img
										src="/assets/app_store_badge_de.svg"
										alt="Apple App Store"
										className="h-14"
									/>
								</a>
								<a
									href="https://play.google.com/store/apps/details?id=app.neuland"
									rel="noreferrer noopener"
									target="_blank"
									className="no-underline transition-transform hover:scale-105"
								>
									{/** biome-ignore lint/performance/noImgElement: TODO */}
									<img
										src="/assets/play_store_badge_de.svg"
										alt="Google Play Store"
										className="h-14"
									/>
								</a>
							</div>

							<TerminalButton href="https://neuland.app">
								<ArrowUpRight
									size={16}
									className="mr-2 group-hover:rotate-8 transition-transform duration-300"
								/>
								Mehr erfahren
							</TerminalButton>
						</motion.div>
					</div>
				</div>

				{/* Features Section */}
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8 }}
					viewport={{ once: true }}
					className="mb-16 hidden lg:block"
				>
					<h3 className="text-2xl font-bold text-center mb-12">
						Die Features auf einen Blick
					</h3>
					<div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
						{features.map((feature, idx) => (
							<motion.div
								key={idx}
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.5, delay: idx * 0.1 }}
								viewport={{ once: true }}
								className="h-full"
							>
								<FeatureItem
									icon={feature.icon}
									title={feature.title}
									description={feature.description}
								/>
							</motion.div>
						))}
					</div>
				</motion.div>
			</div>
		</div>
	)
}

export default NextAppShowcase
