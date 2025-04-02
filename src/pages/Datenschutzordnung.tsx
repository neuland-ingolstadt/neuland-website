import TerminalFooter from '@/components/Footer/TerminalFooter'
import FetchErrorMessage from '@/components/Markdown/FetchErrorMessage'
import MarkdownContent from '@/components/Markdown/MarkdownContent'
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbSeparator
} from '@/components/ui/breadcrumb'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const Datenschutzordnung = () => {
	const [markdown, setMarkdown] = useState('')
	const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		fetch('https://pad.informatik.sexy/s/Datenschutzordnung/download')
			.then((response) => {
				if (!response.ok) {
					throw new Error(`HTTP error! Status: ${response.status}`)
				}
				return response.text()
			})
			.then((text) => setMarkdown(text))
			.catch((error) => {
				console.error('Error fetching Datenschutzordnung:', error)
				setError(
					'Fehler beim Laden der Datenschutzordnung. Bitte versuche es später erneut.'
				)
			})
	}, [])

	return (
		<div className="container px-4 sm:px-6 mx-auto pt-6 relative z-10">
			<div className="pt-20">
				<Breadcrumb className="mb-6">
					<BreadcrumbList>
						<BreadcrumbItem>
							<BreadcrumbLink asChild>
								<Link to="/">root</Link>
							</BreadcrumbLink>
						</BreadcrumbItem>
						<BreadcrumbSeparator />
						<BreadcrumbItem>
							<BreadcrumbLink>Datenschutzordnung</BreadcrumbLink>
						</BreadcrumbItem>
					</BreadcrumbList>
				</Breadcrumb>

				{error ? (
					<FetchErrorMessage message={error} />
				) : (
					<MarkdownContent content={markdown} showToc />
				)}
			</div>
			<TerminalFooter />
		</div>
	)
}

export default Datenschutzordnung
