// Monochrome EXP logo: the webp is used as a mask and painted in the text color,
// so it follows the theme (white on dark, dark on light).
export default function ExpLogo({
	className = '',
	label = 'EXP Software GmbH'
}: {
	className?: string
	label?: string
}) {
	const mask = "url('/assets/exp.webp') center / contain no-repeat"

	return (
		<span
			role="img"
			aria-label={label}
			className={`block aspect-[3223/1085] bg-terminal-text ${className}`}
			style={{ mask, WebkitMask: mask }}
		/>
	)
}
