'use client'

import { Laptop, MoonStar, SunMedium } from 'lucide-react'
import { useEffect, useState } from 'react'

type ThemeMode = 'system' | 'light' | 'dark'

const STORAGE_KEY = 'neuland-theme'
const order: ThemeMode[] = ['system', 'light', 'dark']

function applyTheme(mode: ThemeMode) {
	if (typeof document === 'undefined') return

	const root = document.documentElement

	if (mode === 'system') {
		root.removeAttribute('data-theme')
		return
	}

	root.setAttribute('data-theme', mode)
}

function useThemeMode() {
	const [mode, setMode] = useState<ThemeMode>('system')

	useEffect(() => {
		if (typeof window === 'undefined') return

		const stored = window.localStorage.getItem(STORAGE_KEY) as ThemeMode | null
		if (stored === 'light' || stored === 'dark') {
			if (stored !== mode) {
				setMode(stored)
			}
			applyTheme(stored)
			return
		}

		setMode('system')
		applyTheme('system')
	}, [])

	const cycleMode = () => {
		const currentIndex = order.indexOf(mode)
		const next = order[(currentIndex + 1) % order.length]
		setMode(next)

		if (typeof window !== 'undefined') {
			if (next === 'system') {
				window.localStorage.removeItem(STORAGE_KEY)
			} else {
				window.localStorage.setItem(STORAGE_KEY, next)
			}
		}

		applyTheme(next)
	}

	return { mode, cycleMode }
}

const ThemeToggle: React.FC = () => {
	const { mode, cycleMode } = useThemeMode()

	const icon =
		mode === 'light' ? (
			<SunMedium className="h-3.5 w-3.5" />
		) : mode === 'dark' ? (
			<MoonStar className="h-3.5 w-3.5" />
		) : (
			<Laptop className="h-3.5 w-3.5" />
		)

	return (
		<div className="hidden md:flex items-center">
			<button
				type="button"
				onClick={cycleMode}
				aria-label="Theme switch"
				className="relative inline-flex h-8 w-8 items-center justify-center border border-terminal-window-border/70 bg-terminal-bg/30 backdrop-blur-sm shadow-sm cursor-pointer select-none group overflow-hidden"
			>
				{/* corner accents, matching cards */}
				<div className="pointer-events-none absolute inset-0">
					<div className="absolute top-0 left-0 w-3 h-3">
						<div className="absolute top-0 left-0 w-2 h-px bg-terminal-cyan/40" />
						<div className="absolute top-0 left-0 w-px h-2 bg-terminal-cyan/40" />
					</div>
					<div className="absolute bottom-0 right-0 w-3 h-3">
						<div className="absolute bottom-0 right-0 w-2 h-px bg-terminal-cyan/30" />
						<div className="absolute bottom-0 right-0 w-px h-2 bg-terminal-cyan/30" />
					</div>
				</div>

				{/* subtle hover glow */}
				<div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-terminal-cyan/0 via-terminal-cyan/12 to-terminal-cyan/0 opacity-0 group-hover:opacity-100 transition-opacity duration-250" />

				<span
					key={mode}
					className="relative z-10 flex items-center justify-center text-[11px] font-mono text-terminal-text/70 transition-transform duration-150 ease-out group-active:translate-x-[1px]"
				>
					{icon}
				</span>
			</button>
		</div>
	)
}

const ThemeToggleMobile: React.FC = () => {
	const { mode, cycleMode } = useThemeMode()

	const icon =
		mode === 'light' ? (
			<SunMedium className="h-4 w-4" />
		) : mode === 'dark' ? (
			<MoonStar className="h-4 w-4" />
		) : (
			<Laptop className="h-4 w-4" />
		)

	return (
		<button
			type="button"
			onClick={cycleMode}
			aria-label="Theme switch"
			className="relative inline-flex h-8 w-8 items-center justify-center  border border-terminal-window-border/70 bg-terminal-bg/30 shadow-sm cursor-pointer select-none group overflow-hidden"
		>
			<div className="pointer-events-none absolute inset-0">
				<div className="absolute top-0 left-0 w-3 h-3">
					<div className="absolute top-0 left-0 w-2 h-px bg-terminal-cyan/40" />
					<div className="absolute top-0 left-0 w-px h-2 bg-terminal-cyan/40" />
				</div>
				<div className="absolute bottom-0 right-0 w-3 h-3">
					<div className="absolute bottom-0 right-0 w-2 h-px bg-terminal-cyan/30" />
					<div className="absolute bottom-0 right-0 w-px h-2 bg-terminal-cyan/30" />
				</div>
			</div>
			<div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-terminal-cyan/0 via-terminal-cyan/12 to-terminal-cyan/0 opacity-0 group-hover:opacity-100 transition-opacity duration-250" />
			<span className="relative z-10 text-terminal-text/70">{icon}</span>
		</button>
	)
}

export default ThemeToggle
export { ThemeToggleMobile }
