import AboutUsSection from '@/components/AboutUs/about-us-section'
import BlogPreview from '@/components/blog/blog-peview'
import ClientIntro from '@/components/client-intro'
import EventsSection from '@/components/Events/events-section'
import TerminalSection from '@/components/Layout/terminal-section'
import NextAppShowcase from '@/components/next-app-showcase'
import ProjectsShowcase from '@/components/Projects/projects-showcase'
import TerminalMembership from '@/components/terminal-membership'
import TerminalPartners from '@/components/terminal-partners'
import { getTranslator } from '@/lib/i18n/server'

export default async function Index() {
        const t = getTranslator()
        return (
                <>
                        <ClientIntro />
                        <EventsSection />
                        <NextAppShowcase />
                        <TerminalSection title={t.translate('home.projectsTitle') as string} headingLevel={2}>
                                <ProjectsShowcase />
                        </TerminalSection>
                        <AboutUsSection />
                        <TerminalSection
                                title={t.translate('home.membershipTitle') as string}
                                headingLevel={2}
                                id="membership"
                        >
                                <TerminalMembership />
                        </TerminalSection>
                        <TerminalSection title={t.translate('home.partnersTitle') as string} headingLevel={2}>
                                <TerminalPartners />
                        </TerminalSection>
                        <TerminalSection title={t.translate('home.blogTitle') as string} headingLevel={2}>
                                <BlogPreview />
                        </TerminalSection>
                </>
        )
}
