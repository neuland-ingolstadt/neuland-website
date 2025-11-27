'use client'

import type React from 'react'
import { useBackground } from '@/contexts/BackgroundContext'
import { useI18n } from '@/i18n/provider'

const SettingsLinks: React.FC = () => {
	const { backgroundType, toggleBackgroundType } = useBackground()
	const { dictionary } = useI18n()
	const backgroundLabel =
		backgroundType === 'gameOfLife'
			? dictionary.settings.hideBackground
			: dictionary.settings.showBackground

	return (
		<nav>
			<ul>
				<li className="flex items-center text-terminal-text group">
					<button
						type="button"
						onClick={toggleBackgroundType}
						className="inline-flex items-center gap-1 border-none bg-transparent p-0 text-terminal-text font-mono cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-terminal-cyan/70"
					>
						<span className="mr-1 group-hover:animate-cyberpunk">$</span>
						<span className="text-terminal-cyan">{backgroundLabel}</span>
					</button>
				</li>
				<li className="my-3 group">
					<a
						href="https://github.com/neuland-ingolstadt/neuland-website"
						rel="noreferrer noopener"
						target="_blank"
						className="group  text-terminal-text font-mono"
					>
						<span className="mr-2.5 group-hover:animate-cyberpunk">$</span>
						<span className="text-terminal-cyan">{dictionary.settings.repoCommand}</span>
					</a>
				</li>

				<li className="mt-3 group">
					<a
						href="https://status.neuland.app/status/app"
						rel="noreferrer noopener"
						target="_blank"
						className="inline-flex items-center gap-1 text-terminal-text group"
					>
						<span className="mr-1 group-hover:animate-cyberpunk">$</span>
						<span className="text-terminal-cyan">
							{dictionary.settings.statusCommand}
						</span>
					</a>
				</li>
			</ul>
		</nav>
	)
}

export default SettingsLinks
