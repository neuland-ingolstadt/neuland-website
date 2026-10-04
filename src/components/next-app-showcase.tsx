'use client'
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
import { motion } from 'motion/react'
import { useTranslations } from '@/i18n/react'
import FeatureItem from './feature-item'
import TerminalButton from './terminal-button'

const NextAppShowcase = () => {
	const t = useTranslations('Home.neulandNextSection')

	const features = [
		{
			icon: <Calendar className="h-5 w-5 text-terminal-cyan" />,
			title: t('features.timetable.title'),
			description: t('features.timetable.description')
		},
		{
			icon: <Calendar className="h-5 w-5 text-terminal-cyan" />,
			title: t('features.calendar.title'),
			description: t('features.calendar.description')
		},
		{
			icon: <Users className="h-5 w-5 text-terminal-cyan" />,
			title: t('features.profile.title'),
			description: t('features.profile.description')
		},
		{
			icon: <ForkKnife className="h-5 w-5 text-terminal-cyan" />,
			title: t('features.mensa.title'),
			description: t('features.mensa.description')
		},
		{
			icon: <MapPin className="h-5 w-5 text-terminal-cyan" />,
			title: t('features.map.title'),
			description: t('features.map.description')
		},
		{
			icon: <BookOpen className="h-5 w-5 text-terminal-cyan" />,
			title: t('features.library.title'),
			description: t('features.library.description')
		},
		{
			icon: <Globe className="h-5 w-5 text-terminal-cyan" />,
			title: t('features.links.title'),
			description: t('features.links.description')
		},
		{
			icon: <Bell className="h-5 w-5 text-terminal-cyan" />,
			title: t('features.news.title'),
			description: t('features.news.description')
		}
	]

	const highlights = [
		{ icon: <Shield className="h-4 w-4" />, text: t('container.privacy') },
		{ icon: <Zap className="h-4 w-4" />, text: t('container.performance') },
		{
			icon: <GithubIcon className="h-4 w-4" />,
			text: t('container.openSource')
		},
		{ icon: <TrendingUp className="h-4 w-4" />, text: t('container.updates') },
		{
			icon: <Globe className="h-4 w-4" />,
			text: t('container.offlineCapability')
		},
		{ icon: <Laptop className="h-4 w-4" />, text: t('container.webApp') }
	]

	return (
		<div className="w-full relative border border-terminal-window-border mb-24">
			<div className="relative z-10">
				{/* Header Section */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
					viewport={{ once: true }}
					className="px-6 py-5 sm:px-8 border-b border-terminal-window-border"
				>
					<p className="font-script text-terminal-cyan text-xl mb-1 -rotate-1">
						{t('hero.subtitle')}
					</p>
					<h2 className="text-2xl md:text-3xl font-bold font-mono tracking-tight">
						{t('hero.title')}
					</h2>
				</motion.div>
				<p className="text-lg text-terminal-text/90 max-w-3xl px-6 pt-8 sm:px-8">
					{t('hero.introduction')}
				</p>

				{/* Main Content Grid */}
				<div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)] items-end overflow-hidden">
					{/* Phone Showcase */}
					<motion.div
						initial={{ opacity: 0, x: -50 }}
						whileInView={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.8, delay: 0.2 }}
						viewport={{ once: true }}
						className="flex items-end justify-start self-end overflow-hidden"
					>
						<img
							src="/assets/neuland-next/next-hand.webp"
							alt="Neuland Next App"
							width={2000}
							height={1500}
							className="block w-[120%] max-w-none shrink-0 -ml-[10%] translate-y-[11%]"
							loading="lazy"
						/>
					</motion.div>

					{/* Content Section */}
					<div className="self-center p-6 sm:p-8">
						<motion.div
							initial={{ opacity: 0, x: 50 }}
							whileInView={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.8, delay: 0.4 }}
							viewport={{ once: true }}
							className="relative bg-terminal-window border border-terminal-window-border p-8 overflow-hidden"
						>
							{/* Outer accent corners */}

							<div className="relative z-10">
								<h3 className="text-xl sm:text-2xl mb-3 font-bold font-mono text-terminal-text tracking-tight">
									{t('container.title')}
								</h3>

								<p className="mb-8 text-base leading-relaxed text-terminal-text/85">
									{t('container.description')}
								</p>

								{/* Highlights */}
								<div className="mb-8 pb-8 border-b border-terminal-window-border">
									<h4 className="text-sm font-bold mb-4 text-terminal-cyan font-mono">
										{t('container.whyNeulandNext')}
									</h4>
									<div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
										{highlights.map((highlight, idx) => (
											<motion.div
												key={idx}
												initial={{ opacity: 0, x: 20 }}
												whileInView={{ opacity: 1, x: 0 }}
												transition={{ duration: 0.4, delay: idx * 0.1 }}
												viewport={{ once: true }}
												className="flex items-center gap-3 text-sm group"
											>
												<div className="text-terminal-text/85 group-hover:text-terminal-cyan shrink-0 transition-colors duration-200">
													{highlight.icon}
												</div>
												<span className="text-terminal-text/85 group-hover:text-terminal-text transition-colors duration-200">
													{highlight.text}
												</span>
											</motion.div>
										))}
									</div>
								</div>

								{/* Download Section */}
								<div className="mb-6">
									<div className="text-xs font-normal mb-4 text-terminal-cyan/80 uppercase tracking-wider">
										{t('container.download')}
									</div>
									<div className="flex flex-col sm:flex-row gap-3 mb-6">
										<a
											href="https://apps.apple.com/app/neuland-next/id1617096811"
											rel="noreferrer noopener"
											target="_blank"
											className="group relative inline-block transition-all no-underline"
										>
											<img
												src="/assets/app_store_badge_de.svg"
												alt="Apple App Store"
												className="h-12"
											/>
										</a>
										<a
											href="https://play.google.com/store/apps/details?id=app.neuland"
											rel="noreferrer noopener"
											target="_blank"
											className="group relative inline-block transition-all no-underline"
										>
											<img
												src="/assets/play_store_badge_de.svg"
												alt="Google Play Store"
												className="h-12"
											/>
										</a>
									</div>
								</div>

								<TerminalButton
									href="https://neuland.app"
									dark
									target="_blank"
									rel="noreferrer noopener"
								>
									<ArrowUpRight
										size={16}
										className="mr-2 group-hover:rotate-8 transition-transform duration-300"
									/>
									{t('container.learnMore')}
								</TerminalButton>
							</div>
						</motion.div>
					</div>
				</div>

				{/* Features Section */}
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8 }}
					viewport={{ once: true }}
					className="hidden lg:block border-t border-terminal-window-border p-6 sm:p-8"
				>
					<h3 className="text-xl sm:text-2xl font-bold font-mono mb-8 tracking-tight">
						{t('features.title')}
					</h3>
					<div className="relative bg-terminal-card border border-terminal-cyan/60 rounded-md overflow-hidden">
						{/* Outer accent corners */}

						<div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 relative z-10">
							{features.map((feature, idx) => {
								const cols = 4
								const row = Math.floor(idx / cols)
								const totalRows = Math.ceil(features.length / cols)
								const isLastRow = row === totalRows - 1
								const isLastInRow = (idx + 1) % cols === 0
								const isLastItem = idx === features.length - 1
								return (
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
											isLastInRow={isLastInRow || isLastItem}
											isLastRow={isLastRow}
										/>
									</motion.div>
								)
							})}
						</div>
					</div>
				</motion.div>
			</div>
		</div>
	)
}

export default NextAppShowcase
