import NextAppShowcase from '@/components/NextAppShowcase'
import ProjectsShowcase from '@/components/ProjectsShowcase'
import TerminalFooter from '@/components/TerminalFooter'
import TerminalList from '@/components/TerminalList'
import TerminalMembership from '@/components/TerminalMembership'
import TerminalPartners from '@/components/TerminalPartners'
import TerminalSection from '@/components/TerminalSection'
import TerminalWindow from '@/components/TerminalWindow'
import TypewriterText from '@/components/TypewriterText'
import eventData from '@/data/events.json'
import React from 'react'

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

			<TerminalSection
				title="Aktuelle Veranstaltungen"
				subtitle={`Events im ${eventData.semester}`}
			>
				<div className="max-w-5xl mx-auto justify-start mt-8">
					<TerminalWindow
						title={`events.sh --semester '${eventData.semester}'`}
					>
						<TerminalList>
							{eventData.events.map((event, index) => (
								// biome-ignore lint/suspicious/noArrayIndexKey: not a problem here
								<div key={index}>
									<strong className="keyword">{event.title}</strong>
									<br />
									{event.description.split('\n').map((line, i) => (
										// biome-ignore lint/suspicious/noArrayIndexKey: not a problem here
										<React.Fragment key={i}>
											{line}
											{i < event.description.split('\n').length - 1 && <br />}
										</React.Fragment>
									))}
								</div>
							))}
						</TerminalList>
					</TerminalWindow>
				</div>
			</TerminalSection>

			{/* Add our NextAppShowcase component */}
			<NextAppShowcase />

			{/* Replace the old TerminalList with our new ProjectsShowcase */}
			<TerminalSection title="Auszug aus unseren Projekten">
				<ProjectsShowcase />
			</TerminalSection>
			<TerminalSection title="Über uns">
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
			<TerminalSection title="Mitgliedschaft">
				<TerminalMembership />
			</TerminalSection>

			<TerminalSection title="Unterstützt durch">
				<TerminalPartners />
			</TerminalSection>

			<TerminalFooter />
		</div>
	)
}

export default Index
