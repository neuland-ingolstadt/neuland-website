import { cookies, headers } from 'next/headers'
import { MDText } from 'i18n-react'
import { defaultLocale, isLocale, localeCookieName, type Locale } from './config'
import { dictionaries } from './dictionaries'

const parseAcceptLanguage = (headerValue: string | null): Locale | null => {
        if (!headerValue) return null
        const preferred = headerValue.split(',')[0]?.split('-')[0]?.toLowerCase()
        if (preferred && isLocale(preferred)) {
                return preferred
        }
        return null
}

export const getLocale = (): Locale => {
        const cookieStore = cookies()
        const cookieLocale = cookieStore.get(localeCookieName)?.value
        if (isLocale(cookieLocale)) return cookieLocale

        const headerLocale = parseAcceptLanguage(headers().get('accept-language'))
        if (headerLocale) return headerLocale

        return defaultLocale
}

export const getTranslator = (locale?: Locale) => {
        const activeLocale = locale && isLocale(locale) ? locale : getLocale()
        const dictionary = dictionaries[activeLocale]
        return new MDText(dictionary, { MDFlavor: 0 })
}
