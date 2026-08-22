import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'
import MatrixEffect from '@/components/Background/page-background'
import TerminalFooter from '@/components/Footer/terminal-footer'
import TerminalHeader from '@/components/Layout/terminal-header'
import NotFound from '@/components/not-found'
import { hasLocale } from '@/i18n/routing'
import { getPrideThemeEnabled } from '@/server/flags'

export const Route = createFileRoute('/$locale')({
	beforeLoad: async ({ params, location }) => {
		if (!hasLocale(params.locale)) {
			throw redirect({
				href: `/en${location.pathname}${location.searchStr}`,
				replace: true
			})
		}
	},
	loader: async () => {
		const prideThemeEnabled = await getPrideThemeEnabled()
		return { prideThemeEnabled }
	},
	notFoundComponent: () => <NotFound />,
	component: LocaleLayout
})

function LocaleLayout() {
	const { prideThemeEnabled } = Route.useLoaderData()

	return (
		<>
			<TerminalHeader isPrideThemeEnabled={prideThemeEnabled} />
			<MatrixEffect />
			<div className="container px-4 md:px-12 xl:px-20 mx-auto pt-6 relative z-10">
				<Outlet />
				<TerminalFooter />
			</div>
		</>
	)
}
