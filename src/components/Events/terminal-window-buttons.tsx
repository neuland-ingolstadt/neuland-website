import type React from 'react'
import TerminalActionButton from './terminalaction-button'

type ButtonColor = 'red' | 'yellow' | 'green'

interface TerminalWindowButtonsProps {
	onButtonClick: (color: ButtonColor) => void
	animationInProgress: boolean
}

const TerminalWindowButtons: React.FC<TerminalWindowButtonsProps> = ({
	onButtonClick,
	animationInProgress
}) => {
	return (
		<div className="flex">
			<TerminalActionButton
				color="red"
				onButtonClick={onButtonClick}
				animationInProgress={animationInProgress}
			/>
			<TerminalActionButton
				color="yellow"
				onButtonClick={onButtonClick}
				animationInProgress={animationInProgress}
			/>
			<TerminalActionButton
				color="green"
				onButtonClick={onButtonClick}
				animationInProgress={animationInProgress}
			/>
		</div>
	)
}

export default TerminalWindowButtons
