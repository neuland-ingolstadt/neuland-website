'use client'
import type React from 'react'
import SettingsLinks from '@/components/Footer/settings-links'
import SocialLinks from '@/components/Footer/social-links'
import TerminalLinks from '@/components/Footer/terminal-links'

const TerminalFooter: React.FC = () => {
	const currentYear = new Date().getFullYear()
	const fullCommitHash = process.env.NEXT_PUBLIC_COMMIT_HASH || 'development'
	const commitHash =
		typeof fullCommitHash === 'string' && fullCommitHash !== 'development'
			? fullCommitHash.substring(0, 7) // Display only the first 7 characters of the hash
			: fullCommitHash

	return (
		<div className="font-mono">
			<div className="cols grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-terminal-window-border pt-6 my-8 text-terminal-text">
				<TerminalLinks />

				<SocialLinks />
				<SettingsLinks />
			</div>
			<div className="text-center text-terminal-text/50 text-sm pt-2 pb-8">
				© {currentYear} Neuland Ingolstadt e.V.
				<div className="text-xs text-terminal-text/30 mt-1 font-mono">
					Build: <span title="Git commit hash">{commitHash}</span>
				</div>
			</div>
		</div>
	)
}

export default TerminalFooter
