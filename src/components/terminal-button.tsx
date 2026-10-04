import type React from 'react'
import { Link } from '@/i18n/navigation'

interface TerminalButtonProps {
	children: React.ReactNode
	href?: string
	onClick?: () => void
	target?: string
	rel?: string
	className?: string
	dark?: boolean
	/** Filled brand-green CTA with glow (max. one per page) */
	primary?: boolean
}

const baseStyles =
	'inline-flex items-center justify-center gap-2 px-5 py-2.5 font-mono font-bold border border-terminal-cyan text-terminal-cyan rounded-md transition-all duration-200 hover:bg-terminal-cyan hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terminal-cyan/30 no-underline'

const TerminalButton: React.FC<TerminalButtonProps> = ({
	children,
	href,
	onClick,
	target,
	rel,
	className = '',
	dark = false,
	primary = false
}) => {
	const bgClass = dark ? 'bg-terminal-bg' : 'bg-transparent'
	const variantClass = primary
		? 'bg-terminal-cyan !text-black glow hover:brightness-110'
		: bgClass
	const styles = `${baseStyles} ${variantClass} ${className}`
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
