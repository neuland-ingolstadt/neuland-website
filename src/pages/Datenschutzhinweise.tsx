import FetchErrorMessage from '@/components/FetchErrorMessage'
import MarkdownContent from '@/components/MarkdownContent'
import MatrixEffect from '@/components/MatrixEffect'
import TerminalFooter from '@/components/TerminalFooter'
import TerminalHeader from '@/components/TerminalHeader'
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbSeparator
} from '@/components/ui/breadcrumb'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const Datenschutzhinweise = () => {
	const [markdown, setMarkdown] = useState('')
	const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		fetch('https://pad.informatik.sexy/s/Datenschutzhinweise/download')
			.then((response) => {
				if (!response.ok) {
					throw new Error(`HTTP error! Status: ${response.status}`)
				}
				return response.text()
			})
			.then((text) => setMarkdown(text))
			.catch((error) => {
				console.error('Error fetching Datenschutzhinweise:', error)
				setError(
					'Fehler beim Laden der Datenschutzhinweise. Bitte versuche es später erneut.'
				)
			})
	}, [])

	return (
		<div className="terminal-container min-h-screen relative">
			<MatrixEffect />
			<div className="scanline" />

			<div className="container px-4 sm:px-6 mx-auto pt-6 relative z-10">
				<TerminalHeader />
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
								<BreadcrumbLink>Datenschutzhinweise</BreadcrumbLink>
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
		</div>
	)
}

export default Datenschutzhinweise
