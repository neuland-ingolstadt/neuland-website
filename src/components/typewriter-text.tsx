import type React from 'react'
import {
	useEffect,
	useEffectEvent,
	useLayoutEffect,
	useRef,
	useState
} from 'react'

interface TypewriterTextProps {
	text: string
	delay?: number
	className?: string
	preventLayoutJumps?: boolean
}

function shouldSkipTypingAnimation() {
	if (typeof window === 'undefined') return true
	return (
		window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
		window.matchMedia('(max-width: 767px)').matches
	)
}

const TypewriterText: React.FC<TypewriterTextProps> = ({
	text,
	delay = 50,
	className = '',
	preventLayoutJumps = false
}) => {
	// SSR / first paint keep the full sentence. We only clear when we actually
	// start a typing pass (and never on mobile / reduced-motion).
	const [displayText, setDisplayText] = useState(text)
	const [showCursor, setShowCursor] = useState(false)
	const [isAnimating, setIsAnimating] = useState(false)
	const textRef = useRef<HTMLDivElement>(null)
	const indexRef = useRef(0)
	const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
	const startedRef = useRef(false)

	const startTyping = useEffectEvent(() => {
		if (startedRef.current) return
		startedRef.current = true

		if (intervalRef.current) {
			clearInterval(intervalRef.current)
			intervalRef.current = null
		}

		if (shouldSkipTypingAnimation()) {
			setDisplayText(text)
			setShowCursor(false)
			setIsAnimating(false)
			return
		}

		indexRef.current = 0
		setDisplayText('')
		setShowCursor(true)
		setIsAnimating(true)

		intervalRef.current = setInterval(() => {
			if (indexRef.current < text.length) {
				setDisplayText(text.substring(0, indexRef.current + 1))
				indexRef.current += 1
			} else {
				if (intervalRef.current) {
					clearInterval(intervalRef.current)
					intervalRef.current = null
				}
				setIsAnimating(false)
				window.setTimeout(() => setShowCursor(false), 1000)
			}
		}, delay)
	})

	useLayoutEffect(() => {
		startedRef.current = false
		const node = textRef.current
		if (!node) return

		// Hero is usually already on screen — decide before paint so mobile
		// never flashes full → blank → retype.
		const rect = node.getBoundingClientRect()
		const inView = rect.top < window.innerHeight && rect.bottom > 0
		if (inView) {
			startTyping()
		}
	}, [text, delay])

	useEffect(() => {
		if (startedRef.current) return

		const node = textRef.current
		if (!node) return

		const observer = new IntersectionObserver(
			(entries) => {
				if (entries[0]?.isIntersecting) {
					startTyping()
					observer.disconnect()
				}
			},
			{ threshold: 0.1 }
		)

		observer.observe(node)

		const fallback = window.setTimeout(() => startTyping(), 800)

		return () => {
			observer.disconnect()
			window.clearTimeout(fallback)
			if (intervalRef.current) {
				clearInterval(intervalRef.current)
			}
		}
	}, [text, delay])

	const cursor = showCursor ? (
		<span
			aria-hidden="true"
			className="inline-block w-[0.55ch] h-[0.95em] bg-terminal-text ml-0.5 align-[-0.1em] animate-cursor"
		/>
	) : null

	if (preventLayoutJumps) {
		return (
			<div ref={textRef} className={`${className} relative`}>
				<span className="invisible" aria-hidden={isAnimating || showCursor}>
					{text}
				</span>
				<div className="absolute top-0 left-0 w-full" aria-live="polite">
					<span>{displayText}</span>
					{cursor}
				</div>
			</div>
		)
	}

	return (
		<div ref={textRef} className={className} aria-live="polite">
			<span>{displayText}</span>
			{cursor}
		</div>
	)
}

export default TypewriterText
