'use client'
import type React from 'react'
import SettingsLinks from '@/components/Footer/settings-links'
import SocialLinks from '@/components/Footer/social-links'
import TerminalLinks from '@/components/Footer/terminal-links'
import NeulandWordmark from '@/components/Layout/neuland-wordmark'
import { Link } from '@/i18n/navigation'
import { useTranslations } from '@/i18n/react'

const headingClass =
	'mb-3 mt-0 font-mono text-xs font-normal uppercase tracking-wider text-terminal-text/60'

const TerminalFooter: React.FC = () => {
	const t = useTranslations('Footer')
	const currentYear = new Date().getFullYear()
	const fullCommitHash = import.meta.env.VITE_COMMIT_HASH || 'development'
	const commitHash =
		typeof fullCommitHash === 'string' && fullCommitHash !== 'development'
			? fullCommitHash.substring(0, 7) // Display only the first 7 characters of the hash
			: fullCommitHash

	return (
		<div className="relative font-mono">
			<div
				aria-hidden="true"
				className="absolute inset-y-0 left-1/2 -z-10 w-screen -translate-x-1/2 border-t border-terminal-window-border bg-terminal-text/[0.06]"
			/>
			<div className="cols flex flex-col gap-10 py-10 text-terminal-text md:flex-row md:items-start md:justify-between md:gap-16">
				<div className="flex shrink-0 flex-col gap-3">
					<Link
						href="/"
						className="no-underline"
						aria-label="Neuland Ingolstadt"
					>
						<NeulandWordmark className="h-5 w-auto text-terminal-text" />
					</Link>
					<div className="text-sm text-terminal-text/70">
						© {currentYear} Neuland Ingolstadt e.V.
						<div className="mt-1 font-mono text-xs text-terminal-text/70">
							Build: <span title="Git commit hash">{commitHash}</span>
						</div>
					</div>
				</div>
				<div className="flex flex-wrap gap-x-16 gap-y-8">
					<div>
						<h2 className={headingClass}>{t('headings.club')}</h2>
						<TerminalLinks />
					</div>
					<div>
						<h2 className={headingClass}>{t('headings.social')}</h2>
						<SocialLinks />
					</div>
					<div>
						<h2 className={headingClass}>{t('headings.dev')}</h2>
						<SettingsLinks />
					</div>
				</div>
			</div>
		</div>
	)
}

export default TerminalFooter
