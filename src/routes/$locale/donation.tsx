import { createFileRoute } from '@tanstack/react-router'
import DonationPage from '@/components/donation-page'
import { createTranslator, resolveLocale } from '@/i18n/react'

export const Route = createFileRoute('/$locale/donation')({
	head: ({ params }) => {
		const t = createTranslator(resolveLocale(params.locale), 'Donation')
		return {
			meta: [
				{ title: t('title'), name: 'description', content: t('description') }
			]
		}
	},
	component: () => <DonationPage />
})
