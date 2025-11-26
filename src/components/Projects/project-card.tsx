import { ChevronRight, Code, ExternalLink } from 'lucide-react'
import type React from 'react'
import { memo, useCallback } from 'react'

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
			className="h-full border border-neutral-800 bg-[#0b0b0b] cursor-pointer group relative overflow-hidden flex flex-col transition-all duration-200 hover:border-neutral-700 text-left w-full"
			onClick={onClick}
			onKeyDown={handleKeyDown}
		>
			{/* Subtle background effect */}
			<div className="absolute inset-0 bg-gradient-to-br from-terminal-cyan/3 via-transparent to-terminal-cyan/3 pointer-events-none" />

			{/* Creative accent - corner brackets on all corners */}
			<div className="absolute top-0 left-0 w-12 h-12">
				<div className="absolute top-0 left-0 w-6 h-px bg-terminal-cyan/30 group-hover:bg-terminal-cyan/50 transition-colors duration-200" />
				<div className="absolute top-0 left-0 w-px h-6 bg-terminal-cyan/30 group-hover:bg-terminal-cyan/50 transition-colors duration-200" />
			</div>
			<div className="absolute top-0 right-0 w-12 h-12">
				<div className="absolute top-0 right-0 w-6 h-px bg-terminal-cyan/30 group-hover:bg-terminal-cyan/50 transition-colors duration-200" />
				<div className="absolute top-0 right-0 w-px h-6 bg-terminal-cyan/30 group-hover:bg-terminal-cyan/50 transition-colors duration-200" />
			</div>
			<div className="absolute bottom-0 left-0 w-12 h-12">
				<div className="absolute bottom-0 left-0 w-6 h-px bg-terminal-cyan/30 group-hover:bg-terminal-cyan/50 transition-colors duration-200" />
				<div className="absolute bottom-0 left-0 w-px h-6 bg-terminal-cyan/30 group-hover:bg-terminal-cyan/50 transition-colors duration-200" />
			</div>
			<div className="absolute bottom-0 right-0 w-12 h-12">
				<div className="absolute bottom-0 right-0 w-6 h-px bg-terminal-cyan/30 group-hover:bg-terminal-cyan/50 transition-colors duration-200" />
				<div className="absolute bottom-0 right-0 w-px h-6 bg-terminal-cyan/30 group-hover:bg-terminal-cyan/50 transition-colors duration-200" />
			</div>

			{/* Project Image */}
			{project.imageUrl && (
				<div className="w-full h-40 bg-[#0b0b0b] overflow-hidden relative">
					{/** biome-ignore lint/performance/noImgElement: TODO */}
					<img
						src={project.imageUrl}
						alt={project.title}
						className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
					/>
					<div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
				</div>
			)}

			<div className="p-5 pb-2 flex flex-col items-start gap-2">
				<div className="text-xl font-semibold flex items-center gap-2 text-terminal-text">
					<Code
						size={20}
						className="text-gray-400 group-hover:text-terminal-cyan transition-colors duration-200"
					/>
					{project.title}
				</div>
				{/* Tags */}
				{project.tags && project.tags.length > 0 && (
					<div className="flex flex-wrap gap-2 mt-1">
						{project.tags.map((tag, index) => (
							<span
								key={index}
								className="text-xs px-2.5 py-1 bg-neutral-800 text-gray-400 font-medium border border-neutral-800"
							>
								{tag}
							</span>
						))}
					</div>
				)}
			</div>
			<div className="pt-2 pb-4 px-5 grow overflow-auto">
				<p className="text-base text-gray-400 mb-2 leading-relaxed">
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
							className="inline-flex items-center gap-1 px-2.5 py-1 bg-black text-gray-400 font-medium hover:text-white hover:border-neutral-700 transition-colors border border-neutral-800 whitespace-nowrap max-w-full truncate no-underline text-xs"
							onClick={handleLinkClick}
						>
							<ExternalLink size={12} className="mr-1" />
							{link.label}
						</a>
					))}
				</div>
			</div>

			{/* Floating Details Button */}
			<ChevronRight
				size={24}
				className="group-hover:translate-x-1 transition-transform absolute bottom-4 right-4 z-10 text-gray-400 group-hover:text-terminal-cyan"
			/>
		</button>
	)
}

export default memo(ProjectCard)
