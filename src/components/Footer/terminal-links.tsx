'use client'

import Link from 'next/link'
import type React from 'react'
import { useI18n } from '@/i18n/provider'
import { buildLocalizedPath } from '@/i18n/routing'

const TerminalLinks: React.FC = () => {
	const { dictionary, locale } = useI18n()
	const links = [
		{ href: '/legal/satzung', label: dictionary.legalLinks.statutes },
		{
			href: '/legal/datenschutzordnung',
			label: dictionary.legalLinks.privacyClub
		},
		{
			href: '/legal/datenschutz',
			label: dictionary.legalLinks.privacyWebsite
		},
		{ href: '/legal/impressum', label: dictionary.legalLinks.imprint }
	]

	return (
		<nav>
			<ul>
				{links.map((link) => (
					<li className="mb-2" key={link.href}>
						<Link
							href={buildLocalizedPath(link.href, locale)}
							className="text-terminal-text! group"
						>
							<span className="group-hover:animate-cyberpunk">$</span>{' '}
							<span className="text-terminal-cyan">{link.label}</span>
						</Link>
					</li>
				))}
			</ul>
		</nav>
	)
}

export default TerminalLinks
