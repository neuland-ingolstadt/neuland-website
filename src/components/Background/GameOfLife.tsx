import type React from 'react'
import { useEffect, useRef } from 'react'

const GameOfLife: React.FC = () => {
	const containerRef = useRef<HTMLDivElement>(null)
	const canvasRef = useRef<HTMLCanvasElement | null>(null)
	const animationFrameRef = useRef<number | null>(null)
	const resizeTimeoutRef = useRef<NodeJS.Timeout | null>(null)

	const gridRef = useRef<boolean[][]>([])
	const cellSizeRef = useRef<number>(18) // Increased from 16 to 20
	const generationTimeoutRef = useRef<NodeJS.Timeout | null>(null)
	const isRunningRef = useRef<boolean>(true)

	const initializeGrid = (width: number, height: number) => {
		const cellSize = cellSizeRef.current
		const cols = Math.floor(width / cellSize)
		const rows = Math.floor(height / cellSize)

		const grid: boolean[][] = []

		for (let i = 0; i < rows; i++) {
			grid[i] = []
			for (let j = 0; j < cols; j++) {
				grid[i][j] = Math.random() < 0.15
			}
		}

		return grid
	}

	const countNeighbors = (grid: boolean[][], row: number, col: number) => {
		const rows = grid.length
		const cols = grid[0].length
		let count = 0

		for (let i = -1; i <= 1; i++) {
			for (let j = -1; j <= 1; j++) {
				if (i === 0 && j === 0) continue

				const r = (row + i + rows) % rows
				const c = (col + j + cols) % cols

				if (grid[r][c]) count++
			}
		}

		return count
	}

	const nextGeneration = (grid: boolean[][]) => {
		const rows = grid.length
		const cols = grid[0].length
		const nextGrid: boolean[][] = Array(rows)
			.fill(false)
			.map(() => Array(cols).fill(false))

		for (let i = 0; i < rows; i++) {
			for (let j = 0; j < cols; j++) {
				const neighbors = countNeighbors(grid, i, j)

				if (grid[i][j]) {
					nextGrid[i][j] = neighbors === 2 || neighbors === 3
				} else {
					nextGrid[i][j] = neighbors === 3
				}
			}
		}

		return nextGrid
	}

	const renderGrid = (
		ctx: CanvasRenderingContext2D,
		width: number,
		height: number
	) => {
		ctx.fillStyle = 'rgb(0, 0, 0)'
		ctx.fillRect(0, 0, width, height)

		const cellSize = cellSizeRef.current
		const grid = gridRef.current

		if (!grid.length) return

		ctx.fillStyle = 'rgba(0, 99, 0, 1)'
		ctx.shadowColor = 'rgba(0, 124, 0, 0.7)'
		ctx.shadowBlur = 6

		for (let i = 0; i < grid.length; i++) {
			for (let j = 0; j < grid[i].length; j++) {
				if (grid[i][j]) {
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

	const startGameLoop = (
		ctx: CanvasRenderingContext2D,
		width: number,
		height: number
	) => {
		if (generationTimeoutRef.current) {
			clearTimeout(generationTimeoutRef.current)
		}

		renderGrid(ctx, width, height)

		generationTimeoutRef.current = setTimeout(() => {
			if (isRunningRef.current) {
				gridRef.current = nextGeneration(gridRef.current)
				startGameLoop(ctx, width, height)
			}
		}, 2000)
	}

	const _resetGame = () => {
		if (!canvasRef.current) return

		const ctx = canvasRef.current.getContext('2d', { alpha: false })
		if (!ctx) return

		isRunningRef.current = false

		if (generationTimeoutRef.current) {
			clearTimeout(generationTimeoutRef.current)
		}

		// Fade out effect before reset
		let opacity = 0.2
		const fadeOut = () => {
			if (opacity > 0.05) {
				opacity -= 0.05
				if (canvasRef.current) {
					canvasRef.current.style.filter = `opacity(${opacity})`
				}
				requestAnimationFrame(fadeOut)
			} else {
				// Initialize new grid and restart
				gridRef.current = initializeGrid(window.innerWidth, window.innerHeight)

				// Fade back in
				let fadeInOpacity = 0.05
				const fadeIn = () => {
					if (fadeInOpacity < 0.2) {
						fadeInOpacity += 0.05
						if (canvasRef.current) {
							canvasRef.current.style.filter = `opacity(${fadeInOpacity})`
						}
						requestAnimationFrame(fadeIn)
					} else {
						isRunningRef.current = true
						startGameLoop(ctx, window.innerWidth, window.innerHeight)
					}
				}
				fadeIn()
			}
		}
		fadeOut()
	}

	const startGameOfLife = () => {
		if (!containerRef.current) return

		if (generationTimeoutRef.current) {
			clearTimeout(generationTimeoutRef.current)
		}

		if (!canvasRef.current) {
			canvasRef.current = document.createElement('canvas')
			canvasRef.current.style.filter = 'opacity(0.2)'
			containerRef.current.appendChild(canvasRef.current)
		}

		const canvas = canvasRef.current
		const ctx = canvas.getContext('2d', { alpha: false })
		if (!ctx) return

		const pixelRatio = window.devicePixelRatio || 1
		canvas.width = window.innerWidth * pixelRatio
		canvas.height = window.innerHeight * pixelRatio
		canvas.style.width = `${window.innerWidth}px`
		canvas.style.height = `${window.innerHeight}px`

		ctx.scale(pixelRatio, pixelRatio)

		cellSizeRef.current = window.innerWidth < 768 ? 16 : 20 // Increased from 14/18 to 18/24

		gridRef.current = initializeGrid(window.innerWidth, window.innerHeight)
		isRunningRef.current = true

		startGameLoop(ctx, window.innerWidth, window.innerHeight)
	}

	const checkAndResetIfNeeded = (
		ctx: CanvasRenderingContext2D,
		width: number,
		height: number
	) => {
		if (!animationFrameRef.current) {
			animationFrameRef.current = requestAnimationFrame(() => {
				const grid = gridRef.current
				if (!grid.length) return

				let liveCells = 0
				let totalCells = 0

				for (let i = 0; i < grid.length; i++) {
					for (let j = 0; j < grid[i].length; j++) {
						totalCells++
						if (grid[i][j]) liveCells++
					}
				}

				if (liveCells / totalCells < 0.005) {
					isRunningRef.current = false
					if (generationTimeoutRef.current) {
						clearTimeout(generationTimeoutRef.current)
					}

					setTimeout(() => {
						gridRef.current = initializeGrid(width, height)
						isRunningRef.current = true
						startGameLoop(ctx, width, height)
					}, 3000)
				}

				setTimeout(() => {
					animationFrameRef.current = null
					checkAndResetIfNeeded(ctx, width, height)
				}, 7000)
			})
		}
	}

	const cleanupAnimation = () => {
		if (animationFrameRef.current) {
			cancelAnimationFrame(animationFrameRef.current)
			animationFrameRef.current = null
		}

		if (generationTimeoutRef.current) {
			clearTimeout(generationTimeoutRef.current)
			generationTimeoutRef.current = null
		}

		if (canvasRef.current && containerRef.current) {
			containerRef.current.removeChild(canvasRef.current)
			canvasRef.current = null
		}
	}

	useEffect(() => {
		// Set up proper container positioning
		if (containerRef.current) {
			containerRef.current.style.position = 'fixed'
			containerRef.current.style.top = '0'
			containerRef.current.style.left = '0'
			containerRef.current.style.right = '0'
			containerRef.current.style.bottom = '0'
			containerRef.current.style.zIndex = '-1'

			// Remove all the focus, keyboard and click handlers
		}

		startGameOfLife()

		if (canvasRef.current) {
			const ctx = canvasRef.current.getContext('2d', { alpha: false })
			if (ctx) {
				checkAndResetIfNeeded(ctx, window.innerWidth, window.innerHeight)
			}
		}

		const handleResize = () => {
			if (resizeTimeoutRef.current) {
				clearTimeout(resizeTimeoutRef.current)
			}

			resizeTimeoutRef.current = setTimeout(() => {
				cleanupAnimation()
				startGameOfLife()
			}, 300)
		}

		window.addEventListener('resize', handleResize)

		return () => {
			window.removeEventListener('resize', handleResize)

			cleanupAnimation()

			if (resizeTimeoutRef.current) {
				clearTimeout(resizeTimeoutRef.current)
			}
		}
	}, [])

	return <div ref={containerRef} className="game-of-life" />
}

export default GameOfLife
