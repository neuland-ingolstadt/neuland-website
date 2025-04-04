import TerminalFooter from '@/components/Footer/TerminalFooter'
import MarkdownContent from '@/components/Markdown/MarkdownContent'
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbSeparator
} from '@/components/ui/breadcrumb'
import { Link } from 'react-router-dom'

import satzungContent from '@/static/content/satzung.md?raw'

const Satzung = () => {
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
							<BreadcrumbLink>Satzung</BreadcrumbLink>
						</BreadcrumbItem>
					</BreadcrumbList>
				</Breadcrumb>

				<MarkdownContent content={satzungContent} showToc />
			</div>
			<TerminalFooter />
		</div>
	)
}

export default Satzung
