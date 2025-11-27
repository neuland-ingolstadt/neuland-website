'use client'
import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import { useCallback, useEffect } from 'react'
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
			document.body.style.overflow = 'hidden'
		}

		return () => {
			document.removeEventListener('keydown', handleEscKey)
			document.body.style.overflow = 'auto'
		}
	}, [isOpen, onClose])

	const handleBackdropClick = useCallback(() => {
		onClose()
	}, [onClose])

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
		<AnimatePresence>
			{isOpen && (
				<>
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.2 }}
						className="fixed inset-0 bg-terminal-overlay z-40"
						onClick={handleBackdropClick}
						aria-hidden="true"
					/>
					<motion.div
						initial={{ scale: 0.9, opacity: 0 }}
						animate={{ scale: 1, opacity: 1 }}
						exit={{ scale: 0.9, opacity: 0 }}
						transition={{ type: 'spring', damping: 20, stiffness: 300 }}
						className="fixed z-50 flex items-center justify-center pointer-events-none p-4"
						style={{
							top: 0,
							left: 0,
							right: 0,
							bottom: 0
						}}
					>
						<div
							className="pointer-events-auto w-11/12 max-w-md max-h-[80vh] relative bg-terminal-window border border-terminal-window-border overflow-hidden flex flex-col"
							onClick={(e) => e.stopPropagation()}
							onKeyDown={(e) => {
								if (e.key === 'Escape') {
									onClose()
								}
							}}
							role="dialog"
							aria-modal="true"
							aria-labelledby="toc-modal-title"
						>
							{/* Corner accent brackets */}
							<div className="absolute top-0 left-0 w-12 h-12">
								<div className="absolute top-0 left-0 w-6 h-px bg-terminal-cyan/30" />
								<div className="absolute top-0 left-0 w-px h-6 bg-terminal-cyan/30" />
							</div>
							<div className="absolute top-0 right-0 w-12 h-12">
								<div className="absolute top-0 right-0 w-6 h-px bg-terminal-cyan/30" />
								<div className="absolute top-0 right-0 w-px h-6 bg-terminal-cyan/30" />
							</div>
							<div className="absolute bottom-0 left-0 w-12 h-12">
								<div className="absolute bottom-0 left-0 w-6 h-px bg-terminal-cyan/30" />
								<div className="absolute bottom-0 left-0 w-px h-6 bg-terminal-cyan/30" />
							</div>
							<div className="absolute bottom-0 right-0 w-12 h-12">
								<div className="absolute bottom-0 right-0 w-6 h-px bg-terminal-cyan/30" />
								<div className="absolute bottom-0 right-0 w-px h-6 bg-terminal-cyan/30" />
							</div>

							{/* Subtle inner glow */}
							<div className="absolute inset-0 bg-gradient-to-br from-terminal-cyan/3 via-transparent to-terminal-cyan/3 pointer-events-none" />

							{/* Header */}
							<div className="relative z-10 bg-terminal-card border-b border-terminal-window-border px-4 py-3 flex items-center">
								<h2
									id="toc-modal-title"
									className="flex-1 text-lg font-semibold text-terminal-text"
								>
									Inhaltsverzeichnis
								</h2>
								<button
									onClick={onClose}
									className="ml-4 p-1 text-terminal-text/70 hover:text-terminal-text transition-colors duration-200"
									aria-label="Schließen"
									type="button"
								>
									<X size={18} />
								</button>
							</div>

							{/* Content */}
							<div className="relative z-10 p-4 overflow-y-auto max-h-[calc(80vh-4rem)]">
								<ul className="list-none pl-0">
									{Object.entries(groupedSections).map(
										([docKey, docSections]) => (
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
																className="text-terminal-text/70 hover:text-terminal-cyan transition-colors duration-200 flex items-center no-underline group"
																onClick={(e) => {
																	e.preventDefault()
																	const targetElement = document.getElementById(
																		section.id
																	)
																	if (targetElement) {
																		const y =
																			targetElement.getBoundingClientRect()
																				.top +
																			window.pageYOffset -
																			90
																		window.scrollTo({
																			top: y,
																			behavior: 'smooth'
																		})
																	}
																	onClose()
																}}
															>
																{section.level > 1 && (
																	<span className="mr-2 text-terminal-text/60 group-hover:text-terminal-cyan/60 transition-colors duration-200">
																		{section.level === 2 ? '▪' : '•'}
																	</span>
																)}
																{section.title}
															</a>
														</li>
													))}
												</ul>
											</li>
										)
									)}
								</ul>
							</div>
						</div>
					</motion.div>
				</>
			)}
		</AnimatePresence>
	)
}

export default TocModal
