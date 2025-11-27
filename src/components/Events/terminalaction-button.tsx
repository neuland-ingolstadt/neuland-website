import type React from 'react'

type ButtonColor = 'red' | 'yellow' | 'green'

interface TerminalActionButtonProps {
	color: ButtonColor
	onButtonClick: (color: ButtonColor) => void
	animationInProgress: boolean
}

const CONFIG: Record<
	ButtonColor,
	{ label: string; className: string; pingClass: string }
> = {
	red: {
		label: 'Close terminal',
		className: 'bg-red-500',
		pingClass: 'bg-red-500'
	},
	yellow: {
		label: 'Minimize terminal',
		className: 'bg-yellow-500',
		pingClass: 'bg-yellow-400'
	},
	green: {
		label: 'Maximize terminal',
		className: 'bg-green-500',
		pingClass: 'bg-green-500'
	}
}

const TerminalActionButton: React.FC<TerminalActionButtonProps> = ({
	color,
	onButtonClick,
	animationInProgress
}) => {
	const { label, className, pingClass } = CONFIG[color]
	const isDisabled = animationInProgress

	return (
		<div className="relative group">
			<button
				className={`p-1 -m-1 ${isDisabled ? 'cursor-not-allowed' : 'cursor-pointer'}`}
				onClick={() => !isDisabled && onButtonClick(color)}
				onKeyDown={(e) =>
					e.key === 'Enter' && !isDisabled && onButtonClick(color)
				}
				disabled={isDisabled}
				aria-label={label}
				type="button"
			>
				<div
					className={`w-3 h-3 rounded-full mx-1 transition-opacity duration-200 ${className} ${isDisabled ? 'opacity-50' : ''}`}
				/>
			</button>
			{!isDisabled && (
				<div className="absolute inset-0 flex items-center justify-center pointer-events-none">
					<span
						className={`rounded-full ${pingClass} opacity-0 group-hover:animate-ping group-hover:opacity-50 h-3 w-3`}
					/>
				</div>
			)}
		</div>
	)
}

export default TerminalActionButton
