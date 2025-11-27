import AboutUsSection from '@/components/AboutUs/about-us-section'
import BlogPreview from '@/components/blog/blog-peview'
import ClientIntro from '@/components/client-intro'
import EventsSection from '@/components/Events/events-section'
import TerminalSection from '@/components/Layout/terminal-section'
import NextAppShowcase from '@/components/next-app-showcase'
import ProjectsShowcase from '@/components/Projects/projects-showcase'
import TerminalMembership from '@/components/terminal-membership'
import TerminalPartners from '@/components/terminal-partners'
import { getRequestLocale } from '@/i18n/server'
import { getDictionary } from '@/i18n/translations'

export default async function Index() {
	const locale = await getRequestLocale()
	const dictionary = getDictionary(locale)

	return (
		<>
			<ClientIntro />
			<EventsSection />
			<NextAppShowcase />
			<TerminalSection title={dictionary.sections.projects} headingLevel={2}>
				<ProjectsShowcase />
			</TerminalSection>
			<AboutUsSection />
			<TerminalSection
				title={dictionary.sections.membership}
				headingLevel={2}
				id="membership"
			>
				<TerminalMembership />
			</TerminalSection>
			<TerminalSection title={dictionary.sections.partners} headingLevel={2}>
				<TerminalPartners />
			</TerminalSection>
			<TerminalSection title={dictionary.sections.blog} headingLevel={2}>
				<BlogPreview />
			</TerminalSection>
		</>
	)
}
