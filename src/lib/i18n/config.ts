export const locales = ['de', 'en'] as const

export type Locale = (typeof locales)[number]

export const defaultLocale: Locale = 'de'

export const localeCookieName = 'NEXT_LOCALE'

export const isLocale = (value: string | undefined | null): value is Locale =>
        Boolean(value && locales.includes(value as Locale))
