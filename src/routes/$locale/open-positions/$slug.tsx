import { createFileRoute, notFound } from '@tanstack/react-router'
import PositionDetailClient from '@/components/Team/position-detail-client'
import { createTranslator, resolveLocale } from '@/i18n/react'
import { getPosition, localize } from '@/lib/positions'

export const Route = createFileRoute('/$locale/open-positions/$slug')({
	loader: ({ params }) => {
		const position = getPosition(params.slug)
		if (!position) {
			throw notFound()
		}
		return { position }
	},
	head: ({ params, loaderData }) => {
		const locale = resolveLocale(params.locale)
		const t = createTranslator(locale, 'Team.metadata')
		if (!loaderData) {
			return { meta: [{ title: t('notFound') }] }
		}
		const { position } = loaderData
		const title = t('detailTitle', { title: localize(position.title, locale) })
		const description = localize(position.shortDescription, locale)
		return {
			meta: [
				{ title },
				{ name: 'description', content: description },
				{ property: 'og:title', content: title },
				{ property: 'og:description', content: description }
			]
		}
	},
	component: PositionDetailPage
})

function PositionDetailPage() {
	const { position } = Route.useLoaderData()

	return <PositionDetailClient position={position} />
}
