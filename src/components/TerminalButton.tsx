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
				className="inline-flex items-center justify-center px-4 py-2 border border-terminal-cyan text-terminal-cyan bg-transparent hover:bg-terminal-cyan hover:text-terminal-bg transition-colors duration-300 mr-4 mb-4 rounded"
				onClick={onClick}
				target={target}
				rel={rel}
			>
				{children}
			</a>
		)
	}

	return (
		<button
			className="inline-flex items-center justify-center px-4 py-2 border border-terminal-cyan text-terminal-cyan bg-transparent hover:bg-terminal-cyan hover:text-terminal-bg transition-colors duration-300 mr-4 mb-4 rounded"
			onClick={onClick}
			type="button"
		>
			{children}
		</button>
	)
}

export default TerminalButton
