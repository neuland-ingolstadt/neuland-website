import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import type { ProjectDetails } from '@/components/Projects/project-card'
import projectsData from '@/data/projects.json'
import ProjectDetailClient from './project-detail-client'

export const generateStaticParams = async () =>
	(projectsData as ProjectDetails[]).map((project) => ({ id: project.id }))

export const generateMetadata = async ({
	params
}: {
	params: Promise<{ id: string }>
}): Promise<Metadata> => {
	const { id } = await params
	const project = (projectsData as ProjectDetails[]).find((p) => p.id === id)

	if (!project) {
		return {
			title: 'Projekt nicht gefunden'
		}
	}

	return {
		title: `${project.title} - Neuland Projekte`
	}
}

const ProjectDetailPage = async ({
	params
}: {
	params: Promise<{ id: string }>
}) => {
	const { id } = await params
	const project = (projectsData as ProjectDetails[]).find((p) => p.id === id)

	if (!project) {
		notFound()
	}

	return <ProjectDetailClient project={project} />
}

export default ProjectDetailPage
