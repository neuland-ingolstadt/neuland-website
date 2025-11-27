import { DEFAULT_LOCALE, type Locale } from './config'

const EN_PREFIX = '/en'

export const stripLocaleFromPath = (pathname: string): string => {
	if (pathname === EN_PREFIX) return '/'
	if (pathname.startsWith(`${EN_PREFIX}/`)) {
		const nextPath = pathname.slice(EN_PREFIX.length)
		return nextPath.length ? nextPath : '/'
	}
	return pathname
}

export const buildLocalizedPath = (pathname: string, locale: Locale): string => {
	const normalized = pathname.startsWith('/') ? pathname : `/${pathname}`
	const basePath = stripLocaleFromPath(normalized)

	if (locale === DEFAULT_LOCALE) {
		return basePath
	}

	return basePath === '/' ? EN_PREFIX : `${EN_PREFIX}${basePath}`
}
