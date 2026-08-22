import TypewriterText from '@/components/typewriter-text'
import { useTranslations } from '@/i18n/react'

export default function ClientIntro() {
	const t = useTranslations('Home.clientIntro')

	return (
		<div className={'pt-20'}>
			<TypewriterText
				text={t('typewriter')}
				className="text-terminal-text/90 mb-12 font-mono text-xl font-semibold"
				delay={25}
				preventLayoutJumps={true}
			/>
		</div>
	)
}
