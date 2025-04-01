import type React from 'react'
import { useState } from 'react'
import '../styles/animations.css'

interface TerminalWindowProps {
	title: string
	children: React.ReactNode
	onClose?: () => void
}

const TerminalWindow: React.FC<TerminalWindowProps> = ({
	title,
	children,
	onClose
}) => {
	const [activeGlow, setActiveGlow] = useState<
		'red' | 'yellow' | 'green' | null
	>(null)
	const [confetti, setConfetti] = useState<JSX.Element[]>([])

	const createConfetti = () => {
		const elements: JSX.Element[] = []
		const colors = ['#ff3b30', '#ffcc00', '#28cd41', '#33C3F0']

		for (let i = 0; i < 30; i++) {
			const left = `${Math.random() * 100}%`
			const color = colors[Math.floor(Math.random() * colors.length)]
			const delay = `${Math.random() * 1}s`

			elements.push(
				<div
					key={i}
					className="confetti"
					style={{
						left,
						backgroundColor: color,
						animationDelay: delay
					}}
				/>
			)
		}
		return elements
	}

	const handleButtonClick = (color: 'red' | 'yellow' | 'green') => {
		if (color === 'red' && onClose) {
			onClose()
			return
		}
		setActiveGlow(color)
		setConfetti(createConfetti())
		setTimeout(() => {
			setActiveGlow(null)
			setConfetti([])
		}, 3000)
	}

	return (
		<div
			className={`terminal-window relative ${activeGlow ? `terminal-glow-${activeGlow}` : ''}`}
		>
			{confetti}
			<div className="terminal-window-title">
				<div className="flex">
					<div
						className="window-button window-button-red"
						onClick={() => handleButtonClick('red')}
						onKeyDown={() => handleButtonClick('red')}
					/>
					<div
						className="window-button window-button-yellow"
						onClick={() => handleButtonClick('yellow')}
						onKeyDown={() => handleButtonClick('yellow')}
					/>
					<div
						className="window-button window-button-green"
						onClick={() => handleButtonClick('green')}
						onKeyDown={() => handleButtonClick('green')}
					/>
				</div>
				<div className="ml-4 flex-1 text-center text-sm opacity-80">
					{title}
				</div>
			</div>
			<div className="terminal-window-content">{children}</div>
		</div>
	)
}

export default TerminalWindow
