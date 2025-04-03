import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious
} from '@/components/ui/carousel'
import { motion } from 'framer-motion'
import type React from 'react'
import { useState } from 'react'
import projectsData from '../../data/projects.json'
import ProjectCard, { type ProjectDetails } from './ProjectCard'
import ProjectDetailModal from './ProjectDetailModal'

const ProjectsShowcase: React.FC = () => {
	const [selectedProject, setSelectedProject] = useState<ProjectDetails | null>(
		null
	)
	const [isModalOpen, setIsModalOpen] = useState(false)

	const openProjectDetails = (project: ProjectDetails) => {
		setSelectedProject(project)
		setIsModalOpen(true)
	}

	const closeProjectDetails = () => {
		setIsModalOpen(false)
		// Keep the selected project during close animation
		setTimeout(() => setSelectedProject(null), 300)
	}

	return (
		<div className="relative">
			{/* Title with animation */}
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				whileInView={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6 }}
				viewport={{ once: true }}
				className="mb-6"
			>
				<p className="text-sm opacity-80 mb-6 font-mono">
					$ projects --list | grep featured
				</p>
			</motion.div>

			{/* Project Carousel */}
			<Carousel
				opts={{
					align: 'start',
					loop: true
				}}
				className="w-full"
			>
				<CarouselContent className="-ml-4">
					{projectsData.map((project) => (
						<CarouselItem
							key={project.id}
							className="pl-4 sm:basis-1/2 lg:basis-1/3"
						>
							<ProjectCard
								project={project}
								onClick={() => openProjectDetails(project)}
							/>
						</CarouselItem>
					))}
				</CarouselContent>
				<CarouselPrevious className="left-0" />
				<CarouselNext className="right-0" />
			</Carousel>

			{/* Terminal decoration */}
			<div className="mt-6 mb-8">
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
			</div>

			{/* Details Modal */}
			<ProjectDetailModal
				project={selectedProject}
				isOpen={isModalOpen}
				onClose={closeProjectDetails}
			/>
		</div>
	)
}

export default ProjectsShowcase
