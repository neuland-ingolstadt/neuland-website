import TerminalFooter from '@/components/Footer/TerminalFooter'
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbSeparator
} from '@/components/ui/breadcrumb'
import { Link } from 'react-router-dom'

const Impressum = () => {
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
							<BreadcrumbLink>Impressum</BreadcrumbLink>
						</BreadcrumbItem>
					</BreadcrumbList>
				</Breadcrumb>

				<div className="markdown-content">
					<h1>Impressum</h1>

					<p>
						Neuland Ingolstadt e.V.
						<br />
						Esplanade 10
						<br />
						85049 Ingolstadt
					</p>
					<p>
						Registergericht: Amtsgericht Ingolstadt
						<br />
						Registernummer: VR 201088
					</p>

					<h3>Kontakt</h3>
					<p>
						E-Mail: info@neuland-ingolstadt.de
						<br />
						Telefon: 015678 384646
					</p>

					<h3>Vorstand</h3>
					<p>
						Vertreten durch:
						<br />
						<strong>Alexander Horn</strong>
						<br />
						<strong>Timo Weese</strong>
						<br />
						<strong>Michael Schubert</strong>
					</p>

					<p>
						Inhaltlich verantwortlich: <strong>Alexander Horn</strong>
					</p>
				</div>
			</div>
			<TerminalFooter />
		</div>
	)
}

export default Impressum
