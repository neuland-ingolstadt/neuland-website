import { GithubIcon, InstagramIcon, LinkedinIcon } from 'lucide-react'
import type React from 'react'
import MastodonIcon from './mastodon-icon'

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
						<span className="text-terminal-cyan transition-all duration-300 group-hover:text-terminal-text group-hover:animate-cyberpunk">
							<GithubIcon className="inline-block" size={16} />
						</span>{' '}
						github.com
					</a>
				</li>
				<li className="mb-2">
					<a
						href="https://www.linkedin.com/company/neuland-ingolstadt"
						rel="noreferrer noopener"
						target="_blank"
						className="text-terminal-text! group"
					>
						<span className="text-terminal-cyan transition-all duration-300 group-hover:text-terminal-text group-hover:animate-cyberpunk">
							<LinkedinIcon className="inline-block" size={16} />
						</span>{' '}
						linkedin.com
					</a>
				</li>
				<li className="mb-2">
					<a
						href="https://www.instagram.com/neuland_ingolstadt/"
						rel="noreferrer noopener"
						target="_blank"
						className="text-terminal-text! group"
					>
						<span className="text-terminal-cyan transition-all duration-300 group-hover:text-terminal-text group-hover:animate-cyberpunk">
							<InstagramIcon className="inline-block" size={16} />
						</span>{' '}
						instagram.com
					</a>
				</li>
				<li className="mb-2">
					<a
						href="https://social.tchncs.de/@neuland"
						rel="noreferrer noopener"
						target="_blank"
						className="text-terminal-text! group"
					>
						<span className="text-terminal-cyan transition-all duration-300 group-hover:text-terminal-text group-hover:animate-cyberpunk">
							<MastodonIcon className="inline-block w-4 h-4 fill-current" />
						</span>{' '}
						mastodon.social
					</a>
				</li>
			</ul>
		</nav>
	)
}

export default SocialLinks
