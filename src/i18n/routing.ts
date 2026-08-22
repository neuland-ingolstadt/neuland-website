export const locales = ['en', 'de'] as const

export type Locale = (typeof locales)[number]

export const defaultLocale: Locale = 'en'

export const timeZone = 'Europe/Berlin'

export function hasLocale(value: string | undefined | null): value is Locale {
	return (
		typeof value === 'string' && (locales as readonly string[]).includes(value)
	)
}

export function resolveLocale(value: string | undefined | null): Locale {
	return hasLocale(value) ? value : defaultLocale
}
