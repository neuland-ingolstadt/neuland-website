import AboutUsSection from '@/components/AboutUs/AboutUsSection'
import TerminalEvents from '@/components/Events/TerminalEvents'
import TerminalFooter from '@/components/Footer/TerminalFooter'
import HeaderIntroText from '@/components/Header/HeaderIntroText'
import TerminalSection from '@/components/Layout/TerminalSection'
import NextAppShowcase from '@/components/NextAppShowcase'
import ProjectsShowcase from '@/components/Projects/ProjectsShowcase'
import TerminalMembership from '@/components/TerminalMembership'
import TerminalPartners from '@/components/TerminalPartners'
import eventData from '@/data/events.json'

const Index = () => {
	return (
		<div className="container px-4 sm:px-12 mx-auto pt-6 relative z-10">
			<HeaderIntroText />
			<TerminalEvents semester={eventData.semester} events={eventData.events} />
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
			<TerminalFooter />
		</div>
	)
}

export default Index
