import SettingsLinks from '@/components/Footer/SettingsLinks'
import SocialLinks from '@/components/Footer/SocialLinks'
import TerminalLinks from '@/components/Footer/TerminalLinks'
import type React from 'react'

const TerminalFooter: React.FC = () => {
	const currentYear = new Date().getFullYear()

	return (
		<div>
			<div className="cols grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-terminal-windowBorder pt-6 my-8 text-terminal-text">
				<TerminalLinks />
				<SocialLinks />
				<SettingsLinks />
			</div>
			<div className="text-center text-terminal-text/50 text-sm pt-2 pb-8">
				© {currentYear} Neuland Ingolstadt e.V.
			</div>
		</div>
	)
}

export default TerminalFooter
