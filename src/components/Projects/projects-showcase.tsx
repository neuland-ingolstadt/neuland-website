'use client'
import { motion } from 'motion/react'
import type React from 'react'
import { memo, useCallback, useMemo } from 'react'
import projectsData from '@/data/projects.json'
import { useRouter } from '@/i18n/navigation'
import { useTranslations } from '@/i18n/react'
import TerminalButton from '../terminal-button'
import ProjectCard, { type ProjectDetails } from './project-card'

const FEATURED_PROJECT_IDS = [
	'neuland-next',
	'campus-life-events',
	'neuland-connect'
]

const ProjectsShowcase: React.FC = () => {
	const router = useRouter()
	const memoizedProjects = useMemo(
		() =>
			FEATURED_PROJECT_IDS.flatMap((id) =>
				projectsData.filter((project) => project.id === id)
			),
		[]
	)

	const t = useTranslations('Home.projectsSection')

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
					$ <span className="text-terminal-ink">ls</span> projects/
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
			<div className="flex justify-end items-center w-full mb-8">
				<TerminalButton href="/projects">{t('showAll')}</TerminalButton>
			</div>
		</div>
	)
}

export default memo(ProjectsShowcase)
