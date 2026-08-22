import { createFileRoute, redirect } from '@tanstack/react-router'
import { detectLocale } from '@/server/locale'

export const Route = createFileRoute('/')({
	beforeLoad: async () => {
		const locale = await detectLocale()
		throw redirect({ href: `/${locale}`, replace: true })
	}
})
