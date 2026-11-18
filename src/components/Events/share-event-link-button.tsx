'use client'

import { Check, Link2, X } from 'lucide-react'
import { useCallback, useEffect, useRef, useState } from 'react'
import TerminalButton from '@/components/terminal-button'
import { useTranslations } from '@/i18n/react'
import { copyToClipboard } from '@/lib/clipboard'

interface ShareEventLinkButtonProps {
	url: string
}

const ShareEventLinkButton = ({ url }: ShareEventLinkButtonProps) => {
	const t = useTranslations('Events')
	const [state, setState] = useState<'idle' | 'copied' | 'failed'>('idle')
	const resetTimeoutRef = useRef<number | null>(null)

	const handleCopy = useCallback(() => {
		const copyUrl = async () => {
			setState((await copyToClipboard(url)) ? 'copied' : 'failed')

			if (resetTimeoutRef.current !== null) {
				window.clearTimeout(resetTimeoutRef.current)
			}

			resetTimeoutRef.current = window.setTimeout(() => {
				setState('idle')
			}, 1400)
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
			{state === 'copied' ? (
				<Check size={16} />
			) : state === 'failed' ? (
				<X size={16} />
			) : (
				<Link2 size={16} />
			)}
			{state === 'copied'
				? t('copied')
				: state === 'failed'
					? t('copyFailed')
					: t('copyLink')}
		</TerminalButton>
	)
}

export default ShareEventLinkButton
