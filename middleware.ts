import { NextResponse, type NextRequest } from 'next/server'
import { defaultLocale, isLocale, localeCookieName, locales, type Locale } from '@/lib/i18n/config'

const PUBLIC_FILE = /\.(.*)$/

const getLocaleFromHeader = (request: NextRequest): Locale | null => {
        const header = request.headers.get('accept-language')
        if (!header) return null
        const preferred = header.split(',')[0]?.split('-')[0]?.toLowerCase()
        if (isLocale(preferred)) return preferred
        return null
}

export function middleware(request: NextRequest) {
        const { pathname, searchParams } = request.nextUrl

        if (
                pathname.startsWith('/_next') ||
                pathname.startsWith('/api') ||
                pathname.startsWith('/assets') ||
                PUBLIC_FILE.test(pathname)
        ) {
                return NextResponse.next()
        }

        const urlLocale = searchParams.get('lang')
        const cookieLocale = request.cookies.get(localeCookieName)?.value
        const pathLocale = locales.find((loc) => pathname === `/${loc}` || pathname.startsWith(`/${loc}/`))

        let locale: Locale = defaultLocale

        if (isLocale(urlLocale)) {
                locale = urlLocale
        } else if (isLocale(cookieLocale)) {
                locale = cookieLocale
        } else {
                const headerLocale = getLocaleFromHeader(request)
                if (headerLocale) locale = headerLocale
        }

        const response = pathLocale
                ? NextResponse.rewrite(new URL(pathname.replace(`/${pathLocale}`, '') || '/', request.url))
                : NextResponse.next()

        const activeLocale = pathLocale && isLocale(pathLocale) ? pathLocale : locale
        response.cookies.set(localeCookieName, activeLocale, {
                path: '/',
                httpOnly: false,
                maxAge: 60 * 60 * 24 * 365
        })

        return response
}

export const config = {
        matcher: ['/((?!_next|api|.*\\.\w+$).*)']
}
