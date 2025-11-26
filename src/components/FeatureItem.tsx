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
				className={`p-6 flex flex-col h-full group transition-all duration-200 ${!isLastInRow ? 'border-r border-neutral-800' : ''} ${!isLastRow ? 'border-b border-neutral-800' : ''}`}
			>
				<div className="flex items-center gap-3 mb-3">
					<div className="shrink-0 w-6 h-6 flex items-center justify-center text-terminal-cyan">
						{icon}
					</div>
					<p className="font-semibold text-terminal-text text-base m-0">
						{title}
					</p>
				</div>
				<div className="flex-1 flex flex-col">
					<p className="text-sm text-gray-400 leading-relaxed m-0">
						{description}
					</p>
				</div>
			</motion.div>
		)
	}
)

export default FeatureItem
