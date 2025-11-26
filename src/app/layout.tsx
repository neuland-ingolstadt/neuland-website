import type { Metadata } from 'next'
import { Noto_Sans, Noto_Sans_Mono, Shantell_Sans } from 'next/font/google'

import '../styles/index.css'

import MatrixEffect from '@/components/Background/page-background'
import TerminalFooter from '@/components/Footer/terminal-footer'
import TerminalHeader from '@/components/Layout/terminal-header'
import Providers from '@/components/Provider'

const overpassMono = Noto_Sans_Mono({
	variable: '--font-mono',
	subsets: ['latin'],
	display: 'swap'
})

const notoSans = Noto_Sans({
	variable: '--font-sans',
	subsets: ['latin'],
	display: 'swap'
})

const shantellSans = Shantell_Sans({
	variable: '--font-fantasy',
	subsets: ['latin'],
	display: 'swap'
})

export const metadata: Metadata = {
	title: 'Neuland Ingolstadt e.V.',
	description:
		'Der Informatik-Verein deines Vertrauens. Von Studierenden für Studierende und alle, die sich für Informatik begeistern können.',
	alternates: {
		types: {
			'application/rss+xml': [
				{ url: '/feed', title: 'Neuland Ingolstadt Blog RSS Feed' }
			]
		}
	}
}

const jsonLd = {
	'@context': 'https://schema.org',
	'@type': 'NGO',
	'@id': 'https://neuland-ingolstadt.de/',
	name: 'Neuland Ingolstadt e.V.',
	url: 'https://neuland-ingolstadt.de/',
	description:
		'Der studentische Verein für alle informatikbegeisterten Studierenden der TH Ingolstadt. Wir bieten einen Raum für Kreativität, Technologie, Bildung und Gemeinschaft.',
	address: {
		'@type': 'PostalAddress',
		streetAddress: 'Esplanade 10',
		addressLocality: 'Ingolstadt',
		postalCode: '85049',
		addressCountry: 'DE'
	},
	contactPoint: {
		'@type': 'ContactPoint',
		email: 'info@neuland-ingolstadt.de',
		contactType: 'Customer Service',
		availableLanguage: ['German', 'English']
	},
	sameAs: [
		'https://instagram.com/neuland_ingolstadt',
		'https://facebook.com/neulandingolstadt',
		'https://github.com/neuland-ingolstadt',
		'https://linkedin.com/company/neuland-ingolstadt',
		'https://thi.de/studium/studentisches-leben/studentische-vereine-an-der-thi/neuland-ingolstadt-e-v/',
		'https://neuland.app'
	],
	foundingDate: '2021'
}

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="de" className="dark" suppressHydrationWarning>
			<head>
				<meta name="theme-color" content="#000000" />
				<link rel="me" href="https://social.tchncs.de/@neuland" />
				<meta name="fediverse:creator" content="@neuland@social.tchncs.de" />
				<script
					type="application/ld+json"
					// biome-ignore lint/security/noDangerouslySetInnerHtml: ok
					dangerouslySetInnerHTML={{
						__html: JSON.stringify(jsonLd).replace(/</g, '\\u003c')
					}}
				/>
			</head>

			<body
				className={`${overpassMono.variable} ${notoSans.variable} ${shantellSans.variable} font-sans antialiased`}
			>
				<Providers>
					<TerminalHeader />
					<MatrixEffect />
					<div className="container px-4 md:px-12 xl:px-20 mx-auto pt-6 relative z-10">
						{children}
						<TerminalFooter />
					</div>
				</Providers>
			</body>
		</html>
	)
}
