/// <reference types="vite/client" />
import {
	createRootRoute,
	HeadContent,
	Outlet,
	Scripts,
	useRouterState
} from '@tanstack/react-router'
import type { ReactNode } from 'react'
import Providers from '@/components/Provider'
import { createTranslator } from '@/i18n/react'
import {
	defaultLocale,
	hasLocale,
	type Locale,
	resolveLocale
} from '@/i18n/routing'
import '@/styles/index.css'

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

const criticalCss = `
  html{background:#020302;color-scheme:dark}
  @media (prefers-color-scheme:light){
    html:not([data-theme]){background:#f5f8f5;color-scheme:light}
  }
  html[data-theme="light"]{background:#f5f8f5;color-scheme:light}
  html[data-theme="dark"]{background:#020302;color-scheme:dark}
  body{margin:0;min-height:100%}
`

function localeFromPathname(pathname: string): Locale {
	const segment = pathname.split('/')[1]
	return hasLocale(segment) ? segment : defaultLocale
}

function usePathLocale(): Locale {
	return useRouterState({
		select: (state) => localeFromPathname(state.location.pathname)
	})
}

export const Route = createRootRoute({
	head: () => ({
		meta: [
			{ charSet: 'utf-8' },
			{ name: 'viewport', content: 'width=device-width, initial-scale=1' },
			{ name: 'color-scheme', content: 'dark light' },
			{
				name: 'theme-color',
				content: '#020302',
				media: '(prefers-color-scheme: dark)'
			},
			{
				name: 'theme-color',
				content: '#f5f8f5',
				media: '(prefers-color-scheme: light)'
			},
			{ name: 'fediverse:creator', content: '@neuland@social.tchncs.de' }
		],
		links: [
			{ rel: 'me', href: 'https://social.tchncs.de/@neuland' },
			{ rel: 'icon', href: '/favicon.ico', sizes: 'any' },
			{ rel: 'icon', href: '/favicon.svg', type: 'image/svg+xml' },
			{ rel: 'icon', href: '/icon1.png', type: 'image/png' },
			{ rel: 'apple-touch-icon', href: '/apple-icon.png' },
			{ rel: 'manifest', href: '/manifest.json' },
			{
				rel: 'alternate',
				type: 'application/rss+xml',
				href: '/feed',
				title: 'Neuland Ingolstadt Blog RSS Feed'
			}
		]
	}),
	component: RootComponent
})

function RootComponent(): ReactNode {
	const locale = usePathLocale()
	const t = createTranslator(resolveLocale(locale), 'Metadata')

	const jsonLd = {
		'@context': 'https://schema.org',
		'@type': 'NGO',
		'@id': 'https://neuland-ingolstadt.de/',
		name: 'Neuland Ingolstadt e.V.',
		url: 'https://neuland-ingolstadt.de/',
		description: t('jsonLd.description'),
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
				<style
					// biome-ignore lint/security/noDangerouslySetInnerHtml: critical CSS before paint
					dangerouslySetInnerHTML={{ __html: criticalCss }}
				/>
				<script
					// Ensure the correct theme is applied before React hydration to avoid flashes
					// biome-ignore lint/security/noDangerouslySetInnerHtml: ok
					dangerouslySetInnerHTML={{ __html: themeScript }}
				/>
				<HeadContent />
				<script
					type="application/ld+json"
					// biome-ignore lint/security/noDangerouslySetInnerHtml: ok
					dangerouslySetInnerHTML={{
						__html: JSON.stringify(jsonLd).replace(/</g, '\\u003c')
					}}
				/>
			</head>

			<body className="font-sans antialiased">
				<Providers locale={locale}>
					<Outlet />
				</Providers>
				<Scripts />
			</body>
		</html>
	)
}
