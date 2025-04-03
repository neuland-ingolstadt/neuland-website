import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious
} from '@/components/ui/carousel'
import { motion } from 'framer-motion'
import type React from 'react'
import { useState } from 'react'
import ProjectCard, { type ProjectDetails } from './ProjectCard'
import ProjectDetailModal from './ProjectDetailModal'

// Project data
const projectsData: ProjectDetails[] = [
	{
		id: 'neuland-app',
		title: 'neuland.app',
		description:
			'Eine web-basierte und sichere und vor allem stabile Alternative zur THI-App.',
		links: [
			{ label: 'Web', url: 'https://neuland.app' },
			{
				label: 'GitHub',
				url: 'https://github.com/neuland-ingolstadt/neuland.app'
			}
		],
		tags: ['Next.js', 'PWA', 'Web'],
		longDescription:
			'Die ist eine progressive Web-App, die als Alternative zur offiziellen THI-App entwickelt wurde. In ihr liegt der Grunstein für Neuland Ingolstadt und die Neuland Next App.',
		additionalInfo:
			'Das Projekt wurde als Next.js-Anwendung umgesetzt und ist mittlerweile weitesgehends von unserer Neuland Next App abgelöst worden.'
	},
	{
		id: 'neuland-next',
		title: 'Neuland Next',
		description:
			'Unsere inoffizielle Campus-App für die THI, als Nachtfolger der neuland.app.',
		links: [
			{ label: 'Details', url: 'https://next.neuland.app' },
			{
				label: 'GitHub',
				url: 'https://github.com/neuland-ingolstadt/neuland.app-native'
			}
		],
		tags: ['React Native', 'Expo', 'Mobile'],
		longDescription:
			'Neuland Next bietet als inoffizielle Campus-App für die THI eine moderne und benutzerfreundliche Oberfläche für Studierende, um den Studienalltag zu erleichtern.',
		imageUrl: '/assets/neuland_next_screenshot.png',
		additionalInfo:
			'Die App wurde mit React Native und Expo entwickelt und ist sowohl im App Store als auch im Play Store verfügbar.'
	},
	{
		id: 'ersti-hilfe',
		title: 'Ersti-Hilfe-Kit',
		description:
			'Dein Campus. Dein Studium. Deine Veranstaltungen. Alles auf einen Blick!',
		links: [
			{ label: 'Web', url: 'https://ersti.neuland.app/' },
			{
				label: 'GitHub',
				url: 'https://github.com/neuland-ingolstadt/orientierungsphase'
			}
		],
		imageUrl: '/assets/ersti_kit.png',
		tags: ['Next.js', 'Web', 'StudVer'],
		longDescription:
			'Das Ersti-Hilfe-Kit ist eine Webseite speziell für Erstsemester an der THI. Hier finden neue Studierende alle wichtigen Informationen zum Studienstart, zur Orientierung auf dem Campus und in der Stadt.',
		additionalInfo:
			'Das Projekt wurde mit Next.js umgesetzt, mit einem Fokus auf Benutzerfreundlichkeit und ansprechendes Design.'
	},
	{
		id: 'ctf-team',
		title: 'CTF-Team',
		description:
			'Vereins-Team, welches an verschiedenen Capture-the-Flag-Wettbewerben teilnimmt.',
		links: [
			{ label: 'Blog', url: 'https://blog.neuland-ingolstadt.de' },
			{ label: 'CTFtime', url: 'https://ctftime.org/team/150968' },
			{ label: 'Neuland CTF', url: 'https://ctf.neuland-ingolstadt.de' }
		],
		tags: ['Cybersecurity', 'CTF', 'Hacking', 'Wettbewerbe'],
		longDescription:
			'Unser CTF-Team nimmt regelmäßig an Capture-the-Flag-Wettbewerben teil, bei denen es darum geht, IT-Sicherheitsprobleme zu lösen und "Flaggen" zu erobern. Diese Wettbewerbe sind eine hervorragende Möglichkeit, praktische Erfahrungen im Bereich der IT-Sicherheit zu sammeln und die eigenen Fähigkeiten weiterzuentwickeln.',
		additionalInfo:
			'Wir organisieren regelmäßig Trainings und Workshops, um neue Mitglieder in die Welt der CTFs einzuführen und gemeinsam unsere Fähigkeiten zu verbessern.'
	},
	{
		id: 'it-studver',
		title: 'IT für StudVer & Vereine',
		description:
			'IT-Infrastruktur für die Studierendenvertretung und studentische Vereine.',
		links: [{ label: 'Kontakt', url: 'mailto:info@neuland-ingolstadt.de' }],
		tags: ['Infrastruktur', 'Server', 'Dienstleistung'],
		longDescription:
			'Wir stellen IT-Infrastruktur für die Studierendenvertretung und andere studentische Vereine an der THI bereit.',
		additionalInfo:
			'Wir bieten Unterstützung bei der Einrichtung von Servern, Webanwendungen und anderen IT-Diensten, um den Vereinen zu helfen, ihre Arbeit effizienter zu gestalten.'
	},
	{
		id: 'neuland-api',
		title: 'Neuland API',
		description: 'Die zentrale GraphQL-API für alle Neuland-Projekte.',
		links: [
			{ label: 'Info', url: 'https://api.neuland.app' },
			{
				label: 'GitHub',
				url: 'htttps://github.com/neuland-ingolstadt/neuland.app-backend'
			}
		],
		tags: ['API', 'GraphQL'],
		longDescription:
			'Die Neuland API ist das Herzstück unserer THI-Projekte. Egal ob für Mensa, Campus Events oder Hochschulsport - sie ist die zentrale Anlaufstelle für alle Daten und Informationen, die unsere Anwendungen benötigen.',
		additionalInfo:
			'Die API ist in Node.js als GraphQL-Server implementiert und bietet eine flexible und leistungsstarke Schnittstelle für unsere Frontend-Anwendungen.'
	}
]

const ProjectsShowcase: React.FC = () => {
	const [selectedProject, setSelectedProject] = useState<ProjectDetails | null>(
		null
	)
	const [isModalOpen, setIsModalOpen] = useState(false)

	const openProjectDetails = (project: ProjectDetails) => {
		setSelectedProject(project)
		setIsModalOpen(true)
	}

	const closeProjectDetails = () => {
		setIsModalOpen(false)
		// Keep the selected project during close animation
		setTimeout(() => setSelectedProject(null), 300)
	}

	return (
		<div className="relative">
			{/* Title with animation */}
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				whileInView={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6 }}
				viewport={{ once: true }}
				className="mb-6"
			>
				<p className="text-sm opacity-80 mb-6 font-mono">
					$ projects --list | grep featured
				</p>
			</motion.div>

			{/* Project Carousel */}
			<Carousel
				opts={{
					align: 'start',
					loop: true
				}}
				className="w-full"
			>
				<CarouselContent className="-ml-4">
					{projectsData.map((project) => (
						<CarouselItem
							key={project.id}
							className="pl-4 sm:basis-1/2 lg:basis-1/3"
						>
							<ProjectCard
								project={project}
								onClick={() => openProjectDetails(project)}
							/>
						</CarouselItem>
					))}
				</CarouselContent>
				<CarouselPrevious className="left-0" />
				<CarouselNext className="right-0" />
			</Carousel>

			{/* Terminal decoration */}
			<div className="mt-6 mb-8">
				<div className="font-mono text-sm opacity-80">
					<span className="text-terminal-cyan">$</span> curl{' '}
					<a
						href="https://github.com/neuland-ingolstadt"
						target="_blank"
						rel="noreferrer noopener"
						className="text-terminal-cyan"
					>
						github.com/neuland-ingolstadt
					</a>
				</div>
			</div>

			{/* Details Modal */}
			<ProjectDetailModal
				project={selectedProject}
				isOpen={isModalOpen}
				onClose={closeProjectDetails}
			/>
		</div>
	)
}

export default ProjectsShowcase
