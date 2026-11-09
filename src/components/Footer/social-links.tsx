import { GithubIcon, InstagramIcon, LinkedinIcon } from 'lucide-react'
import type React from 'react'
import DiscordIcon from '../discord-icon'

const SocialLinks: React.FC = () => {
	return (
		<nav>
			<ul>
				<li className="mb-2">
					<a
						href="https://github.com/neuland-ingolstadt/"
						rel="noreferrer noopener"
						target="_blank"
						className="text-terminal-text! group"
					>
						<span className="text-terminal-ink transition-all duration-300 group-hover:text-terminal-text group-hover:animate-cyberpunk">
							<GithubIcon className="inline-block" size={16} />
						</span>{' '}
						GitHub
					</a>
				</li>
				<li className="mb-2">
					<a
						href="https://www.linkedin.com/company/neuland-ingolstadt"
						rel="noreferrer noopener"
						target="_blank"
						className="text-terminal-text! group"
					>
						<span className="text-terminal-ink transition-all duration-300 group-hover:text-terminal-text group-hover:animate-cyberpunk">
							<LinkedinIcon className="inline-block" size={16} />
						</span>{' '}
						LinkedIn
					</a>
				</li>
				<li className="mb-2">
					<a
						href="https://www.instagram.com/neuland_ingolstadt/"
						rel="noreferrer noopener"
						target="_blank"
						className="text-terminal-text! group"
					>
						<span className="text-terminal-ink transition-all duration-300 group-hover:text-terminal-text group-hover:animate-cyberpunk">
							<InstagramIcon className="inline-block" size={16} />
						</span>{' '}
						Instagram
					</a>
				</li>
				<li className="mb-2">
					<a
						href="https://discord.gg/gsxgQqvVue"
						rel="noreferrer noopener"
						target="_blank"
						className="text-terminal-text! group"
					>
						<span className="text-terminal-ink transition-all duration-300 group-hover:text-terminal-text group-hover:animate-cyberpunk">
							<DiscordIcon className="inline-block" size={16} />
						</span>{' '}
						Discord
					</a>
				</li>
			</ul>
		</nav>
	)
}

export default SocialLinks
