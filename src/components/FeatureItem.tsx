import { motion } from 'framer-motion'
import { type JSX, memo } from 'react'

interface FeatureItemProps {
	icon: JSX.Element
	title: string
	description: string
	delay: number
}

const FeatureItem = memo(
	({ icon, title, description, delay }: FeatureItemProps) => {
		return (
			<motion.div
				initial={{ opacity: 0, x: 20 }}
				whileInView={{ opacity: 1, x: 0 }}
				transition={{ duration: 0.5, delay }}
				viewport={{ once: true }}
				className="flex items-start"
			>
				<div className="shrink-0 w-10 h-10 flex items-center justify-center rounded-full bg-black/60 mr-4">
					{icon}
				</div>
				<div>
					<h4 className="font-medium text-terminal-cyan leading-tight mb-0">
						{title}
					</h4>
					<p className="text-sm opacity-90 mt-0.5">{description}</p>
				</div>
			</motion.div>
		)
	}
)

export default FeatureItem
