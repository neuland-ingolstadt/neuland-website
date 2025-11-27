import TypewriterText from '@/components/typewriter-text'
import { useTranslations } from '@/contexts/I18nContext'

export default function ClientIntro() {
        const { translate: t } = useTranslations()
        return (
                <div className={'pt-20'}>
                        <TypewriterText
                                text={t('home.intro')}
                                className="text-xl mb-12 font-mono font-semibold text-terminal-text/90"
                                delay={25}
                                preventLayoutJumps={true}
                        />
		</div>
	)
}
