import { ChevronRight, Code, ExternalLink } from 'lucide-react'
import type React from 'react'
import { memo, useCallback } from 'react'
import { markerRotation } from '@/lib/utils'

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
	const handleLinkClick = useCallback((e: React.MouseEvent) => {
		e.stopPropagation()
	}, [])

	const handleKeyDown = useCallback(
		(e: React.KeyboardEvent) => {
			if (e.key === 'Enter' || e.key === ' ') {
				e.preventDefault()
				onClick()
			}
		},
		[onClick]
	)

	return (
		<button
			type="button"
			className="h-full border border-terminal-windowTitle bg-terminal-window cursor-pointer group relative overflow-hidden flex flex-col transition-all duration-200 hover:border-terminal-window-border text-left w-full"
			onClick={onClick}
			onKeyDown={handleKeyDown}
		>
			{/* Subtle background effect */}
			<div className="absolute inset-0 bg-gradient-to-br from-terminal-cyan/3 via-transparent to-terminal-cyan/3 pointer-events-none" />

			{/* Project Image */}
			{project.imageUrl && (
				<div className="w-full h-40 bg-terminal-window overflow-hidden relative">
					<img
						src={project.imageUrl}
						alt={project.title}
						className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
					/>
					<div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
				</div>
			)}

			<div className="p-5 pb-2 flex flex-col items-start gap-2">
				<div className="font-mono text-xl font-bold flex items-center gap-2 text-terminal-text">
					<Code
						size={20}
						className="text-terminal-text/70 group-hover:text-terminal-ink transition-colors duration-200"
					/>
					{project.title}
				</div>
				{/* Tags */}
				{project.tags && project.tags.length > 0 && (
					<div className="flex flex-wrap gap-2 mt-1">
						{project.tags.map((tag, index) => (
							<span
								key={index}
								className="text-xs px-2.5 py-1 bg-terminal-windowTitle text-terminal-text/70 font-medium rounded-sm"
							>
								{tag}
							</span>
						))}
					</div>
				)}
			</div>
			<div className="pt-2 pb-4 px-5 grow overflow-auto">
				<p className="text-base text-terminal-text/70 mb-2 leading-relaxed font-sans font-normal">
					{project.description}
				</p>
			</div>
			<div className="px-5 pb-5 pt-0 flex items-center justify-start min-h-[56px] relative">
				<div className="flex gap-2 flex-wrap w-[calc(100%-60px)]">
					{project.links.slice(0, 3).map((link) => (
						<a
							key={link.label}
							href={link.url}
							target="_blank"
							rel="noreferrer noopener"
							className="inline-flex items-center gap-1 px-2.5 py-1 bg-terminal-card text-terminal-text/70 font-medium hover:text-terminal-text hover:border-terminal-cyan [:root[data-theme=light]_&]:hover:border-transparent transition-colors border border-terminal-cyan/60 [:root[data-theme=light]_&]:border-transparent whitespace-nowrap max-w-full truncate no-underline text-xs"
							onClick={handleLinkClick}
						>
							<ExternalLink size={12} className="mr-1" />
							{link.label}
						</a>
					))}
				</div>
			</div>

			{/* Floating Details Button, with a marker stroke behind it in light mode */}
			<span
				className="marker-stroke absolute bottom-3 right-3 z-10 flex items-center justify-center px-2.5 py-1.5"
				style={{ transform: markerRotation(project.id) }}
			>
				<ChevronRight
					size={24}
					className="group-hover:translate-x-1 transition-transform text-terminal-text/70 group-hover:text-terminal-ink"
				/>
			</span>
		</button>
	)
}

export default memo(ProjectCard)
