import React from 'react'

interface StickyNoteProps {
	message: string
	importantText?: string
	visible: boolean
}

const StickyNote: React.FC<StickyNoteProps> = ({
	message,
	importantText = 'WICHTIG!!',
	visible
}) => {
	if (!visible) return null

	return (
		<div className="group absolute sm:top-9 sm:-right-4 sm:rotate-6 bottom-[-30px] right-0 rotate-3 z-10 pointer-events-auto w-[120px] h-[110px] bg-terminal-paper shadow-md overflow-hidden rounded-sm">
			<div className="absolute -bottom-4 -right-4 w-12 h-12 bg-terminal-paper-text/20 shadow-inner transform rotate-45" />

			<div className="relative p-3 text-center text-terminal-paper-text leading-tight font-semibold mt-1.5">
				{message}
				<span className="block text-red-600 text-md font-bold opacity-0 transition-opacity duration-200 group-hover:opacity-100 mt-1 text-sm">
					{importantText}
				</span>
			</div>
			<div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-10 h-3 bg-terminal-paper-text/30" />
		</div>
	)
}

export default React.memo(StickyNote)
