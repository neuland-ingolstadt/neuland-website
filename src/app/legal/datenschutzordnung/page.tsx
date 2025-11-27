import Link from 'next/link'
import FetchErrorMessage from '@/components/Markdown/fetch-error-message'
import MarkdownContent from '@/components/Markdown/markdown-content'
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbSeparator
} from '@/components/ui/breadcrumb'
import { fetchMultipleOutlineDocuments, OUTLINE_IDS } from '@/lib/outline-api'

export default async function DatenschutzOrdnung() {
	const result = await fetchMultipleOutlineDocuments([
		OUTLINE_IDS.datenschutzOrdnung,
		OUTLINE_IDS.datenschutzHinweise
	])

	return (
		<div className="pt-20">
			<Breadcrumb className="mb-6">
				<BreadcrumbList>
					<BreadcrumbItem>
						<BreadcrumbLink asChild>
							<Link href="/">root</Link>
						</BreadcrumbLink>
					</BreadcrumbItem>
					<BreadcrumbSeparator />
					<BreadcrumbItem>
						<BreadcrumbLink>Datenschutz Neuland</BreadcrumbLink>
					</BreadcrumbItem>
				</BreadcrumbList>
			</Breadcrumb>

			{result.success && result.content ? (
				<MarkdownContent content={result.content} showToc />
			) : (
				<FetchErrorMessage
					title="der Datenschutzordnung"
					error={result.error}
				/>
			)}
		</div>
	)
}
