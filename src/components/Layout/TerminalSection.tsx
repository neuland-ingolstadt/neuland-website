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
		<section
			className={`${classNames} mb-20 relative`}
			id={id}
			ref={sectionRef}
		>
			<h2
				className={`${getTitleClass()} font-bold mb-4 font-mono flex items-center`}
			>
				{title}
			</h2>
			{subtitle && (
				<p className="text-md opacity-90 -mt-2 mb-6 font-mono">{subtitle}</p>
			)}
			<div
				className={`${isVisible ? 'opacity-100' : 'opacity-0'} transition-opacity duration-1000`}
				style={{ overflow: 'visible' }} // Add explicit overflow visible here
			>
				{children}
			</div>
		</section>
	)
}

export default TerminalSection
