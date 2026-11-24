'use client'

import { CalendarDays, MapPin, X } from 'lucide-react'
import type React from 'react'
import { useEffect, useState } from 'react'
import TerminalButton from '@/components/terminal-button'
import { useTranslations } from '@/i18n/react'

const STORAGE_KEY = 'lan-party-banner-dismissed'
const TICKET_URL = 'https://tickets.neuland-ingolstadt.de/neuland/lanparty9/'

const LanPartyBanner: React.FC = () => {
	const t = useTranslations('LanPartyBanner')
	// Hidden until the stored state is read, so a dismissed banner never flashes
	const [dismissed, setDismissed] = useState(true)

	useEffect(() => {
		// Always show the banner in dev, so a dismissal doesn't hide it for good
		if (import.meta.env.DEV) {
			setDismissed(false)
			return
		}
		try {
			setDismissed(window.sessionStorage.getItem(STORAGE_KEY) === '1')
		} catch {
			setDismissed(false)
		}
	}, [])

	if (dismissed) return null

	const dismiss = () => {
		setDismissed(true)
		try {
			window.sessionStorage.setItem(STORAGE_KEY, '1')
		} catch {
			// storage unavailable, banner just comes back on reload
		}
	}

	return (
		<section
			aria-label={t('title')}
			style={{
				backgroundImage: 'url(/assets/lan-party/lan-party-stars.webp)',
				backgroundSize: 'cover',
				backgroundPosition: 'center'
			}}
			className="relative overflow-hidden border-b border-white/10 bg-[#07123a] font-sans text-white"
		>
			<span aria-hidden="true" className="lan-shine" />
			<div className="mx-auto flex max-w-[1400px] items-center justify-between gap-2 px-4 py-1.5 sm:gap-3 sm:py-2 md:px-12 xl:px-20">
				<div className="flex min-w-0 items-center gap-2.5 sm:gap-4">
					<div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
						<img
							src="/assets/lan-party/hgi-logo.webp"
							alt="HGI"
							width={160}
							height={160}
							className="h-5 w-auto sm:h-7"
						/>
						<span
							aria-hidden="true"
							className="text-xs text-white/80 sm:text-sm"
						>
							×
						</span>
						<img
							src="/assets/lan-party/neuland-icon.webp"
							alt="Neuland Ingolstadt"
							width={127}
							height={160}
							className="h-5 w-auto sm:h-7"
						/>
					</div>
					<div className="flex min-w-0 flex-col whitespace-nowrap leading-tight sm:flex-row sm:items-center sm:gap-x-4">
						<p className="mb-0 truncate text-sm font-bold sm:text-base">
							{t('title')}
						</p>
						<p className="mb-0 hidden truncate text-sm text-white/80 lg:block">
							{t('description')}
						</p>
						<p className="mb-0 flex items-center gap-x-3 text-xs text-white/80 sm:text-sm">
							<span className="flex items-center gap-1.5">
								<CalendarDays
									className="h-3.5 w-3.5 sm:h-4 sm:w-4"
									aria-hidden="true"
								/>
								{t('date')}
							</span>
							<span className="hidden items-center gap-1.5 sm:flex">
								<MapPin className="h-4 w-4" aria-hidden="true" />
								{t('location')}
							</span>
						</p>
					</div>
				</div>

				<div className="flex shrink-0 items-center gap-2">
					<TerminalButton
						href={TICKET_URL}
						target="_blank"
						rel="noreferrer noopener"
						primary
						className="!px-2.5 !py-1.5 !font-sans text-xs sm:!px-3 sm:text-sm !border-white !bg-white [&>span]:!text-black hover:!bg-white hover:brightness-100 [:root[data-theme=light]_&]:!border-white [:root[data-theme=light]_&]:!bg-white [:root[data-theme=light]_&]:[&>span]:!text-black [:root[data-theme=light]_&]:hover:!border-white [:root[data-theme=light]_&]:hover:!bg-white"
					>
						{t('cta')}
					</TerminalButton>
					<button
						type="button"
						onClick={dismiss}
						aria-label={t('dismiss')}
						className="inline-flex h-8 w-8 cursor-pointer items-center justify-center text-white/70 transition-colors hover:text-white"
					>
						<X className="h-4 w-4" />
					</button>
				</div>
			</div>
		</section>
	)
}

export default LanPartyBanner
