import TerminalEvents from '@/components/Events/TerminalEvents'
import TerminalFooter from '@/components/Footer/TerminalFooter'
import TerminalSection from '@/components/Layout/TerminalSection'
import NextAppShowcase from '@/components/NextAppShowcase'
import ProjectsShowcase from '@/components/Projects/ProjectsShowcase'
import TerminalMembership from '@/components/TerminalMembership'
import TerminalPartners from '@/components/TerminalPartners'
import TypewriterText from '@/components/TypewriterText'
import eventData from '@/data/events.json'

const Index = () => {
	return (
		<div className="container px-4 sm:px-12 mx-auto pt-6 relative z-10">
			<div className="pt-20">
				<TypewriterText
					text="Der studentische Verein für alle informatikbegeisterten Studierenden der TH Ingolstadt."
					className="text-xl mb-12"
					delay={30}
					preventLayoutJumps={true}
				/>
			</div>

			<TerminalEvents semester={eventData.semester} events={eventData.events} />

			<NextAppShowcase />

			<TerminalSection title="Auszug aus unseren Projekten" headingLevel={2}>
				<ProjectsShowcase />
			</TerminalSection>
			<TerminalSection title="Über uns" headingLevel={2}>
				<p>
					Wir bieten den Studierenden eine <strong>Plattform</strong>, um sich
					auszutauschen, um <strong>Projekte</strong> zu realisieren und um ihr{' '}
					<strong>Wissen</strong> zu erweitern.
					<br />
					Gemeinsam entwickeln wir <strong>Projekte</strong> für die
					Studierenden, nehmen an <strong>Wettbewerben</strong> teil und führen
					selbst <strong>Veranstaltungen</strong> rund um die Informatik durch.
					<br />
					Und das ganz unabhängig von der <strong>Fakultät</strong> oder dem{' '}
					<strong>Studiengang</strong>.
				</p>
			</TerminalSection>
			<TerminalSection title="Mitgliedschaft" headingLevel={2}>
				<TerminalMembership />
			</TerminalSection>

			<TerminalSection title="Unterstützt durch" headingLevel={2}>
				<TerminalPartners />
			</TerminalSection>

			<TerminalFooter />
		</div>
	)
}

export default Index
