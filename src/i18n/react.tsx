import { IntlMessageFormat } from 'intl-messageformat'
import type { ReactNode } from 'react'
import { createContext, useContext, useMemo } from 'react'
import { getMessages, type Messages, resolveMessage } from './messages'
import { defaultLocale, type Locale, resolveLocale, timeZone } from './routing'

export { defaultLocale, hasLocale, locales, resolveLocale } from './routing'
export type { Locale }
export { timeZone }

export type Translator = (
	key: string,
	values?: Record<string, string | number>
) => string

const formatCache = new Map<string, IntlMessageFormat>()

function getCachedFormat(
	message: string,
	locale: Locale,
	key: string
): IntlMessageFormat {
	const cacheKey = `${locale}:${key}`
	let format = formatCache.get(cacheKey)
	if (!format) {
		format = new IntlMessageFormat(message, locale)
		formatCache.set(cacheKey, format)
	}
	return format
}

export function createTranslator(
	locale: Locale,
	namespace?: string
): Translator {
	const messages: Messages = getMessages(locale)
	return (key, values) => {
		const fullKey = namespace ? `${namespace}.${key}` : key
		const message = resolveMessage(messages, fullKey)
		if (message === undefined) {
			return fullKey
		}
		try {
			return getCachedFormat(message, locale, fullKey).format(
				values as Record<string, unknown>
			) as string
		} catch {
			return message
		}
	}
}

type IntlContextValue = {
	locale: Locale
	messages: Messages
	timeZone: string
}

const IntlContext = createContext<IntlContextValue | null>(null)

export function IntlProvider({
	locale,
	timeZone: tz = timeZone,
	children
}: {
	locale: Locale
	timeZone?: string
	children: ReactNode
}) {
	const value = useMemo<IntlContextValue>(
		() => ({ locale, messages: getMessages(locale), timeZone: tz }),
		[locale, tz]
	)
	return <IntlContext.Provider value={value}>{children}</IntlContext.Provider>
}

export function useLocale(): Locale {
	const context = useContext(IntlContext)
	return context?.locale ?? defaultLocale
}

export function useTimeZone(): string {
	const context = useContext(IntlContext)
	return context?.timeZone ?? timeZone
}

export function useTranslations(namespace?: string): Translator {
	const locale = useLocale()
	return useMemo(
		() => createTranslator(resolveLocale(locale), namespace),
		[locale, namespace]
	)
}
