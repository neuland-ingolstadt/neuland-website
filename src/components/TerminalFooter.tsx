import { GithubIcon, InstagramIcon, LinkedinIcon } from 'lucide-react'
import type React from 'react'
import { Link } from 'react-router-dom'

const TerminalFooter: React.FC = () => {
	return (
		<div className="cols grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-terminal-muted pt-6 my-8 text-terminal-text">
			<nav>
				<ul>
					<li className="mb-2">
						<Link to="/satzung" className="!text-terminal-text">
							$ <span className="text-terminal-cyan">cat</span> Satzung
						</Link>
					</li>
					<li className="mb-2">
						<Link to="/datenschutzordnung" className="!text-terminal-text">
							$ <span className="text-terminal-cyan">cat</span>{' '}
							Datenschutzordnung
						</Link>
					</li>
					<li className="mb-2">
						<Link to="/datenschutzhinweise" className="!text-terminal-text">
							$ <span className="text-terminal-cyan">cat</span>{' '}
							Datenschutzhinweise
						</Link>
					</li>
					<li className="mb-2">
						<Link to="/impressum" className="!text-terminal-text">
							$ <span className="text-terminal-cyan">cat</span> Impressum
						</Link>
					</li>
				</ul>
			</nav>
			<nav>
				<ul>
					<li className="mb-2">
						<a
							href="https://github.com/neuland-ingolstadt/"
							rel="noreferrer noopener"
							target="_blank"
							className="!text-terminal-text"
						>
							<span className="text-terminal-cyan">
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
							className="!text-terminal-text"
						>
							<span className="text-terminal-cyan">
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
							className="!text-terminal-text"
						>
							<span className="text-terminal-cyan">
								<InstagramIcon className="inline-block" size={16} />
							</span>{' '}
							instagram.com
						</a>
					</li>
					<li className="mb-2 mt-5 opacity-80 hover:opacity-100">
						<a
							href="https://github.com/neuland-ingolstadt/neuland-website"
							rel="noreferrer noopener"
							target="_blank"
							className="!text-terminal-text"
						>
							$ <span className="text-terminal-cyan">git clone</span>{' '}
							neuland-website
							<span className="ml-1 text-terminal-yellow">✨</span>
						</a>
					</li>
				</ul>
			</nav>
		</div>
	)
}

export default TerminalFooter
