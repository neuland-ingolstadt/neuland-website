import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbSeparator
} from '@/components/ui/breadcrumb'
import vorstandData from '@/data/vorstand.json'
import Link from 'next/link'

export default async function Impressum() {
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
						{vorstandData.vorstand.map((member, index) => (
							<strong key={index}>
								{member.name}
								<br />
							</strong>
						))}
					</p>

					<p>
						Inhaltlich verantwortlich:{' '}
						<strong>{vorstandData.verantwortlicher}</strong>
					</p>
				</div>
			</div>
		</>
	)
}
