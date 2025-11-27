'use client'

import { Menu } from 'lucide-react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import type React from 'react'
import { useCallback, useEffect, useMemo, useRef } from 'react'
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupContent,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarProvider,
	useSidebar
} from '@/components/ui/sidebar'
import { useBackground } from '@/contexts/BackgroundContext'

import NeulandLogo from './neuland-logo'
import ThemeToggle, { ThemeToggleMobile } from './theme-toggle'

import { useI18n } from '@/i18n/provider'
import { buildLocalizedPath, stripLocaleFromPath } from '@/i18n/routing'
import { LOCALE_COOKIE } from '@/i18n/config'

const ONE_YEAR = 60 * 60 * 24 * 365

interface NavLinkProps {
	link: {
		name: string
		href: string
		external?: boolean
	}
	className?: string
	onClick?: () => void
}

const DesktopNavLink: React.FC<NavLinkProps> = ({ link, className }) => {
	if (link.external) {
		return (
			<a
				href={link.href}
				target="_blank"
				rel="noreferrer noopener"
				className={`${className ?? ''} relative group no-underline`}
			>
				{link.name}
				<span className="absolute -bottom-1 left-0 h-0.5 w-full origin-left scale-x-0 transform bg-terminal-cyan transition-transform duration-300 group-hover:scale-x-100" />
			</a>
		)
	}

	return (
		<Link
			href={link.href}
			className={`${className ?? ''} relative group no-underline`}
		>
			{link.name}
			<span className="absolute -bottom-1 left-0 h-0.5 w-full origin-left scale-x-0 transform bg-terminal-cyan transition-transform duration-300 group-hover:scale-x-100" />
		</Link>
	)
}

const LocaleToggle: React.FC<{ variant?: 'desktop' | 'mobile' }> = ({
	variant = 'desktop'
}) => {
	const { locale, dictionary } = useI18n()
	const router = useRouter()
	const pathname = usePathname()
	const persistLocalePreference = useCallback((targetLocale: 'de' | 'en') => {
		if (typeof window !== 'undefined' && 'cookieStore' in window) {
			const expires = Date.now() + ONE_YEAR * 1000
			void window.cookieStore.set({
				name: LOCALE_COOKIE,
				value: targetLocale,
				path: '/',
				expires
			})
			return
		}
		// biome-ignore lint/suspicious/noDocumentCookie: CookieStore fallback for older browsers
		document.cookie = `${LOCALE_COOKIE}=${targetLocale}; path=/; max-age=${ONE_YEAR}; SameSite=Lax`
	}, [])

	const handleLocaleChange = (targetLocale: 'de' | 'en') => {
		if (targetLocale === locale) return
		const normalizedPath = stripLocaleFromPath(pathname || '/')
		const nextPath = buildLocalizedPath(normalizedPath || '/', targetLocale)

		persistLocalePreference(targetLocale)
		router.push(nextPath)
	}

	return (
		<div
			className={`flex ${variant === 'mobile' ? 'flex-row items-center justify-between' : 'flex-col items-end'} gap-1`}
			title={dictionary.header.localeOverrideHint}
		>
			<span className="text-[0.65rem] uppercase tracking-[0.18em] text-terminal-text/70">
				{dictionary.header.localeLabel}
			</span>
			<div className="inline-flex items-center rounded border border-terminal-window-border/70 bg-terminal-bg/40 p-0.5">
				{(['de', 'en'] as const).map((entry) => (
					<button
						key={entry}
						type="button"
						onClick={() => handleLocaleChange(entry)}
						className={`px-2 py-1 text-xs font-semibold transition-colors ${
							locale === entry
								? 'bg-terminal-cyan/20 text-terminal-cyan'
								: 'text-terminal-text/70 hover:text-terminal-cyan'
						}`}
						aria-pressed={locale === entry}
					>
						{entry === 'de'
							? dictionary.header.localeOptions.de
							: dictionary.header.localeOptions.en}
					</button>
				))}
			</div>
		</div>
	)
}

const MobileSidebar: React.FC<{
	navLinks: {
		name: string
		href: string
		external?: boolean
		activePath?: string
	}[]
	isActivePath: (path: string | undefined) => boolean
}> = ({ navLinks, isActivePath }) => {
	const { dictionary } = useI18n()
	const { isMobile, setOpenMobile } = useSidebar()

	const handleNavigation = () => {
		if (isMobile) {
			setOpenMobile(false)
		}
	}

	return (
		<Sidebar variant="sidebar" side="bottom">
			<SidebarHeader>
				{/* Mobile bottom sheet handle */}
				<div className="flex justify-center py-2 md:hidden">
					<div className="h-1 w-8 rounded-full bg-muted-foreground/30" />
				</div>
			</SidebarHeader>

			<SidebarContent>
				<SidebarGroup className="px-2 pb-2">
					<SidebarGroupContent>
						<SidebarMenu>
							{navLinks.map((item) => (
								<SidebarMenuItem key={item.name}>
									<SidebarMenuButton
										asChild
										isActive={
											item.href.startsWith('http')
												? false
												: isActivePath(item.activePath ?? item.href)
										}
										size="lg"
										className="no-underline font-mono text-base text-terminal-text/80 hover:bg-terminal-window/30 hover:text-terminal-cyan data-[active=true]:bg-terminal-window/60 data-[active=true]:text-terminal-cyan data-[active=true]:font-semibold"
									>
										{item.external ? (
											<a
												href={item.href}
												target="_blank"
												rel="noreferrer noopener"
												onClick={handleNavigation}
											>
												<span>{item.name}</span>
											</a>
										) : (
											<Link href={item.href} onClick={handleNavigation}>
												<span>{item.name}</span>
											</Link>
										)}
									</SidebarMenuButton>
								</SidebarMenuItem>
							))}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>

			<SidebarFooter className="border-t border-terminal-window-border/70 bg-terminal-bg/95 px-4 py-3 space-y-3">
				<div className="flex items-center justify-between gap-4 text-xs text-terminal-text/60">
					<span className="uppercase tracking-[0.18em] text-[0.65rem] text-terminal-text/70">
						{dictionary.header.themeLabel}
					</span>
					<ThemeToggleMobile />
				</div>
				<LocaleToggle variant="mobile" />
			</SidebarFooter>
		</Sidebar>
	)
}

const MobileSidebarTrigger: React.FC = () => {
	const { toggleSidebar } = useSidebar()

	return (
		<button
			type="button"
			onClick={toggleSidebar}
			aria-label="Open navigation"
			className="relative inline-flex h-8 w-8 items-center justify-center rounded-md border border-terminal-window-border/70 bg-terminal-bg/30 backdrop-blur-sm shadow-sm cursor-pointer select-none group overflow-hidden text-terminal-text"
		>
			<div className="pointer-events-none absolute inset-0">
				<div className="absolute left-0 top-0 h-3 w-3">
					<div className="absolute left-0 top-0 h-px w-2 bg-terminal-cyan/40" />
					<div className="absolute left-0 top-0 h-2 w-px bg-terminal-cyan/40" />
				</div>
				<div className="absolute bottom-0 right-0 h-3 w-3">
					<div className="absolute bottom-0 right-0 h-px w-2 bg-terminal-cyan/30" />
					<div className="absolute bottom-0 right-0 h-2 w-px bg-terminal-cyan/30" />
				</div>
			</div>
			<div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-terminal-cyan/0 via-terminal-cyan/12 to-terminal-cyan/0 opacity-0 transition-opacity duration-250 group-hover:opacity-100" />
			<span className="relative z-10 text-terminal-text/70">
				<Menu className="h-4 w-4" />
			</span>
		</button>
	)
}

const TerminalHeader: React.FC = () => {
	const headerRef = useRef<HTMLElement>(null)
	const navigate = useRouter()
	const pathname = usePathname()
	const isJune = new Date().getMonth() === 5
	const { triggerCrossesRotation } = useBackground()
	const { dictionary, locale } = useI18n()
	const normalizedPathname = stripLocaleFromPath(pathname || '/')

	const navLinks = useMemo(
		() => [
			{
				name: dictionary.header.membership,
				href: '/#membership',
				external: false,
				activePath: '/'
			},
			{
				name: dictionary.header.projects,
				href: '/projects',
				external: false,
				activePath: '/projects'
			},
			{
				name: dictionary.header.blog,
				href: '/blog',
				external: false,
				activePath: '/blog'
			},
			{
				name: dictionary.header.login,
				href: 'https://sso.informatik.sexy',
				external: true
			}
		],
		[dictionary.header.blog, dictionary.header.login, dictionary.header.membership, dictionary.header.projects]
	)

	const localizeHref = (href: string) => {
		if (href.startsWith('http')) return href
		const [pathPart, hashPart] = href.split('#')
		const localizedPath = buildLocalizedPath(pathPart || '/', locale)
		return hashPart ? `${localizedPath}#${hashPart}` : localizedPath
	}

	const renderLinks = navLinks.map((link) => ({
		...link,
		href: link.external ? link.href : localizeHref(link.href)
	}))

	const isActivePath = (path?: string) => {
		if (!path) return false
		if (path.includes('#')) {
			const [basePath] = path.split('#')
			return normalizedPathname === basePath
		}
		return normalizedPathname === path
	}

	// Dynamically set --navbar-height on the document root for robust layout
	useEffect(() => {
		const setNavbarHeight = () => {
			if (headerRef.current) {
				const height = headerRef.current.getBoundingClientRect().height
				document.documentElement.style.setProperty(
					'--navbar-height',
					`${height}px`
				)
			}
		}
		setNavbarHeight()
		window.addEventListener('resize', setNavbarHeight)
		return () => window.removeEventListener('resize', setNavbarHeight)
	}, [])

	const handleHomeClick = (e: React.MouseEvent) => {
		e.preventDefault()
		navigate.replace(buildLocalizedPath('/', locale))
	}

	return (
		<SidebarProvider>
			<header
				ref={headerRef}
				className="terminal-nav fixed top-0 left-0 right-0 z-50 border-b border-terminal-window-border/80 bg-terminal-bg/80 py-3 backdrop-blur-md"
			>
				<div className="container mx-auto flex items-center justify-between px-4 py-1 sm:px-6">
					<div className="terminal-logo flex flex-col items-start">
						<Link
							href="/"
							className="flex items-center no-underline"
							onClick={handleHomeClick}
							onMouseEnter={triggerCrossesRotation}
						>
							<div className="logo">
								<NeulandLogo className="h-10 text-terminal-text" />
							</div>
						</Link>
						{isJune && (
							<div className="mt-1 flex h-0.5 w-full overflow-hidden rounded">
								<div className="h-full w-1/6 bg-red-500" />
								<div className="h-full w-1/6 bg-orange-500" />
								<div className="h-full w-1/6 bg-yellow-400" />
								<div className="h-full w-1/6 bg-green-500" />
								<div className="h-full w-1/6 bg-blue-500" />
								<div className="h-full w-1/6 bg-purple-500" />
							</div>
						)}
					</div>

					{/* Desktop Navigation */}
					<nav className="hidden items-center gap-6 md:flex">
						{renderLinks.map((link) => (
							<DesktopNavLink
								key={link.name}
								link={link}
								className="tracking-wider text-terminal-text transition-colors hover:text-terminal-cyan"
							/>
						))}
						<LocaleToggle />
						<ThemeToggle />
					</nav>

					{/* Mobile Menu Button (Sidebar trigger) */}
					<div className="flex items-center md:hidden">
						<MobileSidebarTrigger />
					</div>
				</div>
			</header>

			{/* Mobile sidebar (bottom sheet style) */}
			<div className="md:hidden">
				<MobileSidebar navLinks={renderLinks} isActivePath={isActivePath} />
			</div>
		</SidebarProvider>
	)
}

export default TerminalHeader
