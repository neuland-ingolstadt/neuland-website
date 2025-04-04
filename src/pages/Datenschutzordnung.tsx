import { fetchDocument } from '@/api/documents'
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
import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'

const Datenschutzordnung = () => {
	const { data, error, isLoading } = useQuery({
		queryKey: ['datenschutzordnung'],
		queryFn: () =>
			fetchDocument('https://pad.informatik.sexy/s/Datenschutzordnung/download')
	})

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

				{isLoading ? (
					<div>Lade Datenschutzordnung...</div>
				) : error ? (
					<FetchErrorMessage message="Fehler beim Laden der Datenschutzordnung. Bitte versuche es später erneut." />
				) : (
					<MarkdownContent content={data || ''} showToc />
				)}
			</div>
			<TerminalFooter />
		</div>
	)
}

export default Datenschutzordnung
