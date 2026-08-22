import { AptabaseProvider } from '@aptabase/react'
import type { ReactNode } from 'react'
import { BackgroundProvider } from '@/contexts/BackgroundContext'
import type { Locale } from '@/i18n/react'
import { IntlProvider } from '@/i18n/react'
import RouteTracker from './Layout/route-tracker'

export default function Providers({
	children,
	locale
}: {
	children: ReactNode
	locale: Locale
}) {
	const APTABASE_KEY = import.meta.env.VITE_APTABASE_KEY ?? ''
	return (
		<BackgroundProvider>
			<AptabaseProvider
				appKey={APTABASE_KEY}
				options={{
					host: 'https://analytics.neuland.app'
				}}
			>
				<IntlProvider locale={locale}>
					{children}
					<RouteTracker />
				</IntlProvider>
			</AptabaseProvider>
		</BackgroundProvider>
	)
}
