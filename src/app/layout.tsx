import type { Metadata } from 'next'
import { Noto_Sans, Noto_Sans_Mono } from 'next/font/google'

import '../styles/index.css'

import MatrixEffect from '@/components/Background/page-background'
import TerminalFooter from '@/components/Footer/terminal-footer'
import TerminalHeader from '@/components/Layout/terminal-header'
import Providers from '@/components/Provider'
import { I18nProvider } from '@/i18n/provider'
import { getRequestLocale } from '@/i18n/server'
import { getDictionary } from '@/i18n/translations'

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

export async function generateMetadata(): Promise<Metadata> {
	const locale = getRequestLocale()
	const dictionary = getDictionary(locale)

	return {
		title: dictionary.meta.title,
		description: dictionary.meta.description,
		alternates: {
			languages: {
				de: '/',
				en: '/en'
			},
			types: {
				'application/rss+xml': [
					{ url: '/feed', title: 'Neuland Ingolstadt Blog RSS Feed' }
				]
			}
		}
	}
}

const themeScript = `
  (function() {
    try {
      var storageKey = 'neuland-theme';
      var mode = window.localStorage.getItem(storageKey);
      var root = document.documentElement;

      if (mode === 'light' || mode === 'dark') {
        root.setAttribute('data-theme', mode);
      } else {
        root.removeAttribute('data-theme');
      }
    } catch (e) {
      // Fail silently – default to system preference via CSS
    }
  })();
`

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	const locale = getRequestLocale()
	const dictionary = getDictionary(locale)

	const jsonLd = {
		'@context': 'https://schema.org',
		'@type': 'NGO',
		'@id': 'https://neuland-ingolstadt.de/',
		name: 'Neuland Ingolstadt e.V.',
		url: 'https://neuland-ingolstadt.de/',
		description: dictionary.meta.description,
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

	return (
		<html lang={locale} suppressHydrationWarning>
			<head>
				<meta name="color-scheme" content="dark light" />
				<meta
					name="theme-color"
					content="#020302"
					media="(prefers-color-scheme: dark)"
				/>
				<meta
					name="theme-color"
					content="#f5f8f5"
					media="(prefers-color-scheme: light)"
				/>
				<link rel="me" href="https://social.tchncs.de/@neuland" />
				<meta name="fediverse:creator" content="@neuland@social.tchncs.de" />
				<script
					// Ensure the correct theme is applied before React hydration to avoid flashes
					// biome-ignore lint/security/noDangerouslySetInnerHtml: ok
					dangerouslySetInnerHTML={{ __html: themeScript }}
				/>
				<script
					type="application/ld+json"
					// biome-ignore lint/security/noDangerouslySetInnerHtml: ok
					dangerouslySetInnerHTML={{
						__html: JSON.stringify(jsonLd).replace(/</g, '\\u003c')
					}}
				/>
			</head>

			<body
				className={`${overpassMono.variable} ${notoSans.variable} font-sans antialiased`}
			>
				<I18nProvider locale={locale}>
					<Providers>
						<TerminalHeader />
						<MatrixEffect />
						<div className="container px-4 md:px-12 xl:px-20 mx-auto pt-6 relative z-10">
							{children}
							<TerminalFooter />
						</div>
					</Providers>
				</I18nProvider>
			</body>
		</html>
	)
}
