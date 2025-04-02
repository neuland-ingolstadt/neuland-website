import type React from 'react'
import { useEffect, useRef } from 'react'

const AmbientBackground: React.FC = () => {
	const containerRef = useRef<HTMLDivElement>(null)
	const canvasRef = useRef<HTMLCanvasElement | null>(null)
	const resizeTimerRef = useRef<number | null>(null)

	const debounce = (fn: () => void, delay: number) => {
		if (resizeTimerRef.current !== null) {
			window.clearTimeout(resizeTimerRef.current)
		}
		resizeTimerRef.current = window.setTimeout(() => {
			fn()
			resizeTimerRef.current = null
		}, delay)
	}

	const createStaticBackground = () => {
		if (!containerRef.current) return

		if (canvasRef.current && containerRef.current.contains(canvasRef.current)) {
			containerRef.current.removeChild(canvasRef.current)
		}

		canvasRef.current = document.createElement('canvas')
		containerRef.current.appendChild(canvasRef.current)

		const canvas = canvasRef.current
		const ctx = canvas.getContext('2d')
		if (!ctx) return

		canvas.width = window.innerWidth
		canvas.height = window.innerHeight

		const gradient = ctx.createRadialGradient(
			window.innerWidth / 2,
			window.innerHeight / 2,
			0,
			window.innerWidth / 2,
			window.innerHeight / 2,
			Math.max(window.innerWidth, window.innerHeight) * 0.7
		)

		gradient.addColorStop(0, 'rgba(7, 30, 15, 0.6)')
		gradient.addColorStop(0.5, 'rgba(4, 25, 12, 0.4)')
		gradient.addColorStop(1, 'rgba(2, 15, 8, 0.2)')

		ctx.fillStyle = gradient
		ctx.fillRect(0, 0, window.innerWidth, window.innerHeight)

		for (let i = 0; i < 5; i++) {
			const x = Math.random() * window.innerWidth
			const y = Math.random() * window.innerHeight
			const size = 150 + Math.random() * 200

			const blobGradient = ctx.createRadialGradient(x, y, 0, x, y, size)

			const hue = 110 + (Math.random() * 30 - 15)
			blobGradient.addColorStop(0, `hsla(${hue}, 95%, 8%, 0.3)`)
			blobGradient.addColorStop(1, 'rgba(0, 25, 0, 0)')

			ctx.fillStyle = blobGradient
			ctx.beginPath()
			ctx.arc(x, y, size, 0, Math.PI * 2)

			ctx.fill()
		}
	}

	const cleanup = () => {
		if (canvasRef.current && containerRef.current) {
			containerRef.current.removeChild(canvasRef.current)
			canvasRef.current = null
		}
	}

	useEffect(() => {
		if (containerRef.current) {
			containerRef.current.style.position = 'fixed'
			containerRef.current.style.top = '0'
			containerRef.current.style.left = '0'
			containerRef.current.style.right = '0'
			containerRef.current.style.bottom = '0'
			containerRef.current.style.zIndex = '-1'
		}

		createStaticBackground()

		const handleResize = () => {
			debounce(createStaticBackground, 250)
		}

		window.addEventListener('resize', handleResize)

		return () => {
			window.removeEventListener('resize', handleResize)
			if (resizeTimerRef.current !== null) {
				window.clearTimeout(resizeTimerRef.current)
			}
			cleanup()
		}
	}, [])

	return <div ref={containerRef} className="ambient-background" />
}

export default AmbientBackground
