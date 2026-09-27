import React from 'react'
import { useTranslations } from '@/i18n/react'

interface StickyNoteProps {
	message: string
	importantText?: string
	visible: boolean
}

const StickyNote: React.FC<StickyNoteProps> = ({
	message,
	importantText,
	visible
}) => {
	const t = useTranslations('Home.stickyNote')

	if (!visible) return null

	const finalImportantText = importantText || t('importantDefault')

	return (
		<div className="group absolute hidden sm:block sm:top-9 sm:-right-4 sm:rotate-6 z-10 pointer-events-auto w-[120px] h-[110px] bg-terminal-paper shadow-md overflow-hidden rounded-sm">
			<div className="absolute -bottom-4 -right-4 w-12 h-12 bg-terminal-paper-text/2 shadow-inner transform rotate-45" />

			<div className="relative p-3 text-center text-terminal-paper-text leading-tight font-normal mt-1.5">
				{message}
				<span className="block text-red-600 text-md font-normal opacity-0 transition-opacity duration-200 group-hover:opacity-100 mt-1 text-sm">
					{finalImportantText}
				</span>
			</div>
			<div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-10 h-3 bg-terminal-paper-text/10" />
		</div>
	)
}

export default React.memo(StickyNote)
