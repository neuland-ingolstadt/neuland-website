import { createFileRoute } from '@tanstack/react-router'
import PositionsPage from '@/components/Team/positions-page'
import { createTranslator, resolveLocale } from '@/i18n/react'

export const Route = createFileRoute('/$locale/open-positions/')({
	head: ({ params }) => {
		const t = createTranslator(resolveLocale(params.locale), 'Team.metadata')
		return {
			meta: [
				{ title: t('title') },
				{ name: 'description', content: t('description') },
				{ property: 'og:title', content: t('title') },
				{ property: 'og:description', content: t('description') }
			]
		}
	},
	component: () => <PositionsPage />
})
