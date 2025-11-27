'use client'

import { AptabaseProvider } from '@aptabase/react'
// Since QueryClientProvider relies on useContext under the hood, we have to put 'use client' on top
import {
	type DehydratedState,
	HydrationBoundary,
	isServer,
	QueryClient,
	QueryClientProvider
} from '@tanstack/react-query'
import { useState } from 'react'
import { BackgroundProvider } from '@/contexts/BackgroundContext'
import RouteTracker from './Layout/route-tracker'

function makeQueryClient() {
	return new QueryClient({
		defaultOptions: {
			queries: {
				// With SSR, we usually want to set some default staleTime
				// above 0 to avoid refetching immediately on the client
				staleTime: 60 * 1000, // 1 minute
				retry: 2,
				refetchOnWindowFocus: false,
				refetchInterval: false
			}
		}
	})
}

let browserQueryClient: QueryClient | undefined

function getQueryClient() {
	if (isServer) {
		// Server: always make a new query client
		return makeQueryClient()
	}
	// Browser: make a new query client if we don't already have one
	// This is very important, so we don't re-make a new client if React
	// suspends during the initial render. This may not be needed if we
	// have a suspense boundary BELOW the creation of the query client
	if (!browserQueryClient) browserQueryClient = makeQueryClient()
	return browserQueryClient
}

export default function Providers({
	children,
	dehydratedState
}: {
	children: React.ReactNode
	dehydratedState?: DehydratedState
}) {
	// In React 18, we need to use useState here to create a new query client
	// on the server for each request, to avoid sharing state between users.
	// In Next.js 13.4+, we need to initialize QueryClient inside component to
	// prevent it from being shared between requests.
	const [queryClient] = useState(() => getQueryClient())
	const APTABASE_KEY = process.env.NEXT_PUBLIC_APTABASE_KEY ?? ''
	return (
		<BackgroundProvider>
			<AptabaseProvider
				appKey={APTABASE_KEY}
				options={{
					host: 'https://analytics.neuland.app'
				}}
			>
				<QueryClientProvider client={queryClient}>
					<HydrationBoundary state={dehydratedState}>
						{children}
						<RouteTracker />
					</HydrationBoundary>
				</QueryClientProvider>
			</AptabaseProvider>
		</BackgroundProvider>
	)
}
