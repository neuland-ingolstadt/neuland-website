import Link from 'next/link'
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
	'inline-flex items-center justify-center gap-2 px-5 py-2.5 font-semibold border border-terminal-window-border text-terminal-text transition-all duration-200 hover:border-sidebar-border/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terminal-cyan/30 no-underline'

const TerminalButton: React.FC<TerminalButtonProps> = ({
	children,
	href,
	onClick,
	target,
	rel,
	className = '',
	dark = false
}) => {
	const bgClass = dark ? 'bg-terminal-bg' : 'bg-terminal-window'
	const styles = `${baseStyles} ${bgClass} ${className}`
	const content = <span className="flex items-center gap-2">{children}</span>

	if (href) {
		// Check if it's an external link
		const isExternal =
			href.startsWith('http://') ||
			href.startsWith('https://') ||
			href.startsWith('mailto:') ||
			href.startsWith('tel:') ||
			target === '_blank'

		if (isExternal) {
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

		// Use Next.js Link for internal links
		return (
			<Link
				href={href}
				className={styles}
				onClick={onClick}
				target={target}
				rel={rel}
			>
				{content}
			</Link>
		)
	}

	return (
		<button className={styles} onClick={onClick} type="button">
			{content}
		</button>
	)
}

export default TerminalButton
