import { createFileRoute } from '@tanstack/react-router'
import ProjectsPage from '@/components/Projects/projects-page'
import { createTranslator, resolveLocale } from '@/i18n/react'

export const Route = createFileRoute('/$locale/projects/')({
	head: ({ params }) => {
		const t = createTranslator(
			resolveLocale(params.locale),
			'Projects.metadata'
		)
		return {
			meta: [
				{ title: t('title'), name: 'description', content: t('description') }
			]
		}
	},
	component: () => <ProjectsPage />
})
