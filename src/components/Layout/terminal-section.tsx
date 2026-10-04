'use client'
import type React from 'react'
import { useEffect, useRef, useState } from 'react'

interface TerminalSectionProps {
	title: string
	subtitle?: string
	children: React.ReactNode
	delay?: number
	id?: string
	classNames?: string
	headingLevel?: number // 1 = h1, 2 = h2, 3 = h3
	showPrefix?: boolean // Add this prop to control the '>' symbol
}

const TerminalSection: React.FC<TerminalSectionProps> = ({
	title,
	subtitle,
	children,
	id,
	classNames = '',
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
				return 'text-3xl md:text-4xl'
			case 2:
				return 'text-2xl md:text-3xl'
			case 3:
				return 'text-xl'
			default:
				return 'text-lg'
		}
	}

	return (
		<section
			className={`${classNames} mb-24 relative border border-terminal-window-border`}
			id={id}
			ref={sectionRef}
		>
			<h2
				className={`${getTitleClass()} font-mono font-bold tracking-tight px-6 py-5 sm:px-8 border-b border-terminal-window-border`}
			>
				{title}
			</h2>
			{subtitle && (
				<p className="text-md opacity-90 px-6 pt-4 sm:px-8">{subtitle}</p>
			)}
			<div
				className={`${isVisible ? 'opacity-100' : 'opacity-0'} transition-opacity duration-1000 p-6 sm:p-8`}
				style={{ overflow: 'visible' }}
			>
				{children}
			</div>
		</section>
	)
}

export default TerminalSection
