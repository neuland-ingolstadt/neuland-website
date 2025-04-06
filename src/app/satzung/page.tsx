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

async function fetchSatzungContent() {
	try {
		const response = await fetch(
			'https://pad.informatik.sexy/Satzung/download',
			{
				next: { revalidate: 3600 } // Revalidate every hour
			}
		)
		console.log('Response:', response)
		if (!response.ok) {
			throw new Error(`Failed to fetch Satzung content: ${response.status}`)
		}

		return { success: true, content: await response.text() }
	} catch (error) {
		console.error('Error fetching Satzung content:', error)
		return { success: false, error: String(error) }
	}
}

export default async function Satzung() {
	const result = await fetchSatzungContent()

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
							<BreadcrumbLink>Satzung</BreadcrumbLink>
						</BreadcrumbItem>
					</BreadcrumbList>
				</Breadcrumb>

				{result.success && result.content ? (
					<MarkdownContent content={result.content} showToc />
				) : (
					<FetchErrorMessage title="der Satzung" error={result.error} />
				)}
			</div>
		</>
	)
}
