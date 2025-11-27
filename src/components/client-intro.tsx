'use client'

import TypewriterText from '@/components/typewriter-text'
import { useI18n } from '@/i18n/provider'

export default function ClientIntro() {
	const { t } = useI18n()

	return (
		<div className="pt-20">
			<TypewriterText
				text={t('hero.tagline')}
				className="text-xl mb-12 font-mono font-semibold text-terminal-text/90"
				delay={25}
				preventLayoutJumps={true}
			/>
		</div>
	)
}
