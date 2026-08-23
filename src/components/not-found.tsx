'use client'
import { useLocation } from '@tanstack/react-router'
import { ArrowLeft, Terminal } from 'lucide-react'
import { motion } from 'motion/react'
import TerminalButton from '@/components/terminal-button'
import { Link } from '@/i18n/navigation'
import { useTranslations } from '@/i18n/react'

export default function NotFound() {
	const t = useTranslations('NotFound')
	const pathname = useLocation({ select: (location) => location.pathname })

	return (
		<div className="min-h-[calc(100vh-200px)] flex items-center justify-center px-4 py-20">
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6 }}
				className="w-full max-w-2xl"
			>
				{/* Main container */}
				<div className="relative bg-terminal-window border border-terminal-window-border overflow-hidden">
					{/* Corner accent brackets */}
					<div className="absolute top-0 left-0 w-16 h-16">
						<div className="absolute top-0 left-0 w-8 h-px bg-terminal-cyan/40" />
						<div className="absolute top-0 left-0 w-px h-8 bg-terminal-cyan/40" />
					</div>
					<div className="absolute top-0 right-0 w-16 h-16">
						<div className="absolute top-0 right-0 w-8 h-px bg-terminal-cyan/40" />
						<div className="absolute top-0 right-0 w-px h-8 bg-terminal-cyan/40" />
					</div>
					<div className="absolute bottom-0 left-0 w-16 h-16">
						<div className="absolute bottom-0 left-0 w-8 h-px bg-terminal-cyan/40" />
						<div className="absolute bottom-0 left-0 w-px h-8 bg-terminal-cyan/40" />
					</div>
					<div className="absolute bottom-0 right-0 w-16 h-16">
						<div className="absolute bottom-0 right-0 w-8 h-px bg-terminal-cyan/40" />
						<div className="absolute bottom-0 right-0 w-px h-8 bg-terminal-cyan/40" />
					</div>

					{/* Subtle inner glow */}
					<div className="absolute inset-0 bg-gradient-to-br from-terminal-cyan/3 via-transparent to-terminal-cyan/3 pointer-events-none" />

					<div className="p-8 md:p-12 relative z-10">
						{/* Terminal-style error message */}
						<div className="mb-8">
							<div className="flex items-center gap-3 mb-4">
								<Terminal className="h-6 w-6 text-terminal-cyan" />
								<span className="text-terminal-text/60 font-mono text-sm">
									$ cat error.log
								</span>
							</div>
							<div className="font-mono text-sm space-y-2">
								<div className="text-terminal-red">
									<span className="text-terminal-cyan">Error:</span> HTTP 404 -
									Not Found
								</div>
								<div className="text-terminal-text/70">
									<span className="text-terminal-cyan">Path:</span>{' '}
									<span className="text-terminal-yellow">{pathname}</span>
								</div>
								<div className="text-terminal-text/70">
									<span className="text-terminal-cyan">Status:</span>{' '}
									<span className="text-terminal-red">FAILED</span>
								</div>
							</div>
						</div>

						{/* Large 404 display */}
						<motion.div
							initial={{ opacity: 0, scale: 0.9 }}
							animate={{ opacity: 1, scale: 1 }}
							transition={{ duration: 0.5, delay: 0.2 }}
							className="mb-8"
						>
							<h1 className="text-8xl md:text-9xl font-bold text-terminal-cyan/20 mb-4 font-mono">
								404
							</h1>
							<h2 className="text-2xl md:text-3xl font-semibold text-terminal-text mb-3">
								Page Not Found
							</h2>
							<p className="text-terminal-text/70 leading-relaxed">
								{t('description')}
							</p>
						</motion.div>

						{/* Action buttons */}
						<div className="flex flex-col sm:flex-row gap-4 ">
							<TerminalButton
								onClick={() => {
									if (typeof window !== 'undefined') {
										window.history.back()
									}
								}}
								dark
							>
								<ArrowLeft size={16} className="mr-2" />
								{t('back')}
							</TerminalButton>
						</div>

						{/* Helpful links */}
						<div className="mt-8 pt-8 border-t border-terminal-window-border">
							<p className="text-sm text-terminal-text/60 mb-3 font-mono">
								$ ls -la /helpful-links
							</p>
							<div className="flex flex-wrap gap-3">
								<Link
									href="/"
									className="text-sm text-terminal-cyan hover:text-terminal-cyan/80 transition-colors duration-200 no-underline"
								>
									→ {t('links.home')}
								</Link>
								<Link
									href="/blog"
									className="text-sm text-terminal-cyan hover:text-terminal-cyan/80 transition-colors duration-200 no-underline"
								>
									→ {t('links.blog')}
								</Link>
								<Link
									href="/projects"
									className="text-sm text-terminal-cyan hover:text-terminal-cyan/80 transition-colors duration-200 no-underline"
								>
									→ {t('links.projects')}
								</Link>
							</div>
						</div>
					</div>
				</div>
			</motion.div>
		</div>
	)
}
