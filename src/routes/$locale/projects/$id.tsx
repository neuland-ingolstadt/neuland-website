import { createFileRoute, notFound } from '@tanstack/react-router'
import type { ProjectDetails } from '@/components/Projects/project-card'
import ProjectDetailClient from '@/components/Projects/project-detail-client'
import projectsData from '@/data/projects.json'
import { createTranslator, resolveLocale } from '@/i18n/react'

export const Route = createFileRoute('/$locale/projects/$id')({
	loader: ({ params }) => {
		const project = (projectsData as ProjectDetails[]).find(
			(p) => p.id === params.id
		)
		if (!project) {
			throw notFound()
		}
		return { project }
	},
	head: ({ params, loaderData }) => {
		const t = createTranslator(
			resolveLocale(params.locale),
			'Projects.metadata'
		)
		if (!loaderData) {
			return { meta: [{ title: t('notFound') }] }
		}
		return {
			meta: [{ title: `${loaderData.project.title} - Neuland Projekte` }]
		}
	},
	component: ProjectDetailPage
})

function ProjectDetailPage() {
	const { project } = Route.useLoaderData()

	return <ProjectDetailClient project={project} />
}
