import TerminalEvents from '@/components/Events/TerminalEvents'
import TerminalFooter from '@/components/Footer/TerminalFooter'
import TerminalSection from '@/components/Layout/TerminalSection'
import NextAppShowcase from '@/components/NextAppShowcase'
import ProjectsShowcase from '@/components/Projects/ProjectsShowcase'
import TerminalMembership from '@/components/TerminalMembership'
import TerminalPartners from '@/components/TerminalPartners'
import TypewriterText from '@/components/TypewriterText'
import { fetchEvents } from '@/services/events'
import { useQuery } from '@tanstack/react-query'

const Index = () => {
	const { data: eventsData } = useQuery({
		queryKey: ['events'],
		queryFn: fetchEvents,
		initialData: { semester: 'WS 23/24', events: [] }
	})

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

			<TerminalEvents
				semester={eventsData.semester}
				events={eventsData.events}
			/>

			<NextAppShowcase />

			<TerminalSection title="Auszug aus unseren Projekten" headingLevel={2}>
				<ProjectsShowcase />
			</TerminalSection>
			<TerminalSection title="Über uns" headingLevel={2}>
				<p>
					Wir bieten den Studierenden eine Plattform, um sich auszutauschen, um
					Projekte zu realisieren und um ihr Wissen zu erweitern.
					<br />
					Gemeinsam entwickeln wir Projekte für die Studierenden, nehmen an
					Wettbewerben teil und führen selbst Veranstaltungen rund um die
					Informatik durch.
					<br />
					Und das ganz unabhängig von der Fakultät oder dem Studiengang.
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
