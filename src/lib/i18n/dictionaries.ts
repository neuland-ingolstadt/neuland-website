import de from '@/locales/de.json'
import en from '@/locales/en.json'
import type { Locale } from './config'

export const dictionaries: Record<Locale, Record<string, unknown>> = {
        de,
        en
}
