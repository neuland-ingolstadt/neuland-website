import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { LOCALE_COOKIE } from '@/i18n/config'

const ONE_YEAR_IN_SECONDS = 60 * 60 * 24 * 365

const parseAcceptLanguage = (value: string | null): 'en' | 'de' | null => {
	if (!value) return null

	const languages = value
		.split(',')
		.map((part) => {
			const [lang, qValue] = part.trim().split(';q=')
			const quality = qValue ? Number.parseFloat(qValue) : 1
			return {
				lang: lang.toLowerCase(),
				quality: Number.isFinite(quality) ? quality : 0
			}
		})
		.sort((a, b) => b.quality - a.quality)

	for (const candidate of languages) {
		if (candidate.lang.startsWith('en')) {
			return 'en'
		}
		if (candidate.lang.startsWith('de')) {
			return 'de'
		}
	}

	return null
}

const buildEnglishRedirect = (pathname: string) =>
	`${pathname === '/' ? '/en' : `/en${pathname}`}`.replace(/\/+/g, '/').replace('//', '/')

export function middleware(request: NextRequest) {
	const { pathname } = request.nextUrl

	// Allow Next internals and static assets to pass through untouched
	if (
		pathname.startsWith('/_next') ||
		pathname.startsWith('/api') ||
		pathname.startsWith('/static') ||
		pathname.match(/\.[a-zA-Z0-9]+$/)
	) {
		return NextResponse.next()
	}

	const isEnglishPath = pathname === '/en' || pathname.startsWith('/en/')
	const localeCookie = request.cookies.get(LOCALE_COOKIE)?.value

	if (isEnglishPath) {
		const strippedPath = pathname === '/en' ? '/' : pathname.replace(/^\/en/, '') || '/'
		const rewriteUrl = request.nextUrl.clone()
		rewriteUrl.pathname = strippedPath
		const response = NextResponse.rewrite(rewriteUrl)
		response.cookies.set(LOCALE_COOKIE, 'en', {
			path: '/',
			maxAge: ONE_YEAR_IN_SECONDS
		})
		return response
	}

	const detectedLocale =
		localeCookie === 'en' || localeCookie === 'de'
			? (localeCookie as 'en' | 'de')
			: parseAcceptLanguage(request.headers.get('accept-language'))

	if (detectedLocale === 'en') {
		const redirectUrl = request.nextUrl.clone()
		redirectUrl.pathname = buildEnglishRedirect(pathname)
		return NextResponse.redirect(redirectUrl)
	}

	const response = NextResponse.next()
	if (localeCookie !== 'de') {
		response.cookies.set(LOCALE_COOKIE, 'de', {
			path: '/',
			maxAge: ONE_YEAR_IN_SECONDS
		})
	}
	return response
}

export const config = {
	matcher: ['/((?!_next|api|.*\\..*).*)']
}
