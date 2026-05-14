'use client'
import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import { useTranslations } from 'next-intl'
import type React from 'react'
import { useCallback, useEffect } from 'react'
import { TerminalCopyField } from '@/components/ui/terminal-copy-field'

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
	// Esc-Key handling
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

	const t = useTranslations('Home.calendarModal')

	if (!isOpen) return null

	return (
		<AnimatePresence>
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
				className="fixed z-50 flex items-center justify-center pointer-events-none p-4 inset-0"
			>
				<div
					className="pointer-events-auto w-full max-w-md relative bg-terminal-window border border-terminal-window-border overflow-hidden"
					onClick={(e) => e.stopPropagation()}
					onKeyDown={(e) => e.stopPropagation()}
					role="dialog"
					aria-modal="true"
					aria-labelledby="calendar-modal-title"
				>
					{/* Corner accent brackets - pointer-events-none added for safety */}
					<div className="absolute top-0 left-0 w-12 h-12 pointer-events-none">
						<div className="absolute top-0 left-0 w-6 h-px bg-terminal-cyan/30" />
						<div className="absolute top-0 left-0 w-px h-6 bg-terminal-cyan/30" />
					</div>
					{/* ... other corners (keep them as they were) ... */}

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
							className="ml-4 p-1 text-terminal-text/70 hover:text-terminal-text"
							aria-label="Close"
							type="button"
						>
							<X size={18} />
						</button>
					</div>

					{/* Content */}
					<div className="p-6 relative z-10">
						<p className="mb-6 leading-relaxed">{t('title')}</p>

						{/* Shared component used here */}
						<TerminalCopyField value={icalUrl} />

						<h3 className="text-lg text-terminal-cyan my-3 font-semibold">
							{t('tutorialTitle')}
						</h3>
						<ul className="list-disc list-inside space-y-2 mb-0 text-terminal-text/70">
							<li>{t('tutorialLine1')}</li>
							<li>{t('tutorialLine2')}</li>
							<li>{t('tutorialLine3')}</li>
							<li>{t('tutorialLine4')}</li>
						</ul>
					</div>
				</div>
			</motion.div>
		</AnimatePresence>
	)
}

export default CalendarModal
