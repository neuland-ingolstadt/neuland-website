import SettingsLinks from '@/components/SettingsLinks'
import SocialLinks from '@/components/SocialLinks'
import TerminalLinks from '@/components/TerminalLinks'
import type React from 'react'

const TerminalFooter: React.FC = () => {
	return (
		<div className="cols grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-terminal-muted pt-6 my-8 text-terminal-text">
			<TerminalLinks />
			<SocialLinks />
			<SettingsLinks />
		</div>
	)
}

export default TerminalFooter
