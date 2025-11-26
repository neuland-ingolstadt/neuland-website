import type React from 'react'
import { cn } from '@/lib/utils'

export const GlassBox = ({
	children,
	className,
	...props
}: React.HTMLAttributes<HTMLDivElement>) => (
	<div
		className={cn(
			'border border-terminal-text/15 shadow-xl bg-gradient-to-br from-white/10 to-terminal-windowTitle/60 backdrop-blur-xl transition-transform duration-300 relative overflow-hidden',
			className
		)}
		style={{
			background:
				'linear-gradient(135deg, rgba(34,193,195,0.10) 0%, rgba(17,17,17,0.70) 100%)',
			backdropFilter: 'blur(16px)',
			WebkitBackdropFilter: 'blur(16px)'
		}}
		{...props}
	>
		{children}
		{/* Glass border hover effect */}
		<div className="absolute inset-0 pointer-events-none rounded-2xl border border-terminal-cyan/30 opacity-0 group-hover:opacity-100 hover:opacity-100 transition-opacity duration-300 shadow-[0_0_24px_rgba(51,195,240,0.15)]" />
	</div>
)

export default GlassBox
