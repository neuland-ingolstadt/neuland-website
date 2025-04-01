import { useEffect, useState } from 'react'
import type React from 'react'
import TerminalCursor from './TerminalCursor'

const TerminalHeader: React.FC = () => {
	const [scrolled, setScrolled] = useState(false)

	useEffect(() => {
		const handleScroll = () => {
			const isScrolled = window.scrollY > 10
			if (isScrolled !== scrolled) {
				setScrolled(isScrolled)
			}
		}

		window.addEventListener('scroll', handleScroll, { passive: true })
		return () => {
			window.removeEventListener('scroll', handleScroll)
		}
	}, [scrolled])

	return (
		<div
			className={`terminal-nav fixed top-0 left-0 right-0 flex justify-between items-center py-4 border-b border-terminal-muted z-50 transition-all duration-200 ${scrolled ? 'bg-terminal-bg/60 backdrop-blur-md' : 'bg-terminal-bg'}`}
		>
			<div className="container px-4 sm:px-6 mx-auto flex justify-between items-center">
				<div className="terminal-logo flex items-center">
					<a href="/" className="flex items-center no-underline">
						<div className="logo">
							<img
								src="/assets/logo_dark.svg"
								alt="Neuland Ingolstadt e.V."
								className="h-10"
							/>
						</div>
						<div className="ml-4 hidden sm:block">
							<span className="text-terminal-cyan">root@neuland</span>
							<span className="text-terminal-text">:</span>
							<span className="text-terminal-cyan">~</span>
							<span className="text-terminal-text">$</span>
							<TerminalCursor />
						</div>
					</a>
				</div>
				<nav className="terminal-menu">
					<ul className="flex">
						<li>
							<a
								href="https://blog.neuland-ingolstadt.de/"
								rel="noreferrer noopener"
								target="_blank"
								className="px-3 py-2 rounded transition-colors duration-300 text-terminal-text"
							>
								Blog
							</a>
						</li>
						<li>
							<a
								href="https://wiki.informatik.sexy/books/einfuhrung/page/willkommen"
								rel="noreferrer noopener"
								target="_blank"
								className="px-3 py-2 rounded transition-colors duration-300 text-terminal-text"
							>
								Mitgliederbereich
							</a>
						</li>
					</ul>
				</nav>
			</div>
		</div>
	)
}

export default TerminalHeader
