import type React from 'react'
import { useEffect, useRef, useState } from 'react'

interface TerminalSectionProps {
	title: string
	children: React.ReactNode
	delay?: number
	id?: string
	headingLevel?: number // 1 = h1, 2 = h2, 3 = h3
}

const TerminalSection: React.FC<TerminalSectionProps> = ({
	title,
	children,
	id,
	headingLevel = 3
}) => {
	const [isVisible, setIsVisible] = useState(false)
	const sectionRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				if (entries[0].isIntersecting) {
					setIsVisible(true)
				}
			},
			{
				threshold: 0.1
			}
		)

		if (sectionRef.current) {
			observer.observe(sectionRef.current)
		}

		return () => {
			if (sectionRef.current) {
				observer.unobserve(sectionRef.current)
			}
		}
	}, [])

	// Determine heading size based on heading level
	const getTitleClass = () => {
		switch (headingLevel) {
			case 1:
				return 'text-3xl'
			case 2:
				return 'text-2xl'
			case 3:
				return 'text-xl'
			default:
				return 'text-lg'
		}
	}

	return (
		<div ref={sectionRef} className="terminal-section mb-16" id={id}>
			<h2
				className={`terminal-prompt ${getTitleClass()} font-bold mb-4 font-mono text-terminal-cyan`}
			>
				{title}
			</h2>
			<div
				className={`${isVisible ? 'opacity-100' : 'opacity-0'} transition-opacity duration-1000`}
			>
				{children}
			</div>
		</div>
	)
}

export default TerminalSection
