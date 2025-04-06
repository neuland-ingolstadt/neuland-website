// In Next.js, this file would be called: app/providers.tsx
'use client'

import { Toaster } from '@/components/ui/toaster'
import { BackgroundProvider } from '@/contexts/BackgroundContext'
// Since QueryClientProvider relies on useContext under the hood, we have to put 'use client' on top
import {
	HydrationBoundary,
	QueryClient,
	QueryClientProvider,
	isServer
} from '@tanstack/react-query'
import { useState } from 'react'

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

let browserQueryClient: QueryClient | undefined = undefined

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
	dehydratedState?: unknown
}) {
	// In React 18, we need to use useState here to create a new query client
	// on the server for each request, to avoid sharing state between users.
	// In Next.js 13.4+, we need to initialize QueryClient inside component to
	// prevent it from being shared between requests.
	const [queryClient] = useState(() => getQueryClient())

	return (
		<BackgroundProvider>
			<QueryClientProvider client={queryClient}>
				<HydrationBoundary state={dehydratedState}>
					{children}
					<Toaster />
				</HydrationBoundary>
			</QueryClientProvider>
		</BackgroundProvider>
	)
}
