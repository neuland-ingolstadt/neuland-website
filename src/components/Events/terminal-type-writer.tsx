import type React from 'react'
import { useEffect, useRef, useState } from 'react'

interface TerminalTypeWriterProps {
	text: string
	delay?: number
	onComplete?: () => void
	isActive: boolean
}

const TerminalTypeWriter: React.FC<TerminalTypeWriterProps> = ({
	text,
	delay = 30,
	onComplete,
	isActive
}) => {
	const [displayedText, setDisplayedText] = useState('')
	const [currentIndex, setCurrentIndex] = useState(0)
	const timerRef = useRef<number | null>(null)

	useEffect(() => {
		if (isActive) {
			setDisplayedText('')
			setCurrentIndex(0)
		}
	}, [isActive])

	useEffect(() => {
		if (!isActive) return

		if (currentIndex < text.length) {
			if (timerRef.current !== null) {
				clearTimeout(timerRef.current)
			}

			timerRef.current = window.setTimeout(() => {
				setDisplayedText((prev) => prev + text[currentIndex])
				setCurrentIndex((prev) => prev + 1)
			}, delay)

			return () => {
				if (timerRef.current !== null) {
					clearTimeout(timerRef.current)
					timerRef.current = null
				}
			}
		}
		if (currentIndex >= text.length && onComplete) {
			onComplete()
		}
	}, [currentIndex, delay, onComplete, text, isActive])

	useEffect(() => {
		return () => {
			if (timerRef.current !== null) {
				clearTimeout(timerRef.current)
			}
		}
	}, [])

	return (
		<>
			{displayedText}
			{isActive && currentIndex < text.length && (
				<span className="blinking-cursor">_</span>
			)}
		</>
	)
}

export default TerminalTypeWriter
