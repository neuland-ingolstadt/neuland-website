'use client'

import type React from 'react'
import { type JSX, useCallback, useEffect, useRef, useState } from 'react'
import '../../styles/animations.css'
import { useAptabase } from '@aptabase/react'
import StickyNote from './sticky-note'
import TerminalWindowButtons from './terminal-window-buttons'

type ButtonColor = 'red' | 'yellow' | 'green'
type TerminalState = 'on' | 'shutting-down' | 'off' | 'starting-up'

interface TerminalWindowProps {
	title: string
	children: React.ReactNode
	showStickyNote?: boolean
	onRedButtonClick?: () => void
	className?: string
}

const bootSequence = [
	'BIOS v3.14.42 initialized',
	'Running memory test...',
	'Memory OK: 640K should be enough for anybody',
	'Detecting hardware...',
	'Loading kernel...',
	'Mounting file systems...',
	'Starting network services...',
	'Starting terminal service...',
	'Terminal ready'
]

const TerminalWindow: React.FC<TerminalWindowProps> = ({
	title,
	children,
	showStickyNote = true,
	onRedButtonClick,
	className = ''
}) => {
	const { trackEvent } = useAptabase()
	const [confetti, setConfetti] = useState<JSX.Element[]>([])
	const [animationInProgress, setAnimationInProgress] = useState(false)
	const [terminalState, setTerminalState] = useState<TerminalState>('on')
	const [bootText, setBootText] = useState<string[]>([])
	const [flickerIntensity, setFlickerIntensity] = useState(0)
	const [containerHeight, setContainerHeight] = useState<number | null>(null)
	const [restoreBackground, setRestoreBackground] = useState(false)

	const terminalRef = useRef<HTMLDivElement>(null)
	const timeoutsRef = useRef<number[]>([])

	const setManagedTimeout = useCallback(
		(callback: () => void, delay: number) => {
			const id = window.setTimeout(callback, delay)
			timeoutsRef.current.push(id)
			return id
		},
		[]
	)

	useEffect(() => {
		return () => {
			timeoutsRef.current.forEach((id) => {
				window.clearTimeout(id)
			})
		}
	}, [])

	const createConfetti = useCallback(() => {
		const elements: JSX.Element[] = []
		const colors = ['#ff3b30', '#ffcc00', '#28cd41', '#33C3F0']

		for (let i = 0; i < 30; i++) {
			const left = `${Math.random() * 100}%`
			const animationDuration = `${Math.random() * 2 + 2}s`
			const color = colors[Math.floor(Math.random() * colors.length)]
			const delay = `${Math.random() * 0.5}s`
			const size = `${Math.random() * 8 + 5}px`

			elements.push(
				<div
					key={i}
					className="confetti"
					style={{
						left,
						backgroundColor: color,
						animationDelay: delay,
						width: size,
						height: size,
						animationDuration,
						position: 'absolute',
						top: '-20px',
						zIndex: 10
					}}
				/>
			)
		}
		return elements
	}, [])

	const createStaticNoise = useCallback(() => {
		const noise = []
		for (let i = 0; i < 50; i++) {
			const top = `${Math.random() * 100}%`
			const left = `${Math.random() * 100}%`
			const width = `${Math.random() * 8 + 2}px`
			const height = `${Math.random() * 4 + 1}px`
			const opacity = Math.random() * 0.8 + 0.2
			const duration = `${Math.random() * 0.5 + 0.2}s`
			const delay = `${Math.random() * 0.3}s`

			noise.push(
				<div
					key={`static-${i}`}
					className="static-noise"
					style={{
						position: 'absolute',
						top,
						left,
						width,
						height,
						opacity,
						background: 'var(--color-terminal-windowTitle)',
						zIndex: 20,
						animation: `flicker ${duration} step-end infinite ${delay}`
					}}
				/>
			)
		}
		return noise
	}, [])

	const simulateShutdown = useCallback(() => {
		if (terminalRef.current) {
			setContainerHeight(terminalRef.current.offsetHeight)
		}

		setAnimationInProgress(true)
		setRestoreBackground(false)
		setTerminalState('shutting-down')
		setFlickerIntensity(5)

		setManagedTimeout(() => {
			setTerminalState('off')
			setBootText([])

			if (onRedButtonClick) {
				onRedButtonClick()
			}

			setManagedTimeout(() => {
				setTerminalState('starting-up')

				setManagedTimeout(() => {
					setRestoreBackground(true)
				}, 1000)

				setManagedTimeout(() => {
					bootSequence.forEach((text, index) => {
						setManagedTimeout(
							() => {
								setBootText((prev) => [...prev, text])

								if (index === bootSequence.length - 1) {
									setManagedTimeout(() => {
										setTerminalState('on')
										setContainerHeight(null)
										setAnimationInProgress(false)
									}, 1200)
								}
							},
							800 * (index + 1)
						)
					})
				}, 2000)
			}, 1500)
		}, 2500)
	}, [onRedButtonClick, setManagedTimeout])

	const handleButtonClick = useCallback(
		(color: ButtonColor) => {
			if (animationInProgress) return

			setAnimationInProgress(true)

			if (color === 'red') {
				trackEvent('EasterEgg', {
					name: 'terminalShutdown'
				})
				simulateShutdown()
			} else {
				trackEvent('EasterEgg', {
					name: 'terminalGlow'
				})
				setConfetti(createConfetti())

				setManagedTimeout(() => {
					setConfetti([])
					setAnimationInProgress(false)
				}, 3000)
			}
		},
		[
			animationInProgress,
			createConfetti,
			simulateShutdown,
			trackEvent,
			setManagedTimeout
		]
	)

	const isTransparentBg =
		terminalState === 'shutting-down' ||
		terminalState === 'off' ||
		(terminalState === 'starting-up' && !restoreBackground)

	return (
		<div
			ref={terminalRef}
			className={`terminal-window ${className} `}
			style={{
				height: containerHeight ? `${containerHeight}px` : 'auto',
				minHeight: containerHeight ? `${containerHeight}px` : 'auto',
				background: isTransparentBg ? 'transparent' : undefined,
				position: 'relative',
				border: isTransparentBg
					? 'none'
					: '1px solid var(--color-terminal-window-border)',
				overflow: 'visible'
			}}
		>
			<StickyNote
				message="Fenster nicht schließen!"
				visible={terminalState === 'on' && showStickyNote}
			/>

			{(terminalState === 'shutting-down' || terminalState === 'off') && (
				<div className="shrug-emote glowing-text">¯\_(ツ)_/¯</div>
			)}

			<div
				className={`terminal-inner ${
					terminalState === 'shutting-down' ? 'terminal-shutdown' : ''
				} ${terminalState === 'off' ? 'terminal-off' : ''} ${
					terminalState === 'starting-up' ? 'terminal-startup' : ''
				} ${restoreBackground ? 'terminal-bg-visible' : ''}`}
				style={{
					background: isTransparentBg ? 'transparent' : undefined,
					borderRadius: '0.375rem'
				}}
			>
				<div
					className="confetti-container"
					style={{
						position: 'absolute',
						inset: 0,
						overflow: 'hidden',
						pointerEvents: 'none'
					}}
				>
					{confetti}
				</div>

				{terminalState === 'shutting-down' && (
					<div
						className="terminal-flicker"
						style={{
							opacity: flickerIntensity * 0.1,
							pointerEvents: 'none',
							position: 'absolute',
							inset: 0,
							background: 'black',
							zIndex: 10
						}}
					/>
				)}

				{terminalState === 'shutting-down' && createStaticNoise()}

				<div className="bg-terminal-windowTitle text-terminal-text px-4 py-2 flex items-center overflow-hidden rounded-t-md">
					<TerminalWindowButtons
						onButtonClick={handleButtonClick}
						animationInProgress={animationInProgress}
					/>
					<div className="ml-4 flex-1 text-center text-sm opacity-90 font-semibold">
						{title}
					</div>
				</div>
				<div className="p-4">
					{terminalState === 'starting-up' ? (
						<div className="boot-sequence">
							{bootText.map((line) => (
								<div key={line} className="boot-line">
									<span className="boot-prompt">&gt;</span> {line}
								</div>
							))}
							<div className="blinking-cursor">_</div>
						</div>
					) : terminalState === 'off' ? (
						<div className="terminal-off-screen" />
					) : (
						children
					)}
				</div>
			</div>
		</div>
	)
}

export default TerminalWindow
