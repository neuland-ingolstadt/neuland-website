import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle
} from '@/components/ui/card'
import { motion } from 'framer-motion'
import { ChevronRight, Code, ExternalLink } from 'lucide-react'
import type React from 'react'

export interface ProjectLink {
	label: string
	url: string
}

export interface ProjectDetails {
	id: string
	title: string
	description: string
	links: ProjectLink[]
	tags?: string[]
	longDescription?: string
	imageUrl?: string
	additionalInfo?: string
}

interface ProjectCardProps {
	project: ProjectDetails
	onClick: () => void
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onClick }) => {
	return (
		<motion.div
			whileHover={{ scale: 1.03 }}
			transition={{ type: 'spring', stiffness: 300 }}
			className="h-full p-2" // Added padding to prevent cut-off
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			exit={{ opacity: 0, scale: 0.95 }}
			style={{ transformOrigin: 'center' }} // Ensure scaling from center
		>
			<Card
				className="h-full rounded-xl bg-terminal-window border-terminal-windowBorder cursor-pointer group relative overflow-hidden flex flex-col"
				onClick={onClick}
			>
				<CardHeader className="bg-terminal-windowTitle/50 pb-1">
					<CardTitle className="text-md font-bold flex items-center gap-2 text-terminal-cyan">
						<Code size={18} className="text-terminal-cyan" />
						{project.title}
					</CardTitle>
				</CardHeader>
				<CardContent className="pt-4 pb-3 flex-grow overflow-auto">
					<p className="text-sm mb-3 text-terminal-text">
						{project.description}
					</p>

					{project.tags && project.tags.length > 0 && (
						<div className="flex flex-wrap gap-1 mb-3">
							{project.tags.map((tag, index) => (
								<span
									// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
									key={tag + index}
									className="text-xs px-2 py-1 rounded-sm bg-terminal-darkGreen bg-opacity-30 text-terminal-mediumGreen"
								>
									{tag}
								</span>
							))}
						</div>
					)}
				</CardContent>
				<CardFooter className="text-xs flex items-center justify-between">
					<div className="flex gap-2">
						{project.links.slice(0, 3).map((link) => (
							<a
								key={link.label}
								href={link.url}
								target="_blank"
								rel="noreferrer noopener"
								className="text-terminal-cyan flex items-center hover:text-terminal-highlight transition-colors"
								onClick={(e) => e.stopPropagation()}
							>
								<ExternalLink size={12} className="mr-1" />
								{link.label}
							</a>
						))}
					</div>
					<motion.div
						className="text-terminal-cyan flex items-center"
						initial={{ x: 0 }}
						whileHover={{ x: 3 }}
					>
						Details{' '}
						<ChevronRight
							size={14}
							className="ml-1 group-hover:translate-x-1 transition-transform"
						/>
					</motion.div>
				</CardFooter>

				{/* Terminal glow effect on hover */}
				<div className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-300 rounded-xl">
					<div className="absolute inset-0 border border-terminal-cyan shadow-[0_0_10px_rgba(51,195,240,0.3)] rounded-xl" />
				</div>
			</Card>
		</motion.div>
	)
}

export default ProjectCard
