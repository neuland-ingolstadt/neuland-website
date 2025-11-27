'use client'

import type React from 'react'
import { useBackground } from '@/contexts/BackgroundContext'

const SettingsLinks: React.FC = () => {
	const { backgroundType, toggleBackgroundType } = useBackground()

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
				<li className="my-3 group">
					<a
						href="https://github.com/neuland-ingolstadt/neuland-website"
						rel="noreferrer noopener"
						target="_blank"
						className="group  text-terminal-text font-mono"
					>
						<span className="mr-2.5 group-hover:animate-cyberpunk">$</span>
						<span className="text-terminal-cyan">git</span>&nbsp;
						<span className="text-terminal-cyan">clone</span>
						&nbsp;neuland-website
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
						<span className="text-terminal-cyan">curl</span>
						<span>&nbsp;status.neuland.app</span>
					</a>
				</li>
			</ul>
		</nav>
	)
}

export default SettingsLinks
