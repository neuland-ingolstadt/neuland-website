import type React from 'react'
import TerminalActionButton from '../Events/TerminalActionButton'

interface SimpleTerminalWindowProps {
	title: string
	children: React.ReactNode
	onClose?: () => void
}

const SimpleTerminalWindow: React.FC<SimpleTerminalWindowProps> = ({
	title,
	children,
	onClose
}) => {
	// Handler that converts close button click to onClose callback
	const handleButtonClick = (color: 'red' | 'yellow' | 'green') => {
		if (color === 'red' && onClose) {
			onClose()
		}
	}

	return (
		<div className="w-full bg-terminal-window border border-terminal-windowBorder rounded-md overflow-hidden mb-8">
			<div className="bg-terminal-windowTitle text-terminal-text px-4 py-2 flex items-center">
				<div className="flex">
					<TerminalActionButton
						color="red"
						onButtonClick={handleButtonClick}
						animationInProgress={!onClose}
					/>
					<div
						className="w-3 h-3 rounded-full mx-1 transition-opacity duration-200 bg-yellow-500"
						aria-hidden="true"
					/>
					<div
						className="w-3 h-3 rounded-full mx-1 transition-opacity duration-200 bg-green-500"
						aria-hidden="true"
					/>
				</div>
				<div className="ml-4 flex-1 text-center text-sm opacity-80">
					{title}
				</div>
			</div>
			<div className="p-4">{children}</div>
		</div>
	)
}

export default SimpleTerminalWindow
