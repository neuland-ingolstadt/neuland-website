import { createServerFn } from '@tanstack/react-start'
import { getRequest } from '@tanstack/react-start/server'
import {
	defaultLocale,
	type Locale,
	locales,
	resolveLocale
} from '@/i18n/routing'

const LOCALE_COOKIE = 'NEXT_LOCALE'

function parseAcceptLanguage(header: string | undefined): Locale | null {
	if (!header) return null
	const candidates = header
		.split(',')
		.map((part) => {
			const [tag, q] = part.trim().split(';q=')
			const quality = q ? Number(q) : 1
			return {
				tag: tag.trim().toLowerCase(),
				q: Number.isFinite(quality) ? quality : 0
			}
		})
		.sort((a, b) => b.q - a.q)

	for (const { tag } of candidates) {
		const exact = locales.find((locale) => locale === tag)
		if (exact) return exact
		const base = tag.split('-')[0]
		const partial = locales.find((locale) => locale === base)
		if (partial) return partial
	}
	return null
}

export const detectLocale = createServerFn().handler(
	async (): Promise<Locale> => {
		const request = getRequest()
		const cookieHeader = request.headers.get('cookie') ?? ''
		const cookieLocale = cookieHeader
			.split(';')
			.map((cookie) => cookie.trim())
			.find((cookie) => cookie.startsWith(`${LOCALE_COOKIE}=`))
			?.split('=')[1]
		if (cookieLocale && locales.includes(cookieLocale as never)) {
			return resolveLocale(cookieLocale)
		}
		return (
			parseAcceptLanguage(
				request.headers.get('accept-language') ?? undefined
			) ?? defaultLocale
		)
	}
)
