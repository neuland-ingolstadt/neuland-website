'use client'
import { Menu, X } from 'lucide-react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import type React from 'react'
import { useEffect, useRef, useState } from 'react'

const TerminalHeader: React.FC = () => {
	const [scrolled, setScrolled] = useState(false)
	const [isMenuOpen, setIsMenuOpen] = useState(false)
	const headerRef = useRef<HTMLElement>(null)
	const navigate = useRouter()
	const isJune = new Date().getMonth() === 5
	const pathname = usePathname()

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
	}, [isMenuOpen])

	useEffect(() => {
		const handleScroll = () => {
			const isScrolled = window.scrollY > 10
			if (isScrolled !== scrolled) {
				setScrolled(isScrolled)
			}
		}

		window.addEventListener('scroll', handleScroll, { passive: true })
		return () => {
			window.removeEventListener('scroll', handleScroll)
		}
	}, [scrolled])

	const handleHomeClick = (e: React.MouseEvent) => {
		e.preventDefault()
		navigate.replace('/')
	}

	const scrollToMembership = (e: React.MouseEvent) => {
		e.preventDefault()

		if (pathname !== '/') {
			navigate.push('/#membership')
			return
		}

		const membershipSection = document.getElementById('membership')
		if (membershipSection) {
			const headerHeight = 80
			const elementPosition =
				membershipSection.getBoundingClientRect().top + window.scrollY

			window.scrollTo({
				top: elementPosition - headerHeight,
				behavior: 'smooth'
			})
		}
	}

	const navLinks = [
		{
			name: 'Mitglied werden',
			href: '#membership',
			isPage: false,
			onClick: scrollToMembership
		},
		{ name: 'Projekte', href: '/projects', isPage: true },
		{ name: 'Blog', href: '/blog', isPage: true },
		{
			name: 'Login',
			href: 'https://notes.neuland-ingolstadt.de',
			isPage: false,
			external: true
		}
	]

	interface NavLinkProps {
		link: {
			name: string
			href: string
			isPage: boolean
			onClick?: (e: React.MouseEvent) => void
			external?: boolean
		}
		className: string
		onClick?: () => void
	}

	const NavLink = ({ link, className, onClick }: NavLinkProps) => {
		if (link.external) {
			return (
				<a
					href={link.href}
					target="_blank"
					rel="noreferrer noopener"
					className={`${className} relative group no-underline`}
					onClick={onClick}
				>
					{link.name}
					<span className="absolute -bottom-1 left-0 w-full h-0.5 bg-terminal-cyan transform origin-left transition-transform duration-300 scale-x-0 group-hover:scale-x-100" />
				</a>
			)
		}

		if (link.isPage) {
			return (
				<Link
					href={link.href}
					className={`${className} relative group`}
					onClick={onClick}
				>
					{link.name}
					<span className="absolute -bottom-1 left-0 w-full h-0.5 bg-terminal-cyan transform origin-left transition-transform duration-300 scale-x-0 group-hover:scale-x-100" />
				</Link>
			)
		}

		return (
			<button
				type="button"
				onClick={link.onClick}
				className={`${className} relative group text-left cursor-pointer`}
			>
				{link.name}
				<span className="absolute -bottom-1 left-0 w-full h-0.5 bg-terminal-cyan transform origin-left transition-transform duration-300 scale-x-0 group-hover:scale-x-100" />
			</button>
		)
	}

	return (
		<header
			ref={headerRef}
			className={`terminal-nav fixed top-0 left-0 right-0 z-50 transition-all duration-200 py-4 border-b border-terminal-window-border ${scrolled ? 'bg-terminal-bg/60 backdrop-blur-md' : 'bg-terminal-bg'}`}
		>
			<div className="container px-4 sm:px-6 mx-auto flex justify-between items-center">
				<div className="terminal-logo flex flex-col items-start">
					<Link
						href="/"
						className="flex items-center no-underline"
						onClick={handleHomeClick}
					>
						<div className="logo">
							{/** biome-ignore lint/performance/noImgElement: TODO */}
							<img
								src="/assets/logo_dark.svg"
								alt="Neuland Ingolstadt e.V."
								className="h-10"
							/>
						</div>
					</Link>
					{isJune && (
						<div className="mt-1 w-full h-0.5 rounded overflow-hidden flex">
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
				<nav className="hidden md:flex items-center gap-8">
					{navLinks.map((link) => (
						<NavLink
							key={link.name}
							link={link}
							className=" tracking-wider text-terminal-text hover:text-terminal-cyan transition-colors no-underline"
							onClick={() => {}}
						/>
					))}
				</nav>

				{/* Mobile Menu Button */}
				<div className="flex md:hidden items-center">
					<button
						onClick={() => setIsMenuOpen(!isMenuOpen)}
						className="p-2 text-terminal-text hover:text-terminal-cyan transition-colors"
						aria-label="Toggle menu"
						type="button"
					>
						{isMenuOpen ? <X size={20} /> : <Menu size={20} />}
					</button>
				</div>
			</div>

			{/* Mobile Navigation */}
			{isMenuOpen && (
				<div className="md:hidden backdrop-blur-md bg-terminal-bg/95 border-b border-terminal-window-border">
					<div className="container px-4 sm:px-6 py-4">
						<nav className="flex flex-col gap-4">
							{navLinks.map((link) => (
								<NavLink
									key={link.name}
									link={link}
									className="font-mono text-lg py-2 text-terminal-text hover:text-terminal-cyan transition-colors"
									onClick={() => setIsMenuOpen(false)}
								/>
							))}
						</nav>
					</div>
				</div>
			)}
		</header>
	)
}

export default TerminalHeader
