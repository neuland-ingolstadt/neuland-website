import { createFileRoute } from '@tanstack/react-router'
import { buildRssFeed } from '@/lib/rss'

export const Route = createFileRoute('/feed')({
	server: {
		handlers: {
			GET: async () => buildRssFeed()
		}
	}
})
