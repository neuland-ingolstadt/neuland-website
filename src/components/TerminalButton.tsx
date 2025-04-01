import type React from 'react'

interface TerminalButtonProps {
	children: React.ReactNode
	href?: string
	onClick?: () => void
	target?: string
	rel?: string
}

const TerminalButton: React.FC<TerminalButtonProps> = ({
	children,
	href,
	onClick,
	target,
	rel
}) => {
	if (href) {
		return (
			<a
				href={href}
				className="terminal-btn inline-block relative overflow-hidden group"
				onClick={onClick}
				target={target}
				rel={rel}
			>
				<span className="relative z-10 group-hover:text-terminal-text transition-colors duration-300">
					{children}
				</span>
				<span className="absolute bottom-0 left-0 w-full h-0 bg-terminal-bg transition-all duration-300 group-hover:h-full -z-0" />
			</a>
		)
	}

	return (
		<button
			className="terminal-btn inline-block relative overflow-hidden group"
			onClick={onClick}
			type="button"
		>
			<span className="relative z-10 group-hover:text-terminal-text transition-colors duration-300">
				{children}
			</span>
			<span className="absolute bottom-0 left-0 w-full h-0 bg-terminal-bg transition-all duration-300 group-hover:h-full -z-0" />
		</button>
	)
}

export default TerminalButton
