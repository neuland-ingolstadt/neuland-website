import type React from 'react'

interface FetchErrorMessageProps {
	title: string
	error?: string
}

const FetchErrorMessage: React.FC<FetchErrorMessageProps> = ({
	title,
	error
}) => {
	return (
		<div className="p-4 text-terminal-lightGreen border border-terminal-window-border rounded-lg bg-terminal-window">
			<p className="text-md mb-2">
				Oh nein! Beim Abrufen {title} ist etwas schiefgelaufen.
			</p>
			{error && <p className="text-sm text-terminal-lightGreen/60">{error}</p>}
			<p className="text-sm mt-4 text-terminal-text/70">
				Unsere Serverwartungsmannschaft macht gerade wohl Kaffeepause.
				<br />
				Bitte versuche es später noch einmal!
			</p>
		</div>
	)
}

export default FetchErrorMessage
