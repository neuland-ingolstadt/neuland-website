import type React from 'react'
import { Link } from '@/i18n/navigation'
import { useTranslations } from '@/i18n/react'

const TerminalLinks: React.FC = () => {
	const t = useTranslations('Footer')

	return (
		<nav>
			<ul>
				<li className="mb-2">
					<Link href="/legal/satzung" className="text-terminal-text! group">
						<span className="group-hover:animate-cyberpunk">$</span>{' '}
						<span className="text-terminal-cyan">cat</span> {t('bylaws')}
					</Link>
				</li>
				<li className="mb-2">
					<Link
						href="/legal/datenschutzordnung"
						className="text-terminal-text! group"
					>
						<span className="group-hover:animate-cyberpunk">$</span>{' '}
						<span className="text-terminal-cyan">cat</span>{' '}
						{t('privacyPolicyNeuland')}
					</Link>
				</li>
				<li className="mb-2">
					<Link href="/legal/datenschutz" className="text-terminal-text! group">
						<span className="group-hover:animate-cyberpunk">$</span>{' '}
						<span className="text-terminal-cyan">cat</span>{' '}
						{t('privacyPolicyWebsite')}
					</Link>
				</li>
				<li className="mb-2">
					<Link href="/legal/impressum" className="text-terminal-text! group">
						<span className="group-hover:animate-cyberpunk">$</span>{' '}
						<span className="text-terminal-cyan">cat</span> {t('legalNotice')}
					</Link>
				</li>
			</ul>
		</nav>
	)
}

export default TerminalLinks
