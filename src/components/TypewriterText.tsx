'use client'
import type React from 'react'
import { useEffect, useRef, useState } from 'react'

interface TypewriterTextProps {
	text: string
	delay?: number
	className?: string
	preventLayoutJumps?: boolean
}

const TypewriterText: React.FC<TypewriterTextProps> = ({
	text,
	delay = 50,
	className = '',
	preventLayoutJumps = false
}) => {
	const [displayText, setDisplayText] = useState('')
	const [showCursor, setShowCursor] = useState(true)
	const [isComplete, setIsComplete] = useState(false)
	const textRef = useRef<HTMLDivElement>(null)
	const indexRef = useRef(0)
	const intervalRef = useRef<NodeJS.Timeout | null>(null)

	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				if (entries[0].isIntersecting && !isComplete) {
					startTyping()
				}
			},
			{
				threshold: 0.1
			}
		)

		if (textRef.current) {
			observer.observe(textRef.current)
		}

		return () => {
			if (textRef.current) {
				observer.unobserve(textRef.current)
			}
			// Clean up any existing interval on unmount
			if (intervalRef.current) {
				clearInterval(intervalRef.current)
			}
		}
	}, [isComplete])

	const startTyping = () => {
		// Clear any existing interval to prevent multiple typing sequences
		if (intervalRef.current) {
			clearInterval(intervalRef.current)
		}

		indexRef.current = 0
		setDisplayText('')

		intervalRef.current = setInterval(() => {
			if (indexRef.current < text.length) {
				setDisplayText(text.substring(0, indexRef.current + 1))
				indexRef.current += 1
			} else {
				if (intervalRef.current) {
					clearInterval(intervalRef.current)
					intervalRef.current = null
				}
				setIsComplete(true)
				setTimeout(() => setShowCursor(false), 1000)
			}
		}, delay)
	}

	if (preventLayoutJumps) {
		return (
			<div ref={textRef} className={`${className} relative`}>
				{/* Invisible text to reserve space */}
				<span className="invisible">{text}</span>

				{/* Visible animated text with positioned cursor */}
				<div className="absolute top-0 left-0 w-full">
					<span>{displayText}</span>
					{showCursor && (
						<span className="inline-block w-2 h-4 bg-terminal-text ml-1 animate-cursor" />
					)}
				</div>
			</div>
		)
	}

	return (
		<div ref={textRef} className={className}>
			<span>{displayText}</span>
			{showCursor && (
				<span className="inline-block w-2 h-4 bg-terminal-text ml-1 animate-cursor" />
			)}
		</div>
	)
}

export default TypewriterText
