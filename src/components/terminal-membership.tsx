'use client'
import { Mail, UserPlus, Zap } from 'lucide-react'
import { motion } from 'motion/react'
import { useTranslations } from '@/i18n/react'
import TerminalButton from './terminal-button'

const TerminalMembership = () => {
	const t = useTranslations('Home.membershipSection')

	return (
		<div className="my-10 w-full">
			<div className="relative bg-terminal-card border border-terminal-cyan/60 rounded-md overflow-hidden">
				<div className="flex flex-col lg:flex-row relative z-10">
					{/* Pricing Section */}
					<motion.div
						initial={{ opacity: 0, x: -20 }}
						whileInView={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.5 }}
						viewport={{ once: true }}
						className="lg:w-2/5 p-6 border-b lg:border-b-0 lg:border-r border-terminal-window-border"
					>
						<div className="text-terminal-text/80 mb-4 font-mono text-sm">
							$ cat membership-fees.txt
						</div>
						<div className="flex flex-col gap-5">
							<div className="flex items-center justify-between">
								<span className="text-terminal-highlight font-medium">
									{t('pricing.students')}:
								</span>
								<span className="text-terminal-text ml-2 font-normal font-mono text-lg">
									10€ / {t('pricing.year')}
								</span>
							</div>
							<div className="flex items-center justify-between">
								<span className="text-terminal-highlight font-medium">
									{t('pricing.externals')}:
								</span>
								<span className="text-terminal-text ml-2 font-normal font-mono text-lg">
									20€ / {t('pricing.year')}
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
						<h4 className="text-xl font-bold font-mono flex items-center">
							<Zap size={18} className="text-terminal-cyan mr-2" />
							{t('benefits.title')}:
						</h4>

						<div className="space-y-3">
							<div className="flex items-start group">
								<span className="text-terminal-cyan mr-3 text-xl group-hover:scale-110 transition-transform duration-300 shrink-0 mt-0.5">
									•
								</span>
								<p className="text-terminal-text/85 group-hover:text-terminal-text transition-colors duration-300 mb-0">
									{t('benefits.line1')}
								</p>
							</div>
							<div className="flex items-start group">
								<span className="text-terminal-cyan mr-3 text-xl group-hover:scale-110 transition-transform duration-300 shrink-0 mt-0.5">
									•
								</span>
								<p className="text-terminal-text/85 group-hover:text-terminal-text transition-colors duration-300 mb-0">
									{t('benefits.line2')}
								</p>
							</div>
							<div className="flex items-start group">
								<span className="text-terminal-cyan mr-3 text-xl group-hover:scale-110 transition-transform duration-300 shrink-0 mt-0.5">
									•
								</span>
								<p className="text-terminal-text/85 group-hover:text-terminal-text transition-colors duration-300 mb-0">
									{t('benefits.line3')}
								</p>
							</div>
						</div>

						<div className="pt-2 flex flex-wrap gap-3">
							<TerminalButton
								href="https://join.neuland-ingolstadt.de/"
								primary
								target="_blank"
								rel="noreferrer noopener"
							>
								<UserPlus
									size={16}
									className="mr-2 group-hover:rotate-8 transition-transform duration-300"
								/>
								{t('benefits.becomeMember')}
							</TerminalButton>
							<TerminalButton
								href="mailto:info@neuland-ingolstadt.de?subject=Frage%20zur%20Mitgliedschaft"
								dark
							>
								<Mail
									size={16}
									className="mr-2 group-hover:rotate-8 transition-transform duration-300"
								/>
								{t('benefits.writeEmail')}
							</TerminalButton>
						</div>
					</motion.div>
				</div>
			</div>
		</div>
	)
}

export default TerminalMembership
