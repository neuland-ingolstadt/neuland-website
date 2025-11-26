'use client'
import type React from 'react'
import { useEffect, useMemo, useState } from 'react'
import { useBackground } from '@/contexts/BackgroundContext'

const AmbientBackground: React.FC = () => {
	const gridSize = 70
	const gridCols = 30
	const gridRows = 20

	const { crossesRotationToken } = useBackground()

	const [rotationDeg, setRotationDeg] = useState(0)

	// Seeded random function for consistent but random distribution
	const seededRandom = (seed: number) => {
		let currentSeed = seed
		return () => {
			currentSeed = (currentSeed * 9301 + 49297) % 233280
			return currentSeed / 233280
		}
	}

	const random = seededRandom(54321)

	// Single line state - one line at a time
	const [currentLine, setCurrentLine] = useState<{
		type: 'horizontal' | 'vertical'
		position: number
		key: number
	}>(() => {
		const isHorizontal = random() < 0.5
		return {
			type: isHorizontal ? 'horizontal' : 'vertical',
			position: isHorizontal
				? (Math.floor(random() * (gridRows - 4)) + 2) * gridSize
				: (Math.floor(random() * (gridCols - 4)) + 2) * gridSize,
			key: 0
		}
	})

	// Fixed timing: 3.5s movement + 8s pause = 11.5s total
	const movementDuration = 3.5 // seconds
	const fixedPause = 8 // seconds
	const totalCycleTime = movementDuration + fixedPause

	// Update to new random line after each cycle
	useEffect(() => {
		const interval = setInterval(() => {
			const isHorizontal = random() < 0.5
			setCurrentLine({
				type: isHorizontal ? 'horizontal' : 'vertical',
				position: isHorizontal
					? (Math.floor(random() * (gridRows - 4)) + 2) * gridSize
					: (Math.floor(random() * (gridCols - 4)) + 2) * gridSize,
				key: Date.now()
			})
		}, totalCycleTime * 1000)

		return () => clearInterval(interval)
	}, [])

	// Increment rotation angle by 90° on each trigger; hover-out does nothing
	useEffect(() => {
		if (!crossesRotationToken) return
		setRotationDeg((prev) => prev + 90)
	}, [crossesRotationToken])

	// Generate random grid crossing points - using seeded random for consistency
	const specialPoints = useMemo(() => {
		const random = seededRandom(12345)

		// Calculate approximate grid dimensions (assuming typical viewport)
		const gridCols = 30
		const gridRows = 20

		return Array.from({ length: 20 }, (_, i) => {
			// Random position within viewport bounds, aligned to grid
			const col = Math.floor(random() * (gridCols - 4)) + 2
			const row = Math.floor(random() * (gridRows - 4)) + 2

			return {
				x: col * gridSize,
				y: row * gridSize,
				id: i
			}
		})
	}, [])

	return (
		<div
			className="fixed inset-0 -z-10 overflow-hidden"
			style={{ backgroundColor: 'var(--ambient-background)' }}
		>
			{/* Bottom Left */}
			<div className="absolute bottom-0 left-0 w-32 h-32">
				<div className="absolute bottom-0 left-0 w-20 h-0.5 bg-terminal-cyan/40" />
				<div className="absolute bottom-0 left-0 w-0.5 h-20 bg-terminal-cyan/40" />
				<div className="absolute bottom-6 left-6 w-12 h-0.5 bg-terminal-cyan/25" />
				<div className="absolute bottom-6 left-6 w-0.5 h-12 bg-terminal-cyan/25" />
			</div>

			{/* Bottom Right */}
			<div className="absolute bottom-0 right-0 w-32 h-32">
				<div className="absolute bottom-0 right-0 w-20 h-0.5 bg-terminal-cyan/40" />
				<div className="absolute bottom-0 right-0 w-0.5 h-20 bg-terminal-cyan/40" />
				<div className="absolute bottom-6 right-6 w-12 h-0.5 bg-terminal-cyan/25" />
				<div className="absolute bottom-6 right-6 w-0.5 h-12 bg-terminal-cyan/25" />
			</div>

			{/* Subtle diagonal accent lines */}
			<div className="absolute top-1/4 left-0 w-0.5 h-96 bg-terminal-cyan/15 rotate-45 origin-top" />
			<div className="absolute top-1/4 right-0 w-0.5 h-96 bg-terminal-cyan/15 -rotate-45 origin-top" />
			<div className="absolute bottom-1/4 left-0 w-0.5 h-96 bg-terminal-cyan/15 -rotate-45 origin-bottom" />
			<div className="absolute bottom-1/4 right-0 w-0.5 h-96 bg-terminal-cyan/15 rotate-45 origin-bottom" />

			{/* Grid overlay - positioned on top */}
			<div
				className="absolute inset-0"
				style={{
					backgroundImage: `
						linear-gradient(var(--ambient-grid-line) 1px, transparent 1px),
						linear-gradient(90deg, var(--ambient-grid-line) 1px, transparent 1px)
					`,
					backgroundSize: '70px 70px'
				}}
			/>

			{/* Special grid crossing points - randomly distributed, thicker and more prominent */}
			{specialPoints.map((point) => (
				<div
					key={point.id}
					className="absolute pointer-events-none"
					style={{
						left: `${point.x}px`,
						top: `${point.y}px`,
						transform: `translate(-50%, -50%) rotate(${rotationDeg}deg)`,
						transition: 'transform 0.7s ease-out'
					}}
				>
					{/* Thicker crossing point - center dot */}
					<div className="absolute w-1.5 h-1.5 bg-terminal-text/15 -translate-x-1/2 -translate-y-1/2 rounded-full" />
					{/* Horizontal line accent */}
					<div className="absolute w-8 h-0.5 bg-terminal-text/10 -translate-x-1/2 -translate-y-1/2" />
					{/* Vertical line accent */}
					<div className="absolute w-0.5 h-8 bg-terminal-text/10 -translate-x-1/2 -translate-y-1/2" />
				</div>
			))}

			{/* Single animated line - one at a time */}
			{currentLine.type === 'horizontal' ? (
				<div
					key={currentLine.key}
					className="grid-line-horizontal"
					style={{
						top: `${currentLine.position}px`,
						animationDuration: `${movementDuration}s`,
						animationIterationCount: '1'
					}}
				/>
			) : (
				<div
					key={currentLine.key}
					className="grid-line-vertical"
					style={{
						left: `${currentLine.position}px`,
						animationDuration: `${movementDuration}s`,
						animationIterationCount: '1'
					}}
				/>
			)}
		</div>
	)
}

export default AmbientBackground
