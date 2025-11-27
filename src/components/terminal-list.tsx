import React, { useEffect, useRef, useState } from 'react'

interface TerminalListItemProps {
	children: React.ReactNode
	index: number
	baseDelay: number
}

const TerminalListItem: React.FC<TerminalListItemProps> = ({
	children,
	index,
	baseDelay
}) => {
	const [visible, setVisible] = useState(false)
	const itemRef = useRef<HTMLLIElement>(null)

	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				if (entries[0].isIntersecting) {
					setTimeout(() => {
						setVisible(true)
					}, baseDelay * index)
				}
			},
			{ threshold: 0.1 }
		)

		if (itemRef.current) {
			observer.observe(itemRef.current)
		}

		return () => {
			if (itemRef.current) {
				observer.unobserve(itemRef.current)
			}
		}
	}, [index, baseDelay])

	return (
		<li
			ref={itemRef}
			className={`mb-4 transition-all duration-500 ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}
		>
			{children}
		</li>
	)
}

interface TerminalListProps {
	children: React.ReactNode
	baseDelay?: number
}

const TerminalList: React.FC<TerminalListProps> = ({
	children,
	baseDelay = 150
}) => {
	return (
		<ul className="terminal-list overflow-x-hidden">
			{React.Children.map(children, (child, index) => (
				<TerminalListItem index={index} baseDelay={baseDelay}>
					{child}
				</TerminalListItem>
			))}
		</ul>
	)
}

export default TerminalList
