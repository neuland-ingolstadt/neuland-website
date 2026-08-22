import { createFileRoute, notFound } from '@tanstack/react-router'

export const Route = createFileRoute('/$locale/$')({
	beforeLoad: () => {
		throw notFound()
	}
})
