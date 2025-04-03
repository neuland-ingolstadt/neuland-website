import React from 'react'

interface StickyNoteProps {
	message: string
	importantText?: string
	visible: boolean
}

const StickyNote: React.FC<StickyNoteProps> = ({
	message,
	importantText = 'IMPORTANT',
	visible
}) => {
	if (!visible) return null

	return (
		<div
			className="group absolute 
			sm:-top-0 sm:-right-4 sm:rotate-6
			bottom-[-30px] right-0 rotate-3
			z-10 pointer-events-auto 
			w-[120px] h-[110px] 
			bg-[#ffe44a] shadow-md rounded-sm overflow-hidden"
		>
			<div className="absolute -bottom-4 -right-4 w-12 h-12 bg-white/30 shadow-inner transform rotate-45" />

			<div className="relative p-3 text-center text-black leading-tight font-semibold text-md mt-2">
				{message}
				<span className="block text-red-600 text-md font-bold opacity-0 transition-opacity duration-200 group-hover:opacity-100 mt-1">
					{importantText}
				</span>
			</div>
			<div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-10 h-3 bg-gray-100/50 rounded-b-sm" />
		</div>
	)
}

export default React.memo(StickyNote)
