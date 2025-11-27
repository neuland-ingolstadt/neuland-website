import { cookies, headers } from 'next/headers'
import {
	DEFAULT_LOCALE,
	LOCALE_COOKIE,
	SUPPORTED_LOCALES,
	type Locale
} from './config'

const SUPPORTED_SET = new Set<Locale>(SUPPORTED_LOCALES)

const isSupportedLocale = (value: string | undefined | null): value is Locale =>
	!!value && SUPPORTED_SET.has(value as Locale)

const parseAcceptLanguage = (value: string | null): Locale | null => {
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

export const getRequestLocale = async (): Promise<Locale> => {
	const cookieStore = await cookies()
	const cookieLocale = cookieStore.get(LOCALE_COOKIE)?.value
	if (isSupportedLocale(cookieLocale)) {
		return cookieLocale
	}

	const headersList = await headers()
	const acceptLanguage = headersList.get('accept-language')
	const detected = parseAcceptLanguage(acceptLanguage)

	return detected ?? DEFAULT_LOCALE
}
