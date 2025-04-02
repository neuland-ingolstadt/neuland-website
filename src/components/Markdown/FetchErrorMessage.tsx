import type React from 'react'

interface FetchErrorMessageProps {
	message: string
}

const FetchErrorMessage: React.FC<FetchErrorMessageProps> = ({ message }) => {
	return (
		<div className="error-message text-red-400 border border-red-500 p-4 rounded mb-6">
			<h2 className="text-xl mb-2">⚠️ Fehler</h2>
			<p>{message}</p>
		</div>
	)
}

export default FetchErrorMessage
