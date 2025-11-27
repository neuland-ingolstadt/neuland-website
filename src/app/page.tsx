import AboutUsSection from '@/components/AboutUs/about-us-section'
import BlogPreview from '@/components/blog/blog-peview'
import ClientIntro from '@/components/client-intro'
import EventsSection from '@/components/Events/events-section'
import TerminalSection from '@/components/Layout/terminal-section'
import NextAppShowcase from '@/components/next-app-showcase'
import ProjectsShowcase from '@/components/Projects/projects-showcase'
import TerminalMembership from '@/components/terminal-membership'
import TerminalPartners from '@/components/terminal-partners'

export default async function Index() {
	return (
		<>
			<ClientIntro />
			<EventsSection />
			<NextAppShowcase />
			<TerminalSection title="Auszug aus unseren Projekten" headingLevel={2}>
				<ProjectsShowcase />
			</TerminalSection>
			<AboutUsSection />
			<TerminalSection title="Mitgliedschaft" headingLevel={2} id="membership">
				<TerminalMembership />
			</TerminalSection>
			<TerminalSection title="Partner" headingLevel={2}>
				<TerminalPartners />
			</TerminalSection>
			<TerminalSection title="Neuland Blog" headingLevel={2}>
				<BlogPreview />
			</TerminalSection>
		</>
	)
}
