import HeroDecor from '@/components/hero-decor'
import TerminalButton from '@/components/terminal-button'
import TypewriterText from '@/components/typewriter-text'
import { useTranslations } from '@/i18n/react'

export default function ClientIntro() {
	const t = useTranslations('Home.clientIntro')

	return (
		<div className="relative mb-24 flex min-h-[70vh] items-center justify-center py-16 text-center">
			<HeroDecor />
			<div className="relative z-10 mx-auto max-w-3xl xl:max-w-2xl">
				<p className="font-script mb-4 -rotate-1 text-2xl text-terminal-cyan">
					{t('greeting')}
				</p>
				<TypewriterText
					text={t('typewriter')}
					className="font-mono text-2xl font-bold leading-tight tracking-tight hyphens-auto sm:text-4xl lg:text-5xl"
					delay={25}
					preventLayoutJumps={true}
				/>
				<div className="mt-10 flex flex-wrap items-center justify-center gap-4">
					<TerminalButton href="/#membership" primary>
						{t('primaryCta')}
					</TerminalButton>
					<TerminalButton href="/projects">{t('secondaryCta')}</TerminalButton>
				</div>
			</div>
		</div>
	)
}
