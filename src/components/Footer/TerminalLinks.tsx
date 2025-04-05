import type React from 'react'
import { Link } from 'react-router-dom'

const TerminalLinks: React.FC = () => {
	return (
		<nav>
			<ul>
				<li className="mb-2">
					<Link to="/satzung" className="!text-terminal-text group">
						<span className="group-hover:animate-cyberpunk">$</span>{' '}
						<span className="text-terminal-cyan">cat</span> Satzung
					</Link>
				</li>
				<li className="mb-2">
					<Link to="/datenschutzordnung" className="!text-terminal-text group">
						<span className="group-hover:animate-cyberpunk">$</span>{' '}
						<span className="text-terminal-cyan">cat</span> Datenschutz Neuland
					</Link>
				</li>
				<li className="mb-2">
					<Link to="/datenschutz" className="!text-terminal-text group">
						<span className="group-hover:animate-cyberpunk">$</span>{' '}
						<span className="text-terminal-cyan">cat</span> Datenschutz Website
					</Link>
				</li>
				<li className="mb-2">
					<Link to="/impressum" className="!text-terminal-text group">
						<span className="group-hover:animate-cyberpunk">$</span>{' '}
						<span className="text-terminal-cyan">cat</span> Impressum
					</Link>
				</li>
			</ul>
		</nav>
	)
}

export default TerminalLinks
