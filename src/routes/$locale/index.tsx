import { createFileRoute } from '@tanstack/react-router'
import AboutUsSection from '@/components/AboutUs/about-us-section'
import BlogPreview from '@/components/blog/blog-peview'
import ClientIntro from '@/components/client-intro'
import { getEventsData } from '@/components/Events/events-loader'
import EventsSection from '@/components/Events/events-section'
import TerminalSection from '@/components/Layout/terminal-section'
import NextAppShowcase from '@/components/next-app-showcase'
import ProjectsShowcase from '@/components/Projects/projects-showcase'
import TerminalMembership from '@/components/terminal-membership'
import TerminalPartners from '@/components/terminal-partners'
import { createTranslator, resolveLocale, useTranslations } from '@/i18n/react'

export const Route = createFileRoute('/$locale/')({
	loader: async () => {
		const result = await getEventsData()
		return { eventsData: result.events, error: result.error }
	},
	head: ({ params }) => {
		const t = createTranslator(resolveLocale(params.locale), 'Metadata')
		return {
			meta: [
				{ title: t('title'), name: 'description', content: t('description') }
			]
		}
	},
	component: Index
})

function Index() {
	const t = useTranslations('Home')
	const eventsData = Route.useLoaderData()

	return (
		<>
			<ClientIntro />
			<EventsSection
				eventsData={eventsData.eventsData}
				error={eventsData.error}
			/>
			<NextAppShowcase />
			<TerminalSection title={t('projectsSection.title')} headingLevel={2}>
				<ProjectsShowcase />
			</TerminalSection>
			<AboutUsSection />
			<TerminalSection
				title={t('membershipSection.title')}
				headingLevel={2}
				id="membership"
			>
				<TerminalMembership />
			</TerminalSection>
			<TerminalSection title={t('partnerSection.title')} headingLevel={2}>
				<TerminalPartners />
			</TerminalSection>
			<TerminalSection title="Neuland Blog" headingLevel={2}>
				<BlogPreview />
			</TerminalSection>
		</>
	)
}
