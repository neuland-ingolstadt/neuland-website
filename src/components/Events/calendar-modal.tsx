'use client'
import { AnimatePresence, motion } from 'framer-motion'
import { Check, Copy, X } from 'lucide-react'
import type React from 'react'
import { useCallback, useEffect, useState } from 'react'

interface CalendarModalProps {
	isOpen: boolean
	onClose: () => void
	icalUrl: string
}

const CalendarModal: React.FC<CalendarModalProps> = ({
	isOpen,
	onClose,
	icalUrl
}) => {
	const [copied, setCopied] = useState(false)

	const copyToClipboard = useCallback(() => {
		navigator.clipboard.writeText(icalUrl).then(() => {
			setCopied(true)
			setTimeout(() => setCopied(false), 2000)
		})
	}, [icalUrl])

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

	if (!isOpen) return null

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
							className="pointer-events-auto w-full max-w-md relative bg-terminal-window border border-terminal-window-border overflow-hidden"
							onClick={(e) => e.stopPropagation()}
							onKeyDown={(e) => {
								if (e.key === 'Escape') {
									onClose()
								}
							}}
							role="dialog"
							aria-modal="true"
							aria-labelledby="calendar-modal-title"
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
								<div
									id="calendar-modal-title"
									className="flex-1 text-center text-sm font-semibold text-terminal-text"
								>
									ical-subscribe.sh --import-events
								</div>
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
							<div className="p-6 relative z-10">
								<p className="mb-6 leading-relaxed">
									Du kannst alle Neuland Events in deinen Kalender als iCal
									Abonnement hinzufügen.
								</p>

								<div className="bg-terminal-card p-3 border border-terminal-window-border mb-6 font-mono text-xs relative group">
									<div className="flex items-center justify-between">
										<span className="break-all pr-2 w-[calc(100%-30px)] text-terminal-text/70">
											{icalUrl}
										</span>
										<button
											onClick={copyToClipboard}
											className="shrink-0 ml-1 text-terminal-text/70 hover:text-terminal-cyan transition-colors duration-200"
											aria-label="URL kopieren"
											title="URL kopieren"
											type="button"
										>
											{copied ? (
												<Check size={16} className="text-terminal-cyan" />
											) : (
												<Copy size={16} />
											)}
										</button>
									</div>
								</div>

								<h3 className="text-lg text-terminal-cyan mb-3 font-semibold">
									So gehts:
								</h3>
								<ul className="list-disc list-inside space-y-2 mb-0 text-terminal-text/70">
									<li>Kopiere die URL</li>
									<li>Öffne deine Kalender App</li>
									<li>Erstelle ein neues iCal Abonnement</li>
									<li>Die Events werden automatisch aktualisiert</li>
								</ul>
							</div>
						</div>
					</motion.div>
				</>
			)}
		</AnimatePresence>
	)
}

export default CalendarModal
