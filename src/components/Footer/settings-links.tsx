'use client'

import type React from 'react'

const SettingsLinks: React.FC = () => {
	return (
		<nav>
			<ul>
				<li className="my-3 group">
					<a
						href="https://github.com/neuland-ingolstadt/neuland-website"
						rel="noreferrer noopener"
						target="_blank"
						className="group  text-terminal-text font-mono"
					>
						<span className="mr-2.5 group-hover:animate-cyberpunk">$</span>
						<span className="text-terminal-ink">git</span>&nbsp;
						<span className="text-terminal-ink">clone</span>
						&nbsp;neuland-website
					</a>
				</li>

				<li className="mt-3 group">
					<a
						href="https://status.neuland.ing"
						rel="noreferrer noopener"
						target="_blank"
						className="inline-flex items-center gap-1 text-terminal-text group"
					>
						<span className="mr-1 group-hover:animate-cyberpunk">$</span>
						<span className="text-terminal-ink">curl</span>
						<span>&nbsp;status.neuland.ing</span>
					</a>
				</li>
			</ul>
		</nav>
	)
}

export default SettingsLinks
