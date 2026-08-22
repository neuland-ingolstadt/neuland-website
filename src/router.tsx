import { createRouter } from '@tanstack/react-router'
import NotFound from '@/components/not-found'
import { routeTree } from './routeTree.gen'

export function getRouter() {
	const router = createRouter({
		routeTree,
		defaultPreload: 'intent',
		scrollRestoration: true,
		defaultNotFoundComponent: () => <NotFound />
	})

	return router
}
