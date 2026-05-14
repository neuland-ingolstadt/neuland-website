'use client'

import { CreditCard, ExternalLink } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { TerminalCopyField } from '@/components/ui/terminal-copy-field'

export default function DonationPage() {
	const t = useTranslations('Donation')

	return (
		<div className="container mx-auto px-4 py-16 max-w-4xl min-h-[70vh] flex flex-col justify-center">
			{/* Header */}
			<section className="text-center mb-16 pt-2">
				<h1 className="text-4xl md:text-5xl font-bold mb-4 font-mono">
					{t('title')}
				</h1>
				<p className="text-lg text-terminal-text/80 font-mono max-w-2xl mx-auto">
					{t('description')}
				</p>
			</section>

			{/* Bank information card */}
			<div className="relative border border-terminal-text/20 bg-terminal-window p-8 max-w-lg mx-auto w-full">
				{/* Green corner details */}
				<div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-terminal-cyan/30 pointer-events-none" />
				<div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-terminal-cyan/30 pointer-events-none" />
				<div className="absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 border-terminal-cyan/30 pointer-events-none" />
				<div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-terminal-cyan/30 pointer-events-none" />

				<div className="flex items-center gap-3 mb-8">
					<CreditCard size={20} className="text-terminal-cyan" />
					<h2 className="text-xl font-bold font-mono">{t('bankConnection')}</h2>
				</div>

				<div className="flex flex-col gap-5">
					<TerminalCopyField
						label={t('recipient')}
						value="Neuland Ingolstadt e.V."
					/>
					<TerminalCopyField
						label="IBAN"
						value="DE64 7215 0000 0054 2668 04"
						removeSpaces
					/>
					<TerminalCopyField label="BIC" value="BYLADEM1ING" removeSpaces />
				</div>
			</div>

			{/* Disclaimer & donation receipt info */}
			<section className="mt-12 max-w-lg mx-auto w-full font-mono">
				<div className="p-4 border border-terminal-text/10 bg-terminal-text/5 text-xs text-terminal-text/70 leading-relaxed">
					<p className="mb-3">
						<span className="text-terminal-cyan font-bold">NOTICE</span>
						<span className="text-terminal-cyan/50 mr-2">:</span>
						{t('disclaimer')}
					</p>

					<div className="flex flex-wrap items-center gap-2 pt-3 border-t border-terminal-text/10">
						<span className="text-terminal-text/40">{t('receiptRequest')}</span>
						<a
							href={`mailto:info@neuland-ingolstadt.de?subject=${t('receiptSubject')}`}
							className="text-terminal-cyan hover:opacity-70 transition-opacity flex items-center gap-1"
						>
							info@neuland-ingolstadt.de
							<ExternalLink size={12} />
						</a>
					</div>
				</div>
			</section>
		</div>
	)
}
