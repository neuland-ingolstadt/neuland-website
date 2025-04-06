import FetchErrorMessage from '@/components/Markdown/FetchErrorMessage'
import MarkdownContent from '@/components/Markdown/MarkdownContent'
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbSeparator
} from '@/components/ui/breadcrumb'
import Link from 'next/link'

async function fetchDatenschutzContent() {
	try {
		// Fetch both datenschutzordnung and datenschutzhinweise files from URLs
		const ordnungResponse = await fetch(
			'https://pad.informatik.sexy/s/Datenschutzordnung/download',
			{
				next: { revalidate: 3600 } // Revalidate every hour
			}
		)

		const hinweiseResponse = await fetch(
			'https://pad.informatik.sexy/s/Datenschutzhinweise/download',
			{
				next: { revalidate: 3600 } // Revalidate every hour
			}
		)

		if (!ordnungResponse.ok) {
			throw new Error(
				`Failed to fetch Datenschutzordnung content: ${ordnungResponse.status}`
			)
		}

		if (!hinweiseResponse.ok) {
			throw new Error(
				`Failed to fetch Datenschutzhinweise content: ${hinweiseResponse.status}`
			)
		}

		const ordnungContent = await ordnungResponse.text()
		const hinweiseContent = await hinweiseResponse.text()

		const markdownContents = [
			{
				title: 'Datenschutzordnung',
				content: ordnungContent
			},
			{
				title: 'Datenschutzhinweise',
				content: hinweiseContent
			}
		]

		return { success: true, markdownContents }
	} catch (error) {
		console.error('Error fetching Datenschutz content:', error)
		return { success: false, error: String(error) }
	}
}

export default async function DatenschutzOrdnung() {
	const result = await fetchDatenschutzContent()

	return (
		<>
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

				{result.success ? (
					<MarkdownContent content={result.markdownContents} showToc />
				) : (
					<FetchErrorMessage
						title="der Datenschutzordnung"
						error={result.error}
					/>
				)}
			</div>
		</>
	)
}
