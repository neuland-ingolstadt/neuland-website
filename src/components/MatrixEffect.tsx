import type React from 'react'
import { useEffect, useRef } from 'react'

const MatrixEffect: React.FC = () => {
	const containerRef = useRef<HTMLDivElement>(null)
	const canvasRef = useRef<HTMLCanvasElement | null>(null)
	const animationFrameRef = useRef<number | null>(null)
	const resizeTimeoutRef = useRef<NodeJS.Timeout | null>(null)

	const matrixColumnsRef = useRef<
		{
			x: number
			y: number
			speed: number
			height: number
			chars: string[]
			brightIndices: number[]
			lightIndices: number[]
			isStatic: boolean
		}[]
	>([])

	const characters =
		'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789$%&^*()_+-=[]{}|;:,.<>?'

	const getRandomChar = () =>
		characters.charAt(Math.floor(Math.random() * characters.length))

	const setupMatrixColumns = (
		_ctx: CanvasRenderingContext2D,
		width: number,
		height: number
	) => {
		matrixColumnsRef.current = []
		const columnSpacing = 40
		const columnCount = Math.floor(width / columnSpacing)

		for (let i = 0; i < columnCount; i++) {
			const columnHeight = 15 + Math.floor(Math.random() * 30)
			const chars = Array(columnHeight)
				.fill('')
				.map(() => getRandomChar())

			const brightIndices: number[] = []
			const lightIndices: number[] = []

			chars.forEach((_, idx) => {
				const randomValue = Math.random()
				if (randomValue < 0.12) {
					brightIndices.push(idx)
				} else if (randomValue < 0.3) {
					lightIndices.push(idx)
				}
			})

			const speed = Math.random() * 0.3 + 0.1

			matrixColumnsRef.current.push({
				x: i * columnSpacing,
				y: -Math.random() * height * 0.5,
				speed,
				height: columnHeight,
				chars,
				brightIndices,
				lightIndices,
				isStatic: Math.random() < 0.49
			})
		}
	}

	const renderMatrix = (
		ctx: CanvasRenderingContext2D,
		width: number,
		height: number
	) => {
		ctx.fillStyle = 'rgba(0, 0, 0, 0.05)'
		ctx.fillRect(0, 0, width, height)

		ctx.textAlign = 'left'
		ctx.textBaseline = 'top'
		ctx.imageSmoothingEnabled = false

		const fontHeight = 22

		matrixColumnsRef.current.forEach((column) => {
			if (column.isStatic) return

			column.y += column.speed

			column.chars.forEach((char, charIndex) => {
				const y = column.y + charIndex * fontHeight

				if (y > -fontHeight && y < height + fontHeight) {
					if (column.brightIndices.includes(charIndex)) {
						ctx.fillStyle = 'rgba(0, 150, 0, 0.04)'
						ctx.font = '1.2rem "Source Code Pro", monospace'
					} else if (column.lightIndices.includes(charIndex)) {
						ctx.fillStyle = 'rgba(0, 150, 0, 0.025)'
						ctx.font = '1.2rem "Source Code Pro", monospace'
					} else {
						ctx.fillStyle = 'rgba(0, 150, 0, 0.015)'
						ctx.font = '1.2rem "Source Code Pro", monospace'
					}

					const x = Math.round(column.x)
					const roundedY = Math.round(y)
					ctx.fillText(char, x, roundedY)
				}
			})

			if (column.y > height + column.height * fontHeight) {
				column.y = -column.height * fontHeight
				column.chars = Array(column.height)
					.fill('')
					.map(() => getRandomChar())
				column.brightIndices = []
				column.lightIndices = []

				column.chars.forEach((_, idx) => {
					const randomValue = Math.random()
					if (randomValue < 0.12) {
						column.brightIndices.push(idx)
					} else if (randomValue < 0.3) {
						column.lightIndices.push(idx)
					}
				})
			}
		})

		matrixColumnsRef.current.forEach((column) => {
			if (!column.isStatic) return

			column.chars.forEach((char, charIndex) => {
				const y = column.y + charIndex * fontHeight

				if (y > -fontHeight && y < height + fontHeight) {
					if (column.brightIndices.includes(charIndex)) {
						ctx.fillStyle = 'rgba(0, 150, 0, 0.06)'
						ctx.font = '1.2rem "Source Code Pro", monospace'
					} else if (column.lightIndices.includes(charIndex)) {
						ctx.fillStyle = 'rgba(0, 150, 0, 0.04)'
						ctx.font = '1.2rem "Source Code Pro", monospace'
					} else {
						ctx.fillStyle = 'rgba(0, 150, 0, 0.03)'
						ctx.font = '1.2rem "Source Code Pro", monospace'
					}

					const x = Math.round(column.x)
					const roundedY = Math.round(y)
					ctx.fillText(char, x, roundedY)
				}
			})
		})

		animationFrameRef.current = requestAnimationFrame(() =>
			renderMatrix(ctx, width, height)
		)
	}

	const startMatrixAnimation = () => {
		if (!containerRef.current) return

		if (animationFrameRef.current) {
			cancelAnimationFrame(animationFrameRef.current)
		}

		if (!canvasRef.current) {
			canvasRef.current = document.createElement('canvas')
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

		setupMatrixColumns(ctx, window.innerWidth, window.innerHeight)

		renderMatrix(ctx, window.innerWidth, window.innerHeight)
	}

	useEffect(() => {
		startMatrixAnimation()

		const handleResize = () => {
			if (resizeTimeoutRef.current) {
				clearTimeout(resizeTimeoutRef.current)
			}

			resizeTimeoutRef.current = setTimeout(() => {
				if (canvasRef.current) {
					const pixelRatio = window.devicePixelRatio || 1
					canvasRef.current.width = window.innerWidth * pixelRatio
					canvasRef.current.height = window.innerHeight * pixelRatio
					canvasRef.current.style.width = `${window.innerWidth}px`
					canvasRef.current.style.height = `${window.innerHeight}px`

					const ctx = canvasRef.current.getContext('2d', { alpha: false })
					if (ctx) {
						ctx.scale(pixelRatio, pixelRatio)
						setupMatrixColumns(ctx, window.innerWidth, window.innerHeight)
					}
				}
			}, 300)
		}

		window.addEventListener('resize', handleResize)

		return () => {
			window.removeEventListener('resize', handleResize)
			if (resizeTimeoutRef.current) {
				clearTimeout(resizeTimeoutRef.current)
			}
			if (animationFrameRef.current) {
				cancelAnimationFrame(animationFrameRef.current)
			}
			if (canvasRef.current && containerRef.current) {
				containerRef.current.removeChild(canvasRef.current)
			}
		}
	}, [])

	return <div ref={containerRef} className="matrix-effect" />
}

export default MatrixEffect
