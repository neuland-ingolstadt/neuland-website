import { useEffect, useState } from 'react'
import type React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const TerminalHeader: React.FC = () => {
	const [scrolled, setScrolled] = useState(false)
	const navigate = useNavigate()
	const isJune = new Date().getMonth() === 5

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

	const handleHomeClick = (e: React.MouseEvent) => {
		e.preventDefault()
		navigate('/')
	}

	return (
		<div
			className={`terminal-nav fixed top-0 left-0 right-0 flex justify-between items-center py-4 border-b border-terminal-windowBorder z-50 transition-all duration-200 ${scrolled ? 'bg-terminal-bg/60 backdrop-blur-md' : 'bg-terminal-bg'}`}
		>
			<div className="container px-4 sm:px-6 mx-auto flex justify-between items-center">
				<div className="terminal-logo flex flex-col items-start">
					<Link
						to="/"
						className="flex items-center no-underline"
						onClick={handleHomeClick}
					>
						<div className="logo">
							<img
								src="/assets/logo_dark.svg"
								alt="Neuland Ingolstadt e.V."
								className="h-10"
							/>
						</div>
					</Link>
					{isJune && (
						<div className="mt-1 w-full h-0.5 rounded overflow-hidden flex">
							<div className="h-full w-1/6 bg-red-500" />
							<div className="h-full w-1/6 bg-orange-500" />
							<div className="h-full w-1/6 bg-yellow-400" />
							<div className="h-full w-1/6 bg-green-500" />
							<div className="h-full w-1/6 bg-blue-500" />
							<div className="h-full w-1/6 bg-purple-500" />
						</div>
					)}
				</div>
				<nav className="terminal-menu">
					<ul className="flex gap-2">
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
								Login
							</a>
						</li>
					</ul>
				</nav>
			</div>
		</div>
	)
}

export default TerminalHeader
