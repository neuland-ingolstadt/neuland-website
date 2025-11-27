'use client'

import type { ReactNode } from 'react'
import { createContext, useContext, useMemo } from 'react'
import { MDText } from 'i18n-react'
import type { Locale } from './config'
import type { AppDictionary } from './translations'
import { translations } from './translations'

interface I18nContextValue {
	locale: Locale
	dictionary: AppDictionary
	translate: (key: string, options?: Record<string, unknown>) => React.ReactNode
}

const I18nContext = createContext<I18nContextValue | null>(null)

export function I18nProvider({
	locale,
	children
}: {
	locale: Locale
	children: ReactNode
}) {
	const value = useMemo<I18nContextValue>(() => {
		const mdText = new MDText(translations[locale])

		return {
			locale,
			dictionary: translations[locale],
			translate: (key: string, options?: Record<string, unknown>) =>
				mdText.translate(key, options)
		}
	}, [locale])

	return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export function useI18n() {
	const context = useContext(I18nContext)
	if (!context) {
		throw new Error('useI18n must be used within I18nProvider')
	}

	const text = (key: string, fallback?: string) => {
		const result = context.translate(key)

		if (result === null || result === undefined) {
			return fallback ?? key
		}

		if (typeof result === 'string') {
			return result
		}

		if (Array.isArray(result)) {
			return result.join('')
		}

		return (result as { props?: { children?: string } })?.props?.children ?? fallback ?? key
	}

	return {
		locale: context.locale,
		dictionary: context.dictionary,
		t: text
	}
}
