import { createFileRoute, redirect } from '@tanstack/react-router'
import { detectLocale } from '@/server/locale'

export const Route = createFileRoute('/$')({
	beforeLoad: async ({ params }) => {
		const splat = params._splat ?? ''
		const locale = await detectLocale()
		throw redirect({
			href: `/${locale}/${splat.split('/').filter(Boolean).join('/')}`,
			replace: true
		})
	}
})
