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
import { fetchOutlineDocument, OUTLINE_IDS } from '@/lib/outline-api'

export default async function Datenschutz() {
	const result = await fetchOutlineDocument(OUTLINE_IDS.datenschutzWebsite)

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
						<BreadcrumbLink>Datenschutz Website</BreadcrumbLink>
					</BreadcrumbItem>
				</BreadcrumbList>
			</Breadcrumb>

			{result.success && result.content ? (
				<MarkdownContent
					content={`# ${result.title}\n\n${result.content}`}
					showToc
				/>
			) : (
				<FetchErrorMessage
					title="der Datenschutz-Information"
					error={result.error}
				/>
			)}
		</div>
	)
}
