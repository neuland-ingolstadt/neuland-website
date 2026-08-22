import type React from 'react'
import { useEffect, useEffectEvent, useRef, useState } from 'react'

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
	// SSR + first paint show the full text so the hero isn't blank before JS runs.
	const [displayText, setDisplayText] = useState(text)
	const [showCursor, setShowCursor] = useState(false)
	const textRef = useRef<HTMLDivElement>(null)
	const indexRef = useRef(0)
	const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

	const startTyping = useEffectEvent(() => {
		if (intervalRef.current) {
			clearInterval(intervalRef.current)
		}

		indexRef.current = 0
		setDisplayText('')
		setShowCursor(true)

		intervalRef.current = setInterval(() => {
			if (indexRef.current < text.length) {
				setDisplayText(text.substring(0, indexRef.current + 1))
				indexRef.current += 1
			} else {
				if (intervalRef.current) {
					clearInterval(intervalRef.current)
					intervalRef.current = null
				}
				window.setTimeout(() => setShowCursor(false), 1000)
			}
		}, delay)
	})

	useEffect(() => {
		const node = textRef.current
		if (!node) return

		let started = false
		const start = () => {
			if (started) return
			started = true
			startTyping()
		}

		const observer = new IntersectionObserver(
			(entries) => {
				if (entries[0]?.isIntersecting) {
					start()
					observer.disconnect()
				}
			},
			{ threshold: 0.1 }
		)

		observer.observe(node)

		// Fallback if IntersectionObserver never fires (some embedded browsers).
		const fallback = window.setTimeout(start, 800)

		return () => {
			observer.disconnect()
			window.clearTimeout(fallback)
			if (intervalRef.current) {
				clearInterval(intervalRef.current)
			}
		}
	}, [text, delay])

	const cursor = showCursor ? (
		<span className="inline-block w-2 h-4 bg-terminal-text ml-1 animate-cursor" />
	) : null

	if (preventLayoutJumps) {
		return (
			<div ref={textRef} className={`${className} relative`}>
				<span className="invisible">{text}</span>
				<div className="absolute top-0 left-0 w-full">
					<span>{displayText}</span>
					{cursor}
				</div>
			</div>
		)
	}

	return (
		<div ref={textRef} className={className}>
			<span>{displayText}</span>
			{cursor}
		</div>
	)
}

export default TypewriterText
