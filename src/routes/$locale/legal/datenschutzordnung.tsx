import { createFileRoute } from '@tanstack/react-router'
import FetchErrorMessage from '@/components/Markdown/fetch-error-message'
import MarkdownContent from '@/components/Markdown/markdown-content'
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbSeparator
} from '@/components/ui/breadcrumb'
import { Link } from '@/i18n/navigation'
import { useTranslations } from '@/i18n/react'
import { getMultipleOutlineDocuments, OUTLINE_IDS } from '@/server/legal'

export const Route = createFileRoute('/$locale/legal/datenschutzordnung')({
	loader: () =>
		getMultipleOutlineDocuments({
			data: [OUTLINE_IDS.datenschutzOrdnung, OUTLINE_IDS.datenschutzHinweise]
		}),
	component: DatenschutzOrdnung
})

function DatenschutzOrdnung() {
	const result = Route.useLoaderData()
	const t = useTranslations('Legal.NeulandPrivacy')

	return (
		<div>
			<Breadcrumb className="mb-6">
				<BreadcrumbList>
					<BreadcrumbItem>
						<BreadcrumbLink asChild>
							<Link href="/">Home</Link>
						</BreadcrumbLink>
					</BreadcrumbItem>
					<BreadcrumbSeparator />
					<BreadcrumbItem>
						<BreadcrumbLink>{t('breadcrumb')}</BreadcrumbLink>
					</BreadcrumbItem>
				</BreadcrumbList>
			</Breadcrumb>

			{result.success && result.content ? (
				<MarkdownContent content={result.content} showToc />
			) : (
				<FetchErrorMessage title={t('title')} error={result.error} />
			)}
		</div>
	)
}
