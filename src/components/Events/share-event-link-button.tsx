'use client'

import { Check, Link2 } from 'lucide-react'
import { useCallback, useEffect, useRef, useState } from 'react'
import TerminalButton from '@/components/terminal-button'
import { useTranslations } from '@/i18n/react'

interface ShareEventLinkButtonProps {
	url: string
}

const ShareEventLinkButton = ({ url }: ShareEventLinkButtonProps) => {
	const t = useTranslations('Events')
	const [copied, setCopied] = useState(false)
	const resetTimeoutRef = useRef<number | null>(null)

	const handleCopy = useCallback(() => {
		const copyUrl = async () => {
			try {
				await navigator.clipboard.writeText(url)
				setCopied(true)

				if (resetTimeoutRef.current !== null) {
					window.clearTimeout(resetTimeoutRef.current)
				}

				resetTimeoutRef.current = window.setTimeout(() => {
					setCopied(false)
				}, 1400)
			} catch {
				setCopied(false)
			}
		}

		void copyUrl()
	}, [url])

	useEffect(() => {
		return () => {
			if (resetTimeoutRef.current !== null) {
				window.clearTimeout(resetTimeoutRef.current)
			}
		}
	}, [])

	return (
		<TerminalButton onClick={handleCopy}>
			{copied ? <Check size={16} /> : <Link2 size={16} />}
			{copied ? t('copied') : t('copyLink')}
		</TerminalButton>
	)
}

export default ShareEventLinkButton
