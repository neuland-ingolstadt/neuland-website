import { motion } from 'framer-motion'
import { type JSX, memo } from 'react'

interface FeatureItemProps {
	icon: JSX.Element
	title: string
	description: string
	isLastInRow?: boolean
	isLastRow?: boolean
}

const FeatureItem = memo(
	({ icon, title, description, isLastInRow, isLastRow }: FeatureItemProps) => {
		return (
			<motion.div
				initial={{ opacity: 0 }}
				whileInView={{ opacity: 1 }}
				transition={{ duration: 0.4 }}
				viewport={{ once: true }}
				className={`relative p-6 flex flex-col h-full group transition-all duration-300 overflow-hidden ${!isLastInRow ? 'border-r border-terminal-window-border' : ''} ${
					!isLastRow ? 'border-b border-terminal-window-border' : ''
				}`}
			>
				{/* Animated background on hover */}
				<div className="absolute inset-0 bg-gradient-to-br from-terminal-cyan/5 via-terminal-cyan/2 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

				{/* Special accent - corner bracket on hover */}
				<div className="absolute top-0 left-0 w-8 h-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
					<div className="absolute top-0 left-0 w-4 h-px bg-terminal-cyan/40" />
					<div className="absolute top-0 left-0 w-px h-4 bg-terminal-cyan/40" />
				</div>

				<div className="relative z-10 flex items-center gap-3 mb-3">
					<div className="shrink-0 w-6 h-6 flex items-center justify-center text-terminal-cyan group-hover:text-terminal-cyan transition-colors duration-300">
						{icon}
					</div>
					<p className="font-semibold text-terminal-text text-base m-0 group-hover:text-terminal-text transition-colors duration-300">
						{title}
					</p>
				</div>
				<div className="relative z-10 flex-1 flex flex-col">
					<p className="text-sm text-terminal-text/70 group-hover:text-terminal-text leading-relaxed m-0 transition-colors duration-300">
						{description}
					</p>
				</div>
			</motion.div>
		)
	}
)

export default FeatureItem
