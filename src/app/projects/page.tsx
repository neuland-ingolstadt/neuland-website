'use client'
import { AnimatePresence, motion } from 'framer-motion'
import { Code, Filter, Github } from 'lucide-react'
import { useMemo, useState } from 'react'
import ProjectCard, {
	type ProjectDetails
} from '@/components/Projects/project-card'
import ProjectDetailModal from '@/components/Projects/project-detail-modal'
import TerminalButton from '@/components/terminal-button'
import projectsData from '@/data/projects.json'

const uniqueTags = (projectsData as ProjectDetails[]).reduce((acc, project) => {
	project.tags?.forEach((tag) => {
		acc.add(tag)
	})
	return acc
}, new Set<string>())

const ProjectsPage = () => {
	const [selectedProject, setSelectedProject] = useState<ProjectDetails | null>(
		null
	)
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [activeTag, setActiveTag] = useState<string | null>(null)

	const filteredProjects = useMemo(() => {
		if (!activeTag) return projectsData
		const tagLower = activeTag.toLowerCase()
		return (projectsData as ProjectDetails[]).filter((project) =>
			(project.tags || []).some((tag) => tag.toLowerCase() === tagLower)
		)
	}, [activeTag])

	const openProjectDetails = (project: ProjectDetails) => {
		setSelectedProject(project)
		setIsModalOpen(true)
	}

	const closeProjectDetails = () => {
		setIsModalOpen(false)
		setTimeout(() => setSelectedProject(null), 300)
	}

	return (
		<div className="min-h-screen py-18 px-4 md:px-8">
			{/* Header Section */}
			<motion.div
				initial={{ opacity: 0, y: -20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6 }}
				className="max-w-6xl mx-auto mb-12"
			>
				<div className="flex items-center gap-3 mb-6">
					<h1 className="text-3xl md:text-4xl font-bold  font-mono">
						Unsere Projekte
					</h1>
				</div>

				<motion.p
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.6, delay: 0.2 }}
					className="text-lg text-terminal-text/80 font-mono max-w-3xl"
				>
					Entdecke unsere Sammlung kreativer, technischer und
					gemeinschaftsgetriebener Projekte. Von Webanwendungen bis hin zu
					Cybersecurity-Initiativen.
				</motion.p>

				<motion.div
					initial={{ opacity: 0, y: 10 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, delay: 0.4 }}
					className="flex items-center gap-2 mt-6 text-sm text-terminal-text/60 font-mono"
				>
					<Code size={16} />
					<span>
						{filteredProjects.length} Projekt
						{filteredProjects.length !== 1 ? 'e' : ''} gefunden
					</span>
				</motion.div>
			</motion.div>

			{/* Filter Section */}
			<div className="max-w-6xl mx-auto mb-8">
				<div className="flex items-center gap-3 mb-4">
					<Filter size={20} className="text-terminal-cyan" />
					<span className="text-terminal-text/80 font-mono">
						Filter nach Technologie:
					</span>
				</div>

				<div className="flex flex-wrap gap-3">
					<button
						type="button"
						className={`px-4 py-2  border transition-all duration-200 ${
							!activeTag
								? 'border-terminal-cyan bg-terminal-cyan/80 text-terminal-onAccent'
								: 'border-terminal-text/30 text-terminal-text/70 hover:border-terminal-cyan hover:text-terminal-cyan'
						}`}
						onClick={() => setActiveTag(null)}
					>
						Alle Projekte
					</button>
					{[...uniqueTags].map((tag) => (
						<button
							type="button"
							key={tag}
							className={`px-4 py-2 border transition-all duration-200 ${
								activeTag === tag
									? 'border-terminal-cyan bg-terminal-cyan/80 text-terminal-onAccent'
									: 'border-terminal-text/30 text-terminal-text/70 hover:border-terminal-cyan hover:text-terminal-cyan'
							}`}
							onClick={() => setActiveTag(tag)}
						>
							{tag}
						</button>
					))}
				</div>
			</div>

			{/* Projects Grid */}
			<div className="max-w-6xl mx-auto">
				<AnimatePresence>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
						{filteredProjects.map((project: ProjectDetails) => (
							<motion.div
								key={project.id}
								initial={{ opacity: 0, scale: 0.98 }}
								animate={{ opacity: 1, scale: 1 }}
								exit={{ opacity: 0, scale: 0.98 }}
								transition={{ duration: 0.18 }}
								className="cursor-pointer"
							>
								<ProjectCard
									project={project}
									onClick={() => openProjectDetails(project)}
								/>
							</motion.div>
						))}
					</div>
				</AnimatePresence>

				{/* Empty State */}
				{filteredProjects.length === 0 && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						className="text-center py-12"
					>
						<Code size={48} className="text-terminal-text/40 mx-auto mb-4" />
						<p className="text-terminal-text/60 font-mono">
							Keine Projekte gefunden für diesen Filter.
						</p>
					</motion.div>
				)}
			</div>

			{/* Footer Section */}
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 0.6, delay: 0.8 }}
				className="max-w-6xl mx-auto mt-16 pt-8 border-t border-terminal-text/20"
			>
				<div className="text-center">
					<div className="flex items-center justify-center gap-2 mb-4">
						<span className="text-terminal-text/80 font-mono">
							Sieh dir unsere Projekte auf GitHub an!
						</span>
					</div>
					<TerminalButton
						href="https://github.com/neuland-ingolstadt"
						target="_blank"
						rel="noreferrer noopener"
					>
						<Github
							size={16}
							className="mr-2 group-hover:rotate-8 transition-transform duration-300"
						/>
						Mehr erfahren
					</TerminalButton>
				</div>
			</motion.div>

			{/* Modal */}
			<ProjectDetailModal
				project={selectedProject}
				isOpen={isModalOpen}
				onClose={closeProjectDetails}
			/>
		</div>
	)
}

export default ProjectsPage
