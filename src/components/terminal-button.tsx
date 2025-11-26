import type React from 'react'

interface TerminalButtonProps {
	children: React.ReactNode
	href?: string
	onClick?: () => void
	target?: string
	rel?: string
	className?: string
	dark?: boolean
}

const baseStyles =
	'inline-flex items-center justify-center gap-2 px-5 py-2.5 font-semibold border border-neutral-800 text-terminal-text transition-all duration-200 hover:border-neutral-700 focus:outline-none focus:ring-2 focus:ring-terminal-cyan/60 focus:ring-offset-2 focus:ring-offset-neutral-900 no-underline'

const TerminalButton: React.FC<TerminalButtonProps> = ({
	children,
	href,
	onClick,
	target,
	rel,
	className = '',
	dark = false
}) => {
	const bgClass = dark ? 'bg-black' : 'bg-neutral-900'
	const styles = `${baseStyles} ${bgClass} ${className}`
	const content = <span className="flex items-center gap-2">{children}</span>

	if (href) {
		return (
			<a
				href={href}
				className={styles}
				onClick={onClick}
				target={target}
				rel={rel}
			>
				{content}
			</a>
		)
	}

	return (
		<button className={styles} onClick={onClick} type="button">
			{content}
		</button>
	)
}

export default TerminalButton
