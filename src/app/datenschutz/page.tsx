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
		const response = await fetch(
			'https://pad.informatik.sexy/jEf0CAYVRim-4zjgJ7gaBQ/download',
			{
				next: { revalidate: 3600 }
			}
		)

		if (!response.ok) {
			throw new Error(`Failed to fetch Datenschutz content: ${response.status}`)
		}

		return { success: true, content: await response.text() }
	} catch (error) {
		console.error('Error fetching Datenschutz content:', error)
		return { success: false, error: String(error) }
	}
}

export default async function Datenschutz() {
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
							<BreadcrumbLink>Datenschutz Website</BreadcrumbLink>
						</BreadcrumbItem>
					</BreadcrumbList>
				</Breadcrumb>

				{result.success && result.content ? (
					<MarkdownContent content={result.content} showToc />
				) : (
					<FetchErrorMessage
						title="der Datenschutz-Information"
						error={result.error}
					/>
				)}
			</div>
		</>
	)
}
