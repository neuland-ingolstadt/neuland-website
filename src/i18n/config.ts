export const SUPPORTED_LOCALES = ['de', 'en'] as const

export type Locale = (typeof SUPPORTED_LOCALES)[number]

export const DEFAULT_LOCALE: Locale = 'de'

export const LOCALE_COOKIE = 'neuland_locale'
