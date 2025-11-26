'use client'
import type React from 'react'
import { useEffect, useRef } from 'react'

const GameOfLife: React.FC = () => {
	const containerRef = useRef<HTMLDivElement>(null)
	const canvasRef = useRef<HTMLCanvasElement | null>(null)
	const resizeTimeoutRef = useRef<NodeJS.Timeout | null>(null)

	interface Cell {
		alive: boolean
		opacity: number
		transitioning: boolean
		targetState: boolean
	}

	const gridRef = useRef<Cell[][]>([])
	const cellSizeRef = useRef<number>(18)
	const timeoutsAndFramesRef = useRef<{
		generation: NodeJS.Timeout | null
		render: number | null
		animation: number | null
	}>({ generation: null, render: null, animation: null })
	const isRunningRef = useRef<boolean>(true)

	const initializeGrid = (width: number, height: number) => {
		const cellSize = cellSizeRef.current
		const cols = Math.floor(width / cellSize)
		const rows = Math.floor(height / cellSize)
		const grid: Cell[][] = []

		for (let i = 0; i < rows; i++) {
			grid[i] = []
			for (let j = 0; j < cols; j++) {
				const alive = Math.random() < 0.15
				grid[i][j] = {
					alive,
					opacity: alive ? 1 : 0,
					transitioning: false,
					targetState: alive
				}
			}
		}

		return grid
	}

	const countNeighbors = (grid: Cell[][], row: number, col: number) => {
		const rows = grid.length
		const cols = grid[0].length
		let count = 0

		for (let i = -1; i <= 1; i++) {
			for (let j = -1; j <= 1; j++) {
				if (i === 0 && j === 0) continue
				const r = (row + i + rows) % rows
				const c = (col + j + cols) % cols
				if (grid[r][c].alive) count++
			}
		}

		return count
	}

	const nextGeneration = (grid: Cell[][]) => {
		const rows = grid.length
		const cols = grid[0].length

		for (let i = 0; i < rows; i++) {
			for (let j = 0; j < cols; j++) {
				const neighbors = countNeighbors(grid, i, j)
				const currentCell = grid[i][j]
				const nextState = currentCell.alive
					? neighbors === 2 || neighbors === 3
					: neighbors === 3

				if (nextState !== currentCell.alive) {
					currentCell.transitioning = true
					currentCell.targetState = nextState
				}
			}
		}

		return grid
	}

	const updateTransitions = (grid: Cell[][]) => {
		const fadeSpeed = 0.04
		let stillTransitioning = false

		for (let i = 0; i < grid.length; i++) {
			for (let j = 0; j < grid[i].length; j++) {
				const cell = grid[i][j]

				if (cell.transitioning) {
					if (cell.targetState) {
						cell.opacity += fadeSpeed
						if (cell.opacity >= 1) {
							cell.opacity = 1
							cell.transitioning = false
							cell.alive = true
						}
					} else {
						cell.opacity -= fadeSpeed
						if (cell.opacity <= 0) {
							cell.opacity = 0
							cell.transitioning = false
							cell.alive = false
						}
					}
					stillTransitioning = true
				}
			}
		}

		return { grid, stillTransitioning }
	}

	const renderGrid = (
		ctx: CanvasRenderingContext2D,
		width: number,
		height: number
	) => {
		// Pick palette based on current theme (light / dark)
		const root = document.documentElement
		const explicitTheme = root.getAttribute('data-theme')
		const prefersLight = window.matchMedia?.(
			'(prefers-color-scheme: light)'
		).matches

		const mode =
			explicitTheme === 'light'
				? 'light'
				: explicitTheme === 'dark'
					? 'dark'
					: prefersLight
						? 'light'
						: 'dark'

		// Softer palettes for both modes
		const bgColor = mode === 'light' ? 'rgb(247, 249, 247)' : 'rgb(4, 7, 4)'
		const cellBase = mode === 'light' ? '16, 120, 88' : '0, 120, 70'
		const shadowColor =
			mode === 'light' ? 'rgba(16, 120, 88, 0.28)' : 'rgba(0, 120, 70, 0.45)'

		ctx.fillStyle = bgColor
		ctx.fillRect(0, 0, width, height)

		const cellSize = cellSizeRef.current
		const grid = gridRef.current

		if (!grid.length) return

		ctx.shadowColor = shadowColor
		ctx.shadowBlur = 6

		for (let i = 0; i < grid.length; i++) {
			for (let j = 0; j < grid[i].length; j++) {
				const cell = grid[i][j]
				if (cell.opacity > 0) {
					const alpha =
						mode === 'light' ? cell.opacity * 0.08 : cell.opacity * 0.13
					ctx.fillStyle = `rgba(${cellBase}, ${alpha})`
					ctx.fillRect(
						j * cellSize + 2,
						i * cellSize + 2,
						cellSize - 4,
						cellSize - 4
					)
				}
			}
		}

		ctx.shadowBlur = 0
	}

	const animateAndUpdate = (
		ctx: CanvasRenderingContext2D,
		width: number,
		height: number
	) => {
		if (!isRunningRef.current) return

		const { grid } = updateTransitions(gridRef.current)
		gridRef.current = grid
		renderGrid(ctx, width, height)

		timeoutsAndFramesRef.current.render = requestAnimationFrame(() =>
			animateAndUpdate(ctx, width, height)
		)
	}

	const startGameLoop = (
		ctx: CanvasRenderingContext2D,
		width: number,
		height: number
	) => {
		const { generation, render } = timeoutsAndFramesRef.current

		if (generation) clearTimeout(generation)
		if (!render) animateAndUpdate(ctx, width, height)

		timeoutsAndFramesRef.current.generation = setTimeout(() => {
			if (isRunningRef.current) {
				gridRef.current = nextGeneration(gridRef.current)
				startGameLoop(ctx, width, height)
			}
		}, 2000)
	}

	const checkAndResetIfNeeded = (
		ctx: CanvasRenderingContext2D,
		width: number,
		height: number
	) => {
		if (!timeoutsAndFramesRef.current.animation) {
			timeoutsAndFramesRef.current.animation = requestAnimationFrame(() => {
				const grid = gridRef.current
				if (!grid.length) return

				// Count live cells
				let liveCells = 0
				let totalCells = 0
				for (let i = 0; i < grid.length; i++) {
					for (let j = 0; j < grid[i].length; j++) {
						totalCells++
						if (grid[i][j].alive) liveCells++
					}
				}

				// Reset if too few live cells
				if (liveCells / totalCells < 0.005) {
					isRunningRef.current = false

					clearTimersAndFrames()

					setTimeout(() => {
						gridRef.current = initializeGrid(width, height)
						isRunningRef.current = true
						startGameLoop(ctx, width, height)
					}, 3000)
				}

				setTimeout(() => {
					timeoutsAndFramesRef.current.animation = null
					checkAndResetIfNeeded(ctx, width, height)
				}, 7000)
			})
		}
	}

	const clearTimersAndFrames = () => {
		const { generation, render, animation } = timeoutsAndFramesRef.current

		if (generation) {
			clearTimeout(generation)
			timeoutsAndFramesRef.current.generation = null
		}

		if (render) {
			cancelAnimationFrame(render)
			timeoutsAndFramesRef.current.render = null
		}

		if (animation) {
			cancelAnimationFrame(animation)
			timeoutsAndFramesRef.current.animation = null
		}
	}

	const startGameOfLife = () => {
		if (!containerRef.current) return

		clearTimersAndFrames()

		if (!canvasRef.current) {
			canvasRef.current = document.createElement('canvas')
			containerRef.current.appendChild(canvasRef.current)
		}

		const canvas = canvasRef.current
		const ctx = canvas.getContext('2d', { alpha: false })
		if (!ctx) return

		// Set up canvas dimensions
		const pixelRatio = window.devicePixelRatio || 1
		canvas.width = window.innerWidth * pixelRatio
		canvas.height = window.innerHeight * pixelRatio
		canvas.style.width = `${window.innerWidth}px`
		canvas.style.height = `${window.innerHeight}px`
		ctx.scale(pixelRatio, pixelRatio)

		cellSizeRef.current = window.innerWidth < 768 ? 24 : 20
		gridRef.current = initializeGrid(window.innerWidth, window.innerHeight)
		isRunningRef.current = true

		startGameLoop(ctx, window.innerWidth, window.innerHeight)
	}

	useEffect(() => {
		if (containerRef.current) {
			Object.assign(containerRef.current.style, {
				position: 'fixed',
				top: '0',
				left: '0',
				right: '0',
				bottom: '0',
				zIndex: '-1'
			})
		}

		startGameOfLife()

		if (canvasRef.current) {
			const ctx = canvasRef.current.getContext('2d', { alpha: false })
			if (ctx) checkAndResetIfNeeded(ctx, window.innerWidth, window.innerHeight)
		}

		const handleResize = () => {
			if (resizeTimeoutRef.current) clearTimeout(resizeTimeoutRef.current)
			resizeTimeoutRef.current = setTimeout(() => {
				if (canvasRef.current && containerRef.current) {
					containerRef.current.removeChild(canvasRef.current)
					canvasRef.current = null
				}
				clearTimersAndFrames()
				startGameOfLife()
			}, 300)
		}

		window.addEventListener('resize', handleResize)

		return () => {
			window.removeEventListener('resize', handleResize)
			if (resizeTimeoutRef.current) clearTimeout(resizeTimeoutRef.current)
			clearTimersAndFrames()
			if (canvasRef.current && containerRef.current) {
				containerRef.current.removeChild(canvasRef.current)
				canvasRef.current = null
			}
		}
	}, [])

	return <div ref={containerRef} className="game-of-life" />
}

export default GameOfLife
