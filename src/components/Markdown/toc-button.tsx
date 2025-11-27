import { LucideTableOfContents } from 'lucide-react'
import type { FC } from 'react'

interface TocButtonProps {
	onClick: () => void
}

const TocButton: FC<TocButtonProps> = ({ onClick }) => {
	return (
		<div className="fixed bottom-7 right-7 z-50">
			<div className="absolute inset-0 animate-[ping_3s_cubic-bezier(0,0,0.2,1)_infinite] rounded-full bg-terminal-cyan opacity-20" />
			<button
				onClick={onClick}
				className="relative bg-terminal-window hover:bg-terminal-bg text-terminal-cyan border-2 border-terminal-cyan w-10 h-10 flex items-center justify-center shadow-lg hover:shadow-xl transition-all"
				title="Inhaltsverzeichnis öffnen"
				aria-label="Open table of contents"
				type="button"
			>
				<LucideTableOfContents className="w-5 h-5" />
			</button>
		</div>
	)
}

export default TocButton
