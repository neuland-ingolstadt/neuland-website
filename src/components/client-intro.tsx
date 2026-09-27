import TypewriterText from '@/components/typewriter-text'
import { useTranslations } from '@/i18n/react'

export default function ClientIntro() {
	const t = useTranslations('Home.clientIntro')

	return (
		<div>
			<TypewriterText
				text={t('typewriter')}
				className="text-terminal-text/80 mb-8 sm:mb-12 font-mono text-base sm:text-lg md:text-xl font-normal tracking-tight leading-relaxed"
				delay={25}
				preventLayoutJumps={true}
			/>
		</div>
	)
}
