'use client'

import { ArrowUpRight, Menu, X } from 'lucide-react'
import type React from 'react'
import { useEffect, useRef, useState } from 'react'
import { Sidebar, SidebarProvider, useSidebar } from '@/components/ui/sidebar'
import { Link, usePathname, useRouter } from '@/i18n/navigation'
import { useTranslations } from '@/i18n/react'
import LanPartyBanner from './lan-party-banner'
import LanguageToggle from './language-toggle'
import NeulandLogo from './neuland-logo'
import ThemeToggle, { ThemeToggleMobile } from './theme-toggle'

const useNavigation = () => {
	const t = useTranslations('Navigation')

	const navLinks = [
		{ name: t('events'), href: '/events', external: false },
		{ name: t('projects'), href: '/projects', external: false },
		{ name: t('team'), href: '/open-positions', external: false },
		{ name: t('blog'), href: '/blog', external: false },
		{
			name: t('login'),
			href: 'https://connect.neuland.ing',
			external: true
		}
	]

	return navLinks
}

const mobileLinkClass =
	'flex items-center justify-between gap-3 py-2 font-semibold leading-tight tracking-tight no-underline transition-opacity duration-150 after:hidden hover:opacity-60 active:opacity-50'

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
				<span className="absolute -bottom-1 left-0 h-0.5 w-full origin-left scale-x-0 transform bg-terminal-cyan [:root[data-theme=light]_&]:bg-black transition-transform duration-300 group-hover:scale-x-100" />
			</a>
		)
	}

	return (
		<Link
			href={link.href}
			className={`${className ?? ''} relative group no-underline`}
		>
			{link.name}
			<span className="absolute -bottom-1 left-0 h-0.5 w-full origin-left scale-x-0 transform bg-terminal-cyan [:root[data-theme=light]_&]:bg-black transition-transform duration-300 group-hover:scale-x-100" />
		</Link>
	)
}

const MobileSidebar: React.FC = () => {
	const pathname = usePathname()
	const { isMobile, setOpenMobile } = useSidebar()

	const router = useRouter()

	const handleNavigation = () => {
		if (isMobile) {
			setOpenMobile(false)
		}
	}

	// Start the route change only after the exit animation has finished, so
	// rendering the next page doesn't compete with it for the main thread
	const handleInternalNavigation = (
		event: React.MouseEvent<HTMLAnchorElement>,
		href: string
	) => {
		if (
			event.button !== 0 ||
			event.metaKey ||
			event.ctrlKey ||
			event.shiftKey ||
			event.altKey
		) {
			return
		}
		event.preventDefault()
		const sheet = document.querySelector('[data-slot="sheet-content"]')
		handleNavigation()
		if (
			!sheet ||
			window.matchMedia('(prefers-reduced-motion: reduce)').matches
		) {
			router.push(href)
			return
		}
		let navigated = false
		const go = () => {
			if (navigated) return
			navigated = true
			router.push(href)
		}
		sheet.addEventListener('animationend', go, { once: true })
		window.setTimeout(go, 400)
	}

	const t = useTranslations('Navigation')
	const navLinks = useNavigation()
	const pageLinks = [
		{ name: t('home'), href: '/', external: false },
		...navLinks.filter((link) => !link.external)
	]
	const loginLink = navLinks.find((link) => link.external)

	return (
		<Sidebar variant="sidebar" side="bottom">
			<div className="flex h-full w-full flex-col font-mono">
				{/* Same bar as the navbar, so logo and button don't move */}
				<div className="mx-auto flex w-full max-w-[1400px] items-center justify-between gap-6 px-4 py-4">
					<Link
						href="/"
						onClick={(event) => handleInternalNavigation(event, '/')}
						className="flex items-center no-underline"
					>
						<NeulandLogo className="h-9 w-auto text-terminal-text sm:h-10" />
					</Link>
					<button
						type="button"
						onClick={() => setOpenMobile(false)}
						aria-label="Close navigation"
						className="header-icon-btn relative inline-flex h-10 w-10 cursor-pointer select-none items-center justify-center border border-terminal-window-border bg-terminal-bg text-terminal-text"
					>
						<X className="h-4 w-4 text-terminal-text/85" />
					</button>
				</div>

				<div className="sheet-body flex flex-1 flex-col">
					<nav className="flex flex-1 flex-col justify-start gap-1 px-6 pt-8">
						{pageLinks.map((item) => {
							const isActive = pathname === item.href
							return (
								<Link
									key={item.name}
									href={item.href}
									onClick={(event) =>
										handleInternalNavigation(event, item.href)
									}
									aria-current={isActive ? 'page' : undefined}
									className={`${mobileLinkClass} text-4xl ${
										isActive ? 'text-terminal-ink' : 'text-terminal-text'
									}`}
								>
									{item.name}
								</Link>
							)
						})}
						{loginLink && (
							<>
								<div
									aria-hidden="true"
									className="my-3 border-t border-terminal-window-border"
								/>
								<a
									href={loginLink.href}
									target="_blank"
									rel="noreferrer noopener"
									onClick={handleNavigation}
									className={`${mobileLinkClass} text-4xl text-terminal-text/60`}
								>
									{t('connectLogin')}
									<ArrowUpRight
										className="h-6 w-6 shrink-0"
										aria-hidden="true"
									/>
								</a>
							</>
						)}
					</nav>

					<div className="flex flex-col gap-5 px-6 pb-6">
						<div className="flex items-center justify-between gap-4 text-xs text-terminal-text/80">
							<div className="flex items-center gap-2">
								<span className="font-mono text-xs font-normal uppercase tracking-wider text-terminal-text/60">
									Theme
								</span>
								<ThemeToggleMobile />
							</div>
							<div className="flex items-center gap-2">
								<span className="font-mono text-xs font-normal uppercase tracking-wider text-terminal-text/60">
									Language
								</span>
								<LanguageToggle />
							</div>
						</div>
					</div>
				</div>
			</div>
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
			className="header-icon-btn relative inline-flex h-10 w-10 items-center md:h-8 md:w-8 justify-center border border-terminal-window-border bg-terminal-bg cursor-pointer select-none group overflow-hidden text-terminal-text"
		>
			<div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-terminal-cyan/0 via-terminal-cyan/12 to-terminal-cyan/0 opacity-0 transition-opacity duration-250 group-hover:opacity-100" />
			<span className="relative z-10 text-terminal-text/85">
				<Menu className="h-4 w-4" />
			</span>
		</button>
	)
}

interface TerminalHeaderProps {
	isPrideThemeEnabled?: boolean
}

const TerminalHeader: React.FC<TerminalHeaderProps> = ({
	isPrideThemeEnabled = false
}) => {
	const headerRef = useRef<HTMLElement>(null)
	const [isScrolled, setIsScrolled] = useState(false)

	useEffect(() => {
		const onScroll = () => setIsScrolled(window.scrollY > 8)
		onScroll()
		window.addEventListener('scroll', onScroll, { passive: true })
		return () => window.removeEventListener('scroll', onScroll)
	}, [])

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
		// The announcement banner can be dismissed, which changes the height
		const observer = new ResizeObserver(setNavbarHeight)
		if (headerRef.current) observer.observe(headerRef.current)
		return () => {
			window.removeEventListener('resize', setNavbarHeight)
			observer.disconnect()
		}
	}, [])

	const navLinks = useNavigation()

	return (
		<SidebarProvider>
			<header
				ref={headerRef}
				className={`terminal-nav fixed top-0 left-0 right-0 z-50 transition-[background-color] duration-300 ${
					isScrolled ? 'bg-terminal-bg' : 'bg-transparent'
				}`}
			>
				<LanPartyBanner />
				{isPrideThemeEnabled && (
					<div aria-hidden="true" className="flex h-0.5 w-full">
						<div className="h-full w-1/6 bg-red-500" />
						<div className="h-full w-1/6 bg-orange-500" />
						<div className="h-full w-1/6 bg-yellow-400" />
						<div className="h-full w-1/6 bg-green-500" />
						<div className="h-full w-1/6 bg-blue-500" />
						<div className="h-full w-1/6 bg-purple-500" />
					</div>
				)}
				<div className="mx-auto flex max-w-[1400px] items-center justify-between gap-6 px-4 py-4 md:grid md:grid-cols-[1fr_auto_1fr] md:px-12 xl:px-20">
					<div className="terminal-logo flex flex-col items-start">
						<Link href="/" className="flex items-center no-underline">
							<div className="logo">
								<NeulandLogo className="h-9 w-auto text-terminal-text sm:h-10" />
							</div>
						</Link>
					</div>

					{/* Desktop Navigation */}
					<nav className="hidden items-center gap-8 md:flex">
						{navLinks.map((link) => (
							<DesktopNavLink
								key={link.name}
								link={link}
								className="font-mono text-sm font-normal uppercase tracking-wide text-terminal-text transition-colors hover:text-terminal-ink"
							/>
						))}
					</nav>

					<div className="hidden items-center justify-end gap-3 md:flex">
						<ThemeToggle />
						<LanguageToggle />
					</div>

					<div className="flex items-center gap-3 md:hidden">
						<MobileSidebarTrigger />
					</div>
				</div>
			</header>

			{/* Mobile sidebar (bottom sheet style) */}
			<div className="md:hidden">
				<MobileSidebar />
			</div>
		</SidebarProvider>
	)
}

export default TerminalHeader
