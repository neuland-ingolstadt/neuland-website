import type { FC } from 'react'

interface TocButtonProps {
	onClick: () => void
}

const TocButton: FC<TocButtonProps> = ({ onClick }) => {
	return (
		<div className="fixed bottom-6 right-6 z-50">
			<div className="absolute inset-0 animate-[ping_3s_cubic-bezier(0,0,0.2,1)_infinite] rounded-full bg-terminal-cyan opacity-20" />
			<button
				onClick={onClick}
				className="relative bg-terminal-window hover:bg-terminal-bg text-terminal-cyan border-2 border-terminal-cyan rounded-full w-14 h-14 flex items-center justify-center shadow-lg hover:shadow-xl transition-all"
				title="Inhaltsverzeichnis öffnen"
				aria-label="Open table of contents"
				type="button"
			>
				<span className="text-2xl font-bold">≡</span>
			</button>
		</div>
	)
}

export default TocButton
