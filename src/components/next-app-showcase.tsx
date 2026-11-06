'use client'
import {
	ArrowUpRight,
	GithubIcon,
	Globe,
	Laptop,
	Shield,
	TrendingUp,
	Zap
} from 'lucide-react'
import { motion } from 'motion/react'
import { useTranslations } from '@/i18n/react'
import NoiseOverlay from './noise-overlay'
import TerminalButton from './terminal-button'

const NextAppShowcase = () => {
	const t = useTranslations('Home.neulandNextSection')

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
		<div className="w-full pt-12 pb-16 mb-16 md:mb-24 relative">
			<div
				aria-hidden="true"
				className="pointer-events-none absolute -inset-y-24 left-1/2 w-screen -translate-x-1/2"
				style={{
					backgroundImage:
						'radial-gradient(ellipse 45% 55% at 18% 35%, var(--backdrop-glow-a), transparent 70%), radial-gradient(ellipse 40% 50% at 82% 65%, var(--backdrop-glow-b), transparent 70%), radial-gradient(var(--backdrop-dot) 1px, transparent 1px)',
					backgroundSize: 'auto, auto, 24px 24px',
					maskImage:
						'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.04) 6%, rgba(0,0,0,0.15) 12%, rgba(0,0,0,0.35) 19%, rgba(0,0,0,0.6) 26%, rgba(0,0,0,0.85) 33%, black 40%, black 60%, rgba(0,0,0,0.85) 67%, rgba(0,0,0,0.6) 74%, rgba(0,0,0,0.35) 81%, rgba(0,0,0,0.15) 88%, rgba(0,0,0,0.04) 94%, transparent 100%)',
					WebkitMaskImage:
						'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.04) 6%, rgba(0,0,0,0.15) 12%, rgba(0,0,0,0.35) 19%, rgba(0,0,0,0.6) 26%, rgba(0,0,0,0.85) 33%, black 40%, black 60%, rgba(0,0,0,0.85) 67%, rgba(0,0,0,0.6) 74%, rgba(0,0,0,0.35) 81%, rgba(0,0,0,0.15) 88%, rgba(0,0,0,0.04) 94%, transparent 100%)'
				}}
			>
				<NoiseOverlay />
			</div>
			<div className="relative z-10">
				{/* Header Section */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
					viewport={{ once: true }}
					className="text-center mb-16"
				>
					<p className="font-script marker mb-2 inline-block -rotate-1 text-2xl text-terminal-ink">
						{t('hero.subtitle')}
					</p>
					<h2 className="mb-6 font-mono text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
						{t('hero.title')}
					</h2>
					<p className="text-base text-terminal-text/80 max-w-3xl mx-auto">
						{t('hero.introduction')}
					</p>
				</motion.div>

				{/* Main Content Grid */}
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-stretch mb-20">
					{/* Phone Showcase */}
					<motion.div
						initial={{ opacity: 0, x: -50 }}
						whileInView={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.8, delay: 0.2 }}
						viewport={{ once: true }}
						className="flex items-start justify-center self-stretch overflow-hidden"
						style={{
							maskImage:
								'linear-gradient(to bottom, black 55%, transparent 95%)',
							WebkitMaskImage:
								'linear-gradient(to bottom, black 55%, transparent 95%)'
						}}
					>
						<div
							className="flex h-full w-full items-start justify-center"
							style={{
								maskImage:
									'radial-gradient(ellipse 62% 85% at 30% 30%, black 55%, transparent 100%)',
								WebkitMaskImage:
									'radial-gradient(ellipse 62% 85% at 30% 30%, black 55%, transparent 100%)'
							}}
						>
							<img
								src="/assets/neuland-next/next-hand.webp"
								alt="Neuland Next App"
								width={2000}
								height={1500}
								className="-mt-[22%] block w-[170%] max-w-none shrink-0"
								loading="lazy"
							/>
						</div>
					</motion.div>

					{/* Content Section */}
					<div>
						<motion.div
							initial={{ opacity: 0, x: 50 }}
							whileInView={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.8, delay: 0.4 }}
							viewport={{ once: true }}
							className="relative bg-terminal-window border border-terminal-window-border p-8 overflow-hidden"
						>
							{/* Subtle background gradient */}
							<div className="absolute inset-0 bg-gradient-to-br from-terminal-cyan/2 via-transparent to-terminal-cyan/1 pointer-events-none" />

							<div className="relative z-10">
								<h3 className="text-xl sm:text-2xl mb-3 font-bold font-mono text-terminal-text tracking-tight">
									{t('container.title')}
								</h3>

								<p className="mb-8 text-base leading-relaxed text-terminal-text/70">
									{t('container.description')}
								</p>

								{/* Highlights */}
								<div className="mb-8 pb-8 border-b border-terminal-window-border">
									<h4 className="text-sm font-bold font-mono mb-4 text-terminal-ink uppercase tracking-wider">
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
												<div className="text-terminal-text/70 group-hover:text-terminal-ink shrink-0 transition-colors duration-200">
													{highlight.icon}
												</div>
												<span className="text-terminal-text/70 group-hover:text-terminal-text transition-colors duration-200">
													{highlight.text}
												</span>
											</motion.div>
										))}
									</div>
								</div>

								{/* Download Section */}
								<div className="mb-6">
									<h4 className="text-sm font-bold font-mono mb-4 text-terminal-ink uppercase tracking-wider">
										{t('container.download')}
									</h4>
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
			</div>
		</div>
	)
}

export default NextAppShowcase
