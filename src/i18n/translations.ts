import type { Locale } from './config'

export interface AppDictionary {
	meta: {
		title: string
		description: string
	}
	header: {
		membership: string
		projects: string
		blog: string
		login: string
		themeLabel: string
		localeLabel: string
		localeOptions: {
			de: string
			en: string
		}
		localeOverrideHint: string
	}
	hero: {
		tagline: string
	}
	sections: {
		projects: string
		membership: string
		partners: string
		blog: string
		projectsSubtitle: string
	}
	projectsShowcase: {
		command: string
		repoPrefix: string
		repoLabel: string
		viewAll: string
	}
	events: {
		title: string
		subtitlePrefix: string
		errorTitle: string
		errorBody: string
		unknownError: string
		maintenanceHelp: string
		emptyTitle: string
		emptyBody: string
		detailsLabel: string
		allEvents: string
		subscribeCta: string
	}
	calendarModal: {
		description: string
		stepsTitle: string
		steps: string[]
		copyAria: string
		closeAria: string
	}
	about: {
		title: string
		introHeading: string
		introBody: string
		features: {
			title: string
			desc: string
		}[]
	}
	membership: {
		commandLabel: string
		fees: {
			label: string
			amount: string
		}[]
		benefitsTitle: string
		benefits: string[]
		joinCta: string
		contactCta: string
		contactSubject: string
	}
	partners: {
		commandLabel: string
		intro: string
		heading: string
		bullets: string[]
		ctaLabel: string
		ctaSubject: string
	}
	nextApp: {
		headline: string
		tagline: string
		description: string
		bodyTitle: string
		bodyText: string
		highlightTitle: string
		highlights: string[]
		downloadLabel: string
		ctaLabel: string
		featuresHeading: string
		features: {
			title: string
			description: string
		}[]
	}
	settings: {
		showBackground: string
		hideBackground: string
		repoCommand: string
		statusCommand: string
	}
	legalLinks: {
		statutes: string
		privacyClub: string
		privacyWebsite: string
		imprint: string
	}
	footer: {
		buildLabel: string
	}
}

const deDictionary: AppDictionary = {
	meta: {
		title: 'Neuland Ingolstadt e.V.',
		description:
			'Der Informatik-Verein deines Vertrauens. Von Studierenden für Studierende und alle, die sich für Informatik begeistern können.'
	},
	header: {
		membership: 'Mitglied werden',
		projects: 'Projekte',
		blog: 'Blog',
		login: 'Login',
		themeLabel: 'Theme',
		localeLabel: 'Sprache',
		localeOptions: {
			de: 'Deutsch',
			en: 'Englisch'
		},
		localeOverrideHint: 'Bevorzugte Sprache speichern'
	},
	hero: {
		tagline:
			'Der studentische Verein für alle informatikbegeisterten Studierenden der TH Ingolstadt.'
	},
	sections: {
		projects: 'Auszug aus unseren Projekten',
		membership: 'Mitgliedschaft',
		partners: 'Partner',
		blog: 'Neuland Blog',
		projectsSubtitle: '$ projects --list | grep featured'
	},
	projectsShowcase: {
		command: '$ projects --list | grep featured',
		repoPrefix: '$ curl',
		repoLabel: 'github.com/neuland-ingolstadt',
		viewAll: 'Alle Projekte anzeigen'
	},
	events: {
		title: 'Unsere Veranstaltungen',
		subtitlePrefix: 'Events im',
		errorTitle: 'Oh nein! Beim Abrufen der Events ist etwas schiefgelaufen.',
		errorBody: 'Unsere Serverwartungsmannschaft macht gerade wohl Kaffeepause.',
		unknownError: 'Unbekannter Fehler',
		maintenanceHelp: 'Bitte versuche es später noch einmal!',
		emptyTitle: 'Danke für eure Teilnahme an den über 20 Events in diesem Semester! 🎉',
		emptyBody:
			'Wir arbeiten bereits an spannenden neuen Events für das kommende Semester.',
		detailsLabel: 'Details',
		allEvents: 'Alle Events',
		subscribeCta: 'Events abonnieren'
	},
	calendarModal: {
		description:
			'Du kannst alle Neuland Events in deinen Kalender als iCal Abonnement hinzufügen.',
		stepsTitle: 'So gehts:',
		steps: [
			'Kopiere die URL',
			'Öffne deine Kalender App',
			'Erstelle ein neues iCal Abonnement',
			'Die Events werden automatisch aktualisiert'
		],
		copyAria: 'URL kopieren',
		closeAria: 'Schließen'
	},
	about: {
		title: 'Über uns',
		introHeading: 'Gemeinschaft & Plattform',
		introBody:
			'Wir bieten Studierenden eine Plattform zum Austausch, zur Projektarbeit und zur Wissensvermittlung .',
		features: [
			{
				title: 'Projekte & Wettbewerbe',
				desc: 'Wir entwickeln innovative Projekte, nehmen an Wettbewerben teil und fördern Kreativität.'
			},
			{
				title: 'Veranstaltungen & Wissen',
				desc: 'Wir organisieren Events rund um Informatik und Technik – offen für alle Fakultäten und Studiengänge.'
			},
			{
				title: 'Community & Networking',
				desc: 'Lerne neue Leute kennen, vernetze dich und werde Teil einer aktiven, hilfsbereiten Studierenden-Community.'
			}
		]
	},
	membership: {
		commandLabel: '$ cat membership-fees.txt',
		fees: [
			{ label: 'Studierende:', amount: '5€ / Jahr' },
			{ label: 'Externe:', amount: '20€ / Jahr' }
		],
		benefitsTitle: 'Deine Vorteile:',
		benefits: [
			'Teil eines aktiven studentischen Vereins mit regelmäßigen Treffen und Austausch',
			'Gemeinsame Arbeit an Open-Source Projekten',
			'Exklusive Workshops, Hackathons und soziale Events mit Gleichgesinnten'
		],
		joinCta: 'Mitglied werden',
		contactCta: 'E-Mail schreiben',
		contactSubject: 'Frage zur Mitgliedschaft'
	},
	partners: {
		commandLabel: '$ cat sponsoring-info.txt',
		intro: 'Jetzt Partner werden und unseren Verein unterstützen!',
		heading: 'Gemeinsam erreichen wir:',
		bullets: [
			'Spannende Events, Hackathons und Workshops, die Studierende begeistern',
			'Innovative Projekte und Karriereerfolge durch echte Praxisbezüge',
			'Eine lebendige Tech-Community, die Theorie und Praxis zusammenbringt'
		],
		ctaLabel: 'Partner werden',
		ctaSubject: 'Anfrage zur Partnerschaft'
	},
	nextApp: {
		headline: 'Neuland Next',
		tagline: 'Deine App für die TH Ingolstadt',
		description:
			'Deine moderne Campus-App von Neuland Ingolstadt. Entwickelt mit Liebe zum Detail, vollständig Open Source und auf allen Geräten verfügbar.',
		bodyTitle: 'Unser Flaggschiff-Projekt',
		bodyText:
			'Neuland Next ist mehr als nur eine App – es ist dein digitaler Begleiter durch den Studienalltag an der THI. Alle wichtigen Funktionen für deinen Campus-Alltag in einer App.',
		highlightTitle: 'Warum Neuland Next',
		highlights: [
			'Maximaler Datenschutz',
			'Blitzschnelle Performance',
			'100% Open Source',
			'Regelmäßige Updates',
			'Offline-fähig',
			'Auch als Web App'
		],
		downloadLabel: 'Jetzt herunterladen',
		ctaLabel: 'Mehr erfahren',
		featuresHeading: 'Die Features auf einen Blick',
		features: [
			{
				title: 'Stundenplan & Prüfungen',
				description: 'Dein persönlicher Stundenplan und alle Prüfungen'
			},
			{
				title: 'Kalender & Events',
				description: 'Alle wichtigen Semesterdaten und Campus-Events'
			},
			{
				title: 'Profil',
				description: 'Prüfe deine Noten oder dein Druckguthaben'
			},
			{
				title: 'Mensa',
				description: 'Alle Speisepläne mit Preisen, Allergenen und Nährwerten'
			},
			{
				title: 'Campus-Karte',
				description: 'Finde freie Räume, erkunde Gebäude oder nutze smarte Vorschläge'
			},
			{
				title: 'Bibliothek',
				description: 'Nutze deinen virtuellen Bibliotheks Code zum Ausleihen'
			},
			{
				title: 'Quick Links',
				description: 'Alle wichtigen Uni-Plattformen wie Moodle oder Primuss'
			},
			{
				title: 'THI News',
				description: 'Bleibe informiert mit den neuesten Nachrichten der THI'
			}
		]
	},
	settings: {
		showBackground: 'show game of life',
		hideBackground: 'hide game of life',
		repoCommand: 'git clone neuland-website',
		statusCommand: 'curl status.neuland.app'
	},
	legalLinks: {
		statutes: 'cat Satzung',
		privacyClub: 'cat Datenschutz Neuland',
		privacyWebsite: 'cat Datenschutz Website',
		imprint: 'cat Impressum'
	},
	footer: {
		buildLabel: 'Build'
	}
}

const enDictionary: AppDictionary = {
	meta: {
		title: 'Neuland Ingolstadt e.V.',
		description:
			'The student-run tech society at THI. Built by students for everyone who loves computer science.'
	},
	header: {
		membership: 'Join us',
		projects: 'Projects',
		blog: 'Blog',
		login: 'Login',
		themeLabel: 'Theme',
		localeLabel: 'Language',
		localeOptions: {
			de: 'German',
			en: 'English'
		},
		localeOverrideHint: 'Remember my preference'
	},
	hero: {
		tagline:
			'The student association for everyone at THI who is passionate about computer science.'
	},
	sections: {
		projects: 'Featured Projects',
		membership: 'Membership',
		partners: 'Partners',
		blog: 'Neuland Blog',
		projectsSubtitle: '$ projects --list | grep featured'
	},
	projectsShowcase: {
		command: '$ projects --list | grep featured',
		repoPrefix: '$ curl',
		repoLabel: 'github.com/neuland-ingolstadt',
		viewAll: 'View all projects'
	},
	events: {
		title: 'Our Events',
		subtitlePrefix: 'Events in',
		errorTitle: 'Something went wrong while fetching the events.',
		errorBody: 'Our infrastructure team is probably on a coffee break right now.',
		unknownError: 'Unknown error',
		maintenanceHelp: 'Please try again in a moment!',
		emptyTitle: 'Thanks for joining more than 20 events this semester! 🎉',
		emptyBody: 'We are already preparing the next batch of exciting meetups.',
		detailsLabel: 'Details',
		allEvents: 'All events',
		subscribeCta: 'Subscribe to events'
	},
	calendarModal: {
		description:
			'Add every Neuland event to your personal calendar via an iCal subscription.',
		stepsTitle: 'How it works:',
		steps: [
			'Copy the URL',
			'Open your calendar app',
			'Create a new iCal subscription',
			'Events will stay in sync automatically'
		],
		copyAria: 'Copy URL',
		closeAria: 'Close dialog'
	},
	about: {
		title: 'About us',
		introHeading: 'Community & Platform',
		introBody:
			'We provide a platform for students to collaborate, exchange knowledge, and ship ideas together.',
		features: [
			{
				title: 'Projects & Competitions',
				desc: 'We prototype new ideas, compete in challenges, and keep creativity alive.'
			},
			{
				title: 'Events & Learning',
				desc: 'We host tech events that welcome every faculty, study program, and skill level.'
			},
			{
				title: 'Community & Networking',
				desc: 'Meet new people, build your network, and become part of an active student tech community.'
			}
		]
	},
	membership: {
		commandLabel: '$ cat membership-fees.txt',
		fees: [
			{ label: 'Students:', amount: '€5 / year' },
			{ label: 'External:', amount: '€20 / year' }
		],
		benefitsTitle: 'Your benefits:',
		benefits: [
			'Join an active student community with regular meetups and knowledge sharing',
			'Work on real open-source projects together',
			'Get access to exclusive workshops, hackathons, and social events'
		],
		joinCta: 'Become a member',
		contactCta: 'Send email',
		contactSubject: 'Membership question'
	},
	partners: {
		commandLabel: '$ cat sponsoring-info.txt',
		intro: 'Become a partner and support our mission!',
		heading: 'Together we unlock:',
		bullets: [
			'Exciting events, hackathons, and workshops that inspire students',
			'Innovative projects and career opportunities with real-world impact',
			'A vibrant tech community that connects theory and practice'
		],
		ctaLabel: 'Contact us',
		ctaSubject: 'Partnership request'
	},
	nextApp: {
		headline: 'Neuland Next',
		tagline: 'The THI companion app',
		description:
			'Your modern campus app by Neuland Ingolstadt. Crafted with care, fully open source, and available on every device.',
		bodyTitle: 'Our flagship project',
		bodyText:
			'Neuland Next is your digital co-pilot throughout your studies at THI. All campus essentials combined in a single experience.',
		highlightTitle: 'Why Neuland Next',
		highlights: [
			'Privacy-first by design',
			'Fast and responsive UX',
			'100% open source',
			'Frequent feature releases',
			'Offline-ready',
			'Available as a web app'
		],
		downloadLabel: 'Download now',
		ctaLabel: 'Learn more',
		featuresHeading: 'Feature overview',
		features: [
			{
				title: 'Schedule & exams',
				description: 'Keep track of your timetable and exam schedule'
			},
			{
				title: 'Calendar & events',
				description: 'Important semester dates and all campus events'
			},
			{
				title: 'Profile',
				description: 'Check your grades or printing credits'
			},
			{
				title: 'Cafeteria',
				description: 'Menus with pricing, allergens, and nutrition info'
			},
			{
				title: 'Campus map',
				description: 'Find free rooms, explore buildings, and smart suggestions'
			},
			{
				title: 'Library',
				description: 'Use your virtual library code for checkouts'
			},
			{
				title: 'Quick links',
				description: 'Direct access to Moodle, Primuss, and more'
			},
			{
				title: 'THI news',
				description: 'Stay up to date with university news'
			}
		]
	},
	settings: {
		showBackground: 'show game of life',
		hideBackground: 'hide game of life',
		repoCommand: 'git clone neuland-website',
		statusCommand: 'curl status.neuland.app'
	},
	legalLinks: {
		statutes: 'cat statutes',
		privacyClub: 'cat club privacy',
		privacyWebsite: 'cat website privacy',
		imprint: 'cat imprint'
	},
	footer: {
		buildLabel: 'Build'
	}
}

export const translations: Record<Locale, AppDictionary> = {
	de: deDictionary,
	en: enDictionary
}

export const getDictionary = (locale: Locale): AppDictionary =>
	translations[locale] ?? translations.de
