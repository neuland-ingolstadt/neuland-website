'use client'
import type React from 'react'
import { useMemo } from 'react'

const AmbientBackground: React.FC = () => {
	// Create a limited number of animated lines that cycle through
	// Each line will animate every few seconds with staggered delays
	const gridSize = 70

	// Generate random grid crossing points - using seeded random for consistency
	const specialPoints = useMemo(() => {
		// Use a simple seeded random function for consistent but random distribution
		let seed = 12345
		const seededRandom = () => {
			seed = (seed * 9301 + 49297) % 233280
			return seed / 233280
		}

		// Calculate approximate grid dimensions (assuming typical viewport)
		const gridCols = 30
		const gridRows = 20

		return Array.from({ length: 20 }, (_, i) => {
			// Random position within viewport bounds, aligned to grid
			const col = Math.floor(seededRandom() * (gridCols - 4)) + 2
			const row = Math.floor(seededRandom() * (gridRows - 4)) + 2

			return {
				x: col * gridSize,
				y: row * gridSize,
				id: i
			}
		})
	}, [])

	return (
		<div className="fixed inset-0 -z-10 overflow-hidden bg-[#010101]">
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
						linear-gradient(rgba(156, 163, 175, 0.15) 1px, transparent 1px),
						linear-gradient(90deg, rgba(156, 163, 175, 0.15) 1px, transparent 1px)
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
						transform: 'translate(-50%, -50%)'
					}}
				>
					{/* Thicker crossing point - center dot */}
					<div className="absolute w-1.5 h-1.5 bg-gray-r00/50 -translate-x-1/2 -translate-y-1/2 rounded-full" />
					{/* Horizontal line accent */}
					<div className="absolute w-8 h-0.5 bg-gray-400/25 -translate-x-1/2 -translate-y-1/2" />
					{/* Vertical line accent */}
					<div className="absolute w-0.5 h-8 bg-gray-400/25 -translate-x-1/2 -translate-y-1/2" />
				</div>
			))}

			{/* Animated horizontal grid line */}
			<div
				className="grid-line-horizontal"
				style={{
					top: `${5 * gridSize}px`,
					animationDelay: '0s',
					animationDuration: '8s'
				}}
			/>

			{/* Animated vertical grid line */}
			<div
				className="grid-line-vertical"
				style={{
					left: `${5 * gridSize}px`,
					animationDelay: '4s',
					animationDuration: '8s'
				}}
			/>
		</div>
	)
}

export default AmbientBackground
