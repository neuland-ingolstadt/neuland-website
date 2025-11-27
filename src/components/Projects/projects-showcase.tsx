'use client'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import type React from 'react'
import { memo, useCallback, useMemo } from 'react'
import projectsData from '@/data/projects.json'
import TerminalButton from '../terminal-button'
import ProjectCard, { type ProjectDetails } from './project-card'

const ProjectsShowcase: React.FC = () => {
	const router = useRouter()
	const memoizedProjects = useMemo(() => projectsData.slice(0, 3), [])

	const openProjectDetails = useCallback(
		(project: ProjectDetails) => {
			router.push(`/projects/${project.id}`)
		},
		[router]
	)

	return (
		<div className="relative">
			{/* Terminal command header */}
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				whileInView={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6 }}
				viewport={{ once: true }}
				className="mb-8"
			>
				<p className="text-sm opacity-80 mb-4 font-mono">
					$ projects --list | grep featured
				</p>
			</motion.div>

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
				{memoizedProjects.map((project) => (
					<ProjectCard
						key={project.id}
						project={project}
						onClick={() => openProjectDetails(project)}
					/>
				))}
			</div>
			<div className="flex justify-between items-center w-full mb-8">
				<div className="font-mono text-sm opacity-80">
					<span className="text-terminal-cyan">$</span> curl{' '}
					<a
						href="https://github.com/neuland-ingolstadt"
						target="_blank"
						rel="noreferrer noopener"
						className="text-terminal-cyan"
					>
						github.com/neuland-ingolstadt
					</a>
				</div>
				<TerminalButton href="/projects">Alle Projekte anzeigen</TerminalButton>
			</div>
		</div>
	)
}

export default memo(ProjectsShowcase)
