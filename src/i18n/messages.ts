import de from '../../messages/de.json'
import en from '../../messages/en.json'
import type { Locale } from './routing'

type Messages = { [key: string]: string | Messages }

export type { Messages }

const catalogs: Record<Locale, Messages> = {
	en: en as Messages,
	de: de as Messages
}

export function getMessages(locale: Locale): Messages {
	return catalogs[locale]
}

export function resolveMessage(
	messages: Messages,
	key: string
): string | undefined {
	let current: string | Messages | undefined = messages
	for (const segment of key.split('.')) {
		if (typeof current !== 'object' || current === null) return undefined
		current = current[segment]
	}
	return typeof current === 'string' ? current : undefined
}
