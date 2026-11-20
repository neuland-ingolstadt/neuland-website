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
	'inline-flex items-center justify-center gap-2 px-5 py-2.5 font-mono font-bold border border-terminal-cyan text-terminal-ink transition-all duration-200 hover:bg-terminal-cyan hover:text-terminal-onAccent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terminal-cyan/30 no-underline'

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
	// Light mode: secondary is a black outline that fills black on hover
	const bgClass = `${dark ? 'bg-terminal-bg' : 'bg-transparent'} [:root[data-theme=light]_&]:border-black [:root[data-theme=light]_&]:text-black [:root[data-theme=light]_&]:hover:bg-black [:root[data-theme=light]_&]:hover:text-white`
	const variantClass = primary
		? 'bg-terminal-cyan !text-terminal-onAccent glow hover:brightness-110 [:root[data-theme=light]_&]:border-black [:root[data-theme=light]_&]:bg-black [:root[data-theme=light]_&]:!text-white [:root[data-theme=light]_&]:shadow-none [:root[data-theme=light]_&]:hover:!bg-neutral-700 [:root[data-theme=light]_&]:hover:border-neutral-700 [:root[data-theme=light]_&]:hover:brightness-100'
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
