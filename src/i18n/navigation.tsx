import {
	Link as TanStackLink,
	useNavigate,
	useParams,
	useRouterState
} from '@tanstack/react-router'
import type { AnchorHTMLAttributes, ReactNode } from 'react'
import { useMemo } from 'react'
import { defaultLocale, type Locale, resolveLocale } from './routing'

const EXTERNAL_HREF = /^(https?:\/\/|mailto:|tel:|#|\/\/)/

// Paths served outside the locale segment (server routes)
const NON_LOCALIZED_HREFS = ['/feed']

function isExternal(href: string): boolean {
	return EXTERNAL_HREF.test(href) || NON_LOCALIZED_HREFS.includes(href)
}

function joinLocale(locale: Locale, href: string): string {
	const normalized = href.startsWith('/') ? href : `/${href}`
	const base = `/${locale}${normalized === '/' ? '' : normalized}`
	return base.length > 1 && base.endsWith('/') ? base.slice(0, -1) : base
}

function useCurrentLocale(): Locale {
	const params = useParams({ strict: false }) as { locale?: string }
	return resolveLocale(params?.locale)
}

type LinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
	href: string
	children?: ReactNode
	replace?: boolean
}

export function Link({ href, children, replace, ...rest }: LinkProps) {
	if (isExternal(href)) {
		return (
			<a href={href} {...rest}>
				{children}
			</a>
		)
	}
	return (
		<InternalLink
			href={href}
			replace={replace}
			rest={rest as Record<string, unknown>}
		>
			{children}
		</InternalLink>
	)
}

function InternalLink({
	href,
	children,
	replace,
	rest
}: {
	href: string
	children?: ReactNode
	replace?: boolean
	rest: Record<string, unknown>
}) {
	const locale = useCurrentLocale()
	const to = joinLocale(locale, href)
	return (
		<TanStackLink
			to={to}
			replace={replace}
			activeOptions={{ exact: true }}
			{...(rest as object)}
		>
			{children}
		</TanStackLink>
	)
}

export function usePathname(): string {
	const pathname = useRouterState({ select: (s) => s.location.pathname })
	const locale = useCurrentLocale()
	return useMemo(() => {
		if (!pathname.startsWith('/')) return pathname
		const segments = pathname.split('/')
		if (segments[1] === locale) {
			const rest = `/${segments.slice(2).join('/')}`
			return rest === '//' ? '/' : rest.replace(/\/$/, '') || '/'
		}
		return pathname.replace(/\/$/, '') || '/'
	}, [pathname, locale])
}

export function useRouter() {
	const navigate = useNavigate()
	const locale = useCurrentLocale()
	return useMemo(
		() => ({
			push: (href: string, options?: { locale?: string }) =>
				navigate({
					to: joinLocale(resolveLocale(options?.locale ?? locale), href),
					replace: false
				}),
			replace: (href: string, options?: { locale?: string }) =>
				navigate({
					to: joinLocale(resolveLocale(options?.locale ?? locale), href),
					replace: true
				})
		}),
		[navigate, locale]
	)
}

export function getPathname(): string {
	if (typeof window === 'undefined') return defaultLocale ? '/' : '/'
	return window.location.pathname
}

export { defaultLocale }
