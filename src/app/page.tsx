import AboutUsSection from '@/components/AboutUs/AboutUsSection'
import EventsSection from '@/components/Events/EventsSection'
import TerminalSection from '@/components/Layout/TerminalSection'
import ProjectsShowcase from '@/components/Projects/ProjectsShowcase'
import TerminalMembership from '@/components/TerminalMembership'
import TerminalPartners from '@/components/TerminalPartners'
import ClientIntro from '@/components/ClientIntro'
import NextAppShowcase from '@/components/NextAppShowcase'

export default async function Index() {
	return (
		<div>
			<ClientIntro />
			<EventsSection />
			<NextAppShowcase />
			<TerminalSection title="Auszug aus unseren Projekten" headingLevel={2}>
				<ProjectsShowcase />
			</TerminalSection>
			<AboutUsSection />
			<TerminalSection title="Mitgliedschaft" headingLevel={2}>
				<TerminalMembership />
			</TerminalSection>
			<TerminalSection title="Unterstützt durch" headingLevel={2}>
				<TerminalPartners />
			</TerminalSection>
		</div>
	)
}
