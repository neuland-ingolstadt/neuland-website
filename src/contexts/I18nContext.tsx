'use client'

import { MDText } from 'i18n-react'
import { usePathname, useRouter } from 'next/navigation'
import {
        createContext,
        useCallback,
        useContext,
        useEffect,
        useMemo,
        useState
} from 'react'
import { dictionaries } from '@/lib/i18n/dictionaries'
import { defaultLocale, isLocale, localeCookieName, type Locale } from '@/lib/i18n/config'

interface I18nContextValue {
        locale: Locale
        translate: (key: string, params?: Record<string, unknown>) => string
        setLocale: (locale: Locale) => void
}

const I18nContext = createContext<I18nContextValue | null>(null)

const getInitialLocale = (initialLocale?: Locale): Locale => {
        if (initialLocale && isLocale(initialLocale)) return initialLocale
        if (typeof window !== 'undefined') {
                                // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
                const saved = document.cookie
                        .split('; ')
                        .find((row) => row.startsWith(`${localeCookieName}=`))
                        ?.split('=')[1]
                if (isLocale(saved)) return saved
        }
        return defaultLocale
}

export const I18nProvider = ({
        children,
        initialLocale
}: {
        children: React.ReactNode
        initialLocale?: Locale
}) => {
        const pathname = usePathname()
        const router = useRouter()
        const [locale, setLocaleState] = useState<Locale>(() => getInitialLocale(initialLocale))

        const translator = useMemo(() => new MDText(dictionaries[locale], { MDFlavor: 0 }), [locale])

        const translate = useCallback(
                (key: string, params?: Record<string, unknown>) => {
                        const result = translator.translate(key, params)
                        if (typeof result === 'string') return result
                        if (Array.isArray(result)) return result.join(' ')
                        return String(result ?? key)
                },
                [translator]
        )

        useEffect(() => {
                document.documentElement.lang = locale
                const expires = new Date()
                expires.setFullYear(expires.getFullYear() + 1)
                document.cookie = `${localeCookieName}=${locale}; path=/; expires=${expires.toUTCString()}`
        }, [locale])

        const setLocale = useCallback(
                (nextLocale: Locale) => {
                        setLocaleState(nextLocale)
                        if (!pathname) return

                        const withoutLocalePrefix = pathname.startsWith('/en')
                                ? pathname.replace('/en', '') || '/'
                                : pathname
                        if (nextLocale === 'en') {
                                if (!pathname.startsWith('/en')) {
                                        router.replace(`/en${withoutLocalePrefix === '/' ? '' : withoutLocalePrefix}`)
                                }
                        } else if (pathname.startsWith('/en')) {
                                router.replace(withoutLocalePrefix || '/')
                        }
                        router.refresh()
                },
                [pathname, router]
        )

        return (
                <I18nContext.Provider value={{ locale, translate, setLocale }}>
                        {children}
                </I18nContext.Provider>
        )
}

export const useTranslations = () => {
        const context = useContext(I18nContext)
        if (!context) {
                throw new Error('useTranslations must be used within I18nProvider')
        }
        return context
}
