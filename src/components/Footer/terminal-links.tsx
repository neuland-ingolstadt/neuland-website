import Link from 'next/link'
import type React from 'react'

const TerminalLinks: React.FC = () => {
	return (
		<nav>
			<ul>
				<li className="mb-2">
					<Link href="/legal/satzung" className="text-terminal-text! group">
						<span className="group-hover:animate-cyberpunk">$</span>{' '}
						<span className="text-terminal-cyan">cat</span> Satzung
					</Link>
				</li>
				<li className="mb-2">
					<Link
						href="/legal/datenschutzordnung"
						className="text-terminal-text! group"
					>
						<span className="group-hover:animate-cyberpunk">$</span>{' '}
						<span className="text-terminal-cyan">cat</span> Datenschutz Neuland
					</Link>
				</li>
				<li className="mb-2">
					<Link href="/legal/datenschutz" className="text-terminal-text! group">
						<span className="group-hover:animate-cyberpunk">$</span>{' '}
						<span className="text-terminal-cyan">cat</span> Datenschutz Website
					</Link>
				</li>
				<li className="mb-2">
					<Link href="/legal/impressum" className="text-terminal-text! group">
						<span className="group-hover:animate-cyberpunk">$</span>{' '}
						<span className="text-terminal-cyan">cat</span> Impressum
					</Link>
				</li>
			</ul>
		</nav>
	)
}

export default TerminalLinks
