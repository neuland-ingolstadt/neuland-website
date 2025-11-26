'use client'

import { Menu } from 'lucide-react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import type React from 'react'
import { useEffect, useRef } from 'react'
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

const navLinks = [
	{
		name: 'Mitglied werden',
		href: '/#membership',
		external: false
	},
	{ name: 'Projekte', href: '/projects', external: false },
	{ name: 'Blog', href: '/blog', external: false },
	{
		name: 'Login',
		href: 'https://sso.informatik.sexy',
		external: true
	}
]

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

const MobileSidebar: React.FC = () => {
	const pathname = usePathname()
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
												: pathname === item.href.replace('/#membership', '/')
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

			<SidebarFooter className="border-t border-terminal-window-border/70 bg-terminal-bg/95 px-4 py-3">
				<div className="flex items-center justify-between gap-4 text-xs text-terminal-text/60">
					<span className="uppercase tracking-[0.18em] text-[0.65rem] text-terminal-text/70">
						Theme
					</span>
					<ThemeToggleMobile />
				</div>
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
	const isJune = new Date().getMonth() === 5
	const { triggerCrossesRotation } = useBackground()

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
		navigate.replace('/')
	}

	return (
		<SidebarProvider>
			<header
				ref={headerRef}
				className="terminal-nav fixed top-0 left-0 right-0 z-50 border-b border-terminal-window-border/80 bg-terminal-bg/80 py-3 backdrop-blur-md"
			>
				<div className="container mx-auto flex items-center justify-between px-4 sm:px-6">
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
						{navLinks.map((link) => (
							<DesktopNavLink
								key={link.name}
								link={link}
								className="tracking-wider text-terminal-text transition-colors hover:text-terminal-cyan"
							/>
						))}
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
				<MobileSidebar />
			</div>
		</SidebarProvider>
	)
}

export default TerminalHeader
