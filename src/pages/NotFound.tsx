import TerminalButton from '@/components/TerminalButton'
import TerminalHeader from '@/components/TerminalHeader'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const NotFound = () => {
	const location = useLocation()

	useEffect(() => {
		console.error(
			'404 Error: User attempted to access non-existent route:',
			location.pathname
		)
	}, [location.pathname])

	return (
		<div className="container px-4 sm:px-6 mx-auto pt-20 relative z-10">
			<TerminalHeader />
			<div className="pt-20 flex items-center justify-center center">
				<div className="text-center">
					<h1 className="text-8xl font-bold mb-4 text-terminal-lightGreen animate-glitch relative">
						404
					</h1>
					<p className="text-xl text-terminal-text mb-4">
						Oops! Page not found
					</p>
					<TerminalButton href="/">Zur Startseite</TerminalButton>
				</div>
			</div>
		</div>
	)
}

export default NotFound
