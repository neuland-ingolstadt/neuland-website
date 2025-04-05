import AboutUsSection from '@/components/AboutUs/AboutUsSection'
import TerminalEvents from '@/components/Events/TerminalEvents'
import TerminalFooter from '@/components/Footer/TerminalFooter'
import TerminalSection from '@/components/Layout/TerminalSection'
import NextAppShowcase from '@/components/NextAppShowcase'
import ProjectsShowcase from '@/components/Projects/ProjectsShowcase'
import TerminalMembership from '@/components/TerminalMembership'
import TypewriterText from '@/components/TypewriterText'

const Index = () => {
	return (
		<div className="container px-4 sm:px-12 mx-auto pt-6 relative z-10">
			<div className={'pt-20'}>
				<TypewriterText
					text="Der studentische Verein für alle informatikbegeisterten Studierenden der TH Ingolstadt."
					className="text-xl mb-12"
					delay={25}
					preventLayoutJumps={true}
				/>
			</div>
			<TerminalEvents />
			<NextAppShowcase />
			<TerminalSection title="Auszug aus unseren Projekten" headingLevel={2}>
				<ProjectsShowcase />
			</TerminalSection>
			<AboutUsSection />
			<TerminalSection title="Mitgliedschaft" headingLevel={2}>
				<TerminalMembership />
			</TerminalSection>
			{/* <TerminalSection title="Unterstützt durch" headingLevel={2}>
				<TerminalPartners />
			</TerminalSection> */}
			<TerminalFooter />
		</div>
	)
}

export default Index
