import type React from 'react'
import { useTranslations } from '@/i18n/react'

interface FetchErrorMessageProps {
	title: string
	error?: string
}

const FetchErrorMessage: React.FC<FetchErrorMessageProps> = ({
	title,
	error
}) => {
	const t = useTranslations('FetchError')

	return (
		<div className="p-4 text-terminal-lightGreen border border-terminal-window-border rounded-lg bg-terminal-window">
			<p className="text-md mb-2">{t('message', { title })}</p>
			{error && <p className="text-sm text-terminal-lightGreen/60">{error}</p>}
			<p className="text-sm mt-4 text-terminal-text/70">
				{t('descriptionLine1')}
				<br />
				{t('descriptionLine2')}
			</p>
		</div>
	)
}

export default FetchErrorMessage
