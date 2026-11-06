import { useTranslations } from '@/i18n/react'
import ExpLogo from './exp-logo'
import ThiLogo from './thi-logo'

const SponsorsStrip = () => {
	const t = useTranslations('Home.sponsorsStrip')

	return (
		<section
			aria-label={t('title')}
			className="flex flex-col items-center gap-4"
		>
			<p className="m-0 font-mono text-xs uppercase tracking-[0.2em] text-terminal-text/70">
				{t('title')}
			</p>
			<div className="flex flex-row items-center justify-center gap-8 sm:gap-16">
				<a
					href="https://www.thi.de"
					target="_blank"
					rel="noreferrer noopener"
					aria-label="Technische Hochschule Ingolstadt"
					className="no-underline opacity-90 transition-opacity duration-300 hover:opacity-100"
				>
					<ThiLogo className="h-auto w-32 sm:w-44 text-terminal-text" />
				</a>
				<a
					href="https://explore.de"
					target="_blank"
					rel="noreferrer noopener"
					aria-label="EXP Software GmbH"
					className="no-underline opacity-90 transition-opacity duration-300 hover:opacity-100"
				>
					<ExpLogo className="h-6 sm:h-8" />
				</a>
			</div>
		</section>
	)
}

export default SponsorsStrip
