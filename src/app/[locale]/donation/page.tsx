'use client'

import { Check, Copy, CreditCard } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useState } from 'react'

function CopyField({ label, value }: { label: string; value: string }) {
	const [copied, setCopied] = useState(false)

	const handleCopy = () => {
		navigator.clipboard.writeText(value.replace(/\s/g, ''))
		setCopied(true)
		setTimeout(() => setCopied(false), 2000)
	}

	return (
		<div className="flex flex-col gap-2">
			<p className="text-[10px] font-mono text-terminal-text/50 uppercase tracking-widest m-0">
				/ {label}
			</p>
			<div className="flex items-center justify-between border border-terminal-text/20 px-4 py-3 hover:border-terminal-cyan/40 transition-colors duration-200">
				<code className="text-sm font-mono text-terminal-text truncate mr-2">
					{value}
				</code>
				<button
					type="button"
					onClick={handleCopy}
					className="shrink-0 text-terminal-text/40 hover:text-terminal-cyan transition-colors"
					aria-label="Copy to clipboard"
				>
					{copied ? (
						<Check size={16} className="text-terminal-cyan" />
					) : (
						<Copy size={16} />
					)}
				</button>
			</div>
		</div>
	)
}

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

			{/* Bankverbindung Card */}
			<div className="relative border border-terminal-text/20 bg-terminal-window p-8 max-w-lg mx-auto w-full">
				{/* Grüne Eck-Akzente */}
				<div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-terminal-cyan/30" />
				<div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-terminal-cyan/30" />
				<div className="absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 border-terminal-cyan/30" />
				<div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-terminal-cyan/30" />

				<div className="flex items-center gap-3 mb-8">
					<CreditCard size={20} className="text-terminal-cyan" />
					<h2 className="text-xl font-bold font-mono">{t('bankConnection')}</h2>
				</div>

				<div className="flex flex-col gap-5">
					<CopyField label={t('recipient')} value="Neuland Ingolstadt e.V." />
					<CopyField label={t('iban')} value="DE64 7215 0000 0054 2668 04" />
					<CopyField label={t('bic')} value="BYLADEM1ING" />
				</div>
			</div>
		</div>
	)
}
