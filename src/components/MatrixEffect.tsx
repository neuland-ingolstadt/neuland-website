import type React from 'react'
import { useEffect, useRef } from 'react'

const MatrixEffect: React.FC = () => {
	const containerRef = useRef<HTMLDivElement>(null)
	const resizeTimeoutRef = useRef<NodeJS.Timeout | null>(null)
	const columnTimeoutsRef = useRef<NodeJS.Timeout[]>([])

	const createMatrixColumn = (
		containerElement: HTMLDivElement,
		index: number,
		columnSpacing: number
	) => {
		const characters =
			'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789$%&^*()_+-=[]{}|;:,.<>?'

		const column = document.createElement('div')
		column.className = 'matrix-column matrix-entering'
		column.style.left = `${index * columnSpacing}px`
		column.dataset.columnIndex = index.toString()

		const isStatic = Math.random() < 0.49

		if (!isStatic) {
			column.style.animationDelay = `${Math.random() * 0.5}s`
			column.classList.add('matrix-animated')
		}

		const columnHeight = 15 + Math.floor(Math.random() * 30)
		let columnContent = ''

		for (let j = 0; j < columnHeight; j++) {
			const char = characters.charAt(
				Math.floor(Math.random() * characters.length)
			)

			const randomValue = Math.random()
			let className = ''

			if (randomValue < 0.12) {
				className = 'matrix-char-bright'
			} else if (randomValue < 0.3) {
				className = 'matrix-char-light'
			}

			columnContent += className
				? `<span class="${className}">${char}</span><br>`
				: `${char}<br>`
		}

		column.innerHTML = columnContent
		containerElement.appendChild(column)

		const randomTimeout = 10000 + Math.random() * 20000
		const timeoutId = setTimeout(() => {
			if (column.parentNode) {
				column.classList.add('matrix-exiting')

				setTimeout(() => {
					if (column.parentNode) {
						column.parentNode.removeChild(column)
						createMatrixColumn(containerElement, index, columnSpacing)
					}
				}, 1000)
			}
		}, randomTimeout)

		columnTimeoutsRef.current.push(timeoutId)
	}

	useEffect(() => {
		if (!containerRef.current) return

		const columnSpacing = 40
		const columns = Math.floor(window.innerWidth / columnSpacing)

		containerRef.current.innerHTML = ''
		columnTimeoutsRef.current.forEach((timeout) => clearTimeout(timeout))
		columnTimeoutsRef.current = []

		for (let i = 0; i < columns; i++) {
			createMatrixColumn(containerRef.current, i, columnSpacing)
		}

		const handleResize = () => {
			if (resizeTimeoutRef.current) {
				clearTimeout(resizeTimeoutRef.current)
			}

			resizeTimeoutRef.current = setTimeout(() => {
				if (containerRef.current) {
					containerRef.current.innerHTML = ''
					columnTimeoutsRef.current.forEach((timeout) => clearTimeout(timeout))
					columnTimeoutsRef.current = []

					const newColumns = Math.floor(window.innerWidth / columnSpacing)
					for (let i = 0; i < newColumns; i++) {
						createMatrixColumn(containerRef.current, i, columnSpacing)
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
			columnTimeoutsRef.current.forEach((timeout) => clearTimeout(timeout))
		}
	}, [])

	return <div ref={containerRef} className="matrix-effect" />
}

export default MatrixEffect
