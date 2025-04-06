'use client'
import { useEffect } from 'react'
import type { TocItem } from '../types/TocTypes'

interface TocModalProps {
	sections: TocItem[]
	isOpen: boolean
	onClose: () => void
}

const TocModal: React.FC<TocModalProps> = ({ sections, isOpen, onClose }) => {
	useEffect(() => {
		const handleEscKey = (event: KeyboardEvent) => {
			if (event.key === 'Escape' && isOpen) {
				onClose()
			}
		}

		if (isOpen) {
			document.addEventListener('keydown', handleEscKey)
		}

		return () => {
			document.removeEventListener('keydown', handleEscKey)
		}
	}, [isOpen, onClose])

	if (!isOpen) return null

	const groupedSections = sections.reduce(
		(acc: { [key: string]: TocItem[] }, section) => {
			const docKey =
				section.docIndex !== undefined ? `doc-${section.docIndex}` : 'default'
			if (!acc[docKey]) {
				acc[docKey] = []
			}
			acc[docKey].push(section)
			return acc
		},
		{}
	)

	return (
		<div
			className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
			onClick={onClose}
			onKeyDown={(e) => {
				if (e.key === 'Escape') {
					onClose()
				}
			}}
		>
			<div className="relative bg-terminal-bg border-2 border-terminal-windowBorder rounded-lg w-11/12 max-w-md max-h-[80vh] overflow-hidden">
				<div className="p-4 bg-terminal-windowBorder flex items-center justify-between">
					<h2 className="text-xl text-terminal-cyan">Inhaltsverzeichnis</h2>
					<button
						onClick={onClose}
						className="text-terminal-white hover:text-terminal-red font-mono text-lg"
						aria-label="Close table of contents"
						type="button"
					>
						✕
					</button>
				</div>
				<div className="p-4 overflow-y-auto max-h-[calc(80vh-4rem)]">
					<ul className="list-none pl-0">
						{Object.entries(groupedSections).map(([docKey, docSections]) => (
							<li key={docKey} className="mb-4">
								<ul className="list-none pl-0">
									{docSections.map((section) => (
										<li
											key={section.id}
											className="mb-2"
											style={{ paddingLeft: `${section.level - 1}rem` }}
										>
											<a
												href={`#${section.id}`}
												className="text-terminal-green hover:text-terminal-cyan hover:underline flex items-center no-underline"
												onClick={(e) => {
													e.preventDefault()
													const targetElement = document.getElementById(
														section.id
													)
													if (targetElement) {
														const y =
															targetElement.getBoundingClientRect().top +
															window.pageYOffset -
															90
														window.scrollTo({ top: y, behavior: 'smooth' })
													}
													onClose()
												}}
											>
												{section.level > 1 && (
													<span className="mr-2 text-terminal-cyan">
														{section.level === 2 ? '▪' : '•'}
													</span>
												)}
												{section.title}
											</a>
										</li>
									))}
								</ul>
							</li>
						))}
					</ul>
				</div>
			</div>
		</div>
	)
}

export default TocModal
