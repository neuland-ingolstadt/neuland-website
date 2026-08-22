import { createFileRoute } from '@tanstack/react-router'
import Impressum from '@/components/legal/impressum-page'

export const Route = createFileRoute('/$locale/legal/impressum')({
	component: () => <Impressum />
})
