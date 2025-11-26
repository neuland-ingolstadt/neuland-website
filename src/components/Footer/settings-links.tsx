'use client'

import type React from 'react'
import { useBackground } from '@/contexts/BackgroundContext'

const SettingsLinks: React.FC = () => {
	const { backgroundType, toggleBackgroundType } = useBackground()

	return (
		<nav>
			<ul>
				<li className="mt-3 flex items-center text-terminal-text">
					<button
						type="button"
						onClick={toggleBackgroundType}
						className="inline-flex items-center gap-1 border-none bg-transparent p-0 text-terminal-text font-mono cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-terminal-cyan/70"
					>
						<span className="mr-1">$</span>
						{backgroundType === 'gameOfLife' ? (
							<>
								<span className="text-terminal-cyan">hide</span>
								<span>&nbsp;game of life</span>
							</>
						) : (
							<>
								<span className="text-terminal-cyan">show</span>
								<span>&nbsp;game of life</span>
							</>
						)}
					</button>
				</li>
				<li className="mb-2">
					<a
						href="https://github.com/neuland-ingolstadt/neuland-website"
						rel="noreferrer noopener"
						target="_blank"
						className="group no-underline text-terminal-text font-mono"
					>
						<span className="mr-2.5">$</span>
						<span className="text-terminal-cyan">git</span>&nbsp;
						<span className="text-terminal-cyan">clone</span>
						&nbsp;neuland-website
					</a>
				</li>

				<li className="mt-3">
					<a
						href="https://status.neuland.app/status/app"
						rel="noreferrer noopener"
						target="_blank"
						className="inline-flex items-center gap-1 text-terminal-text group no-underline"
					>
						<span className="mr-1">$</span>
						<span className="text-terminal-cyan">curl</span>
						<span>&nbsp;status.neuland.app</span>
					</a>
				</li>
			</ul>
		</nav>
	)
}

export default SettingsLinks
