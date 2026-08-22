'use client'

import { Check, Globe } from 'lucide-react'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { usePathname, useRouter } from '@/i18n/navigation'
import { useLocale } from '@/i18n/react'

export default function LanguageToggle() {
	const locale = useLocale()
	const router = useRouter()
	const pathname = usePathname()

	const handleLanguageChange = (newLocale: string) => {
		router.replace(pathname, { locale: newLocale })
	}

	return (
		<DropdownMenu modal={false}>
			<DropdownMenuTrigger asChild>
				<button
					type="button"
					className="relative inline-flex h-8 w-8 items-center justify-center border border-terminal-window-border/70 bg-terminal-bg/40 backdrop-blur-sm shadow-sm cursor-pointer select-none group overflow-hidden"
				>
					<div className="pointer-events-none absolute inset-0">
						<div className="absolute top-0 left-0 w-3 h-3">
							<div className="absolute top-0 left-0 w-2 h-px bg-terminal-cyan/40" />
							<div className="absolute top-0 left-0 w-px h-2 bg-terminal-cyan/40" />
						</div>
						<div className="absolute bottom-0 right-0 w-3 h-3">
							<div className="absolute bottom-0 right-0 w-2 h-px bg-terminal-cyan/30" />
							<div className="absolute bottom-0 right-0 w-px h-2 bg-terminal-cyan/30" />
						</div>
					</div>

					<div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-terminal-cyan/0 via-terminal-cyan/12 to-terminal-cyan/0 opacity-0 group-hover:opacity-100 transition-opacity duration-250" />

					<span className="relative z-10 flex items-center justify-center text-terminal-text/90">
						<Globe className="h-3.5 w-3.5" />
						<span className="sr-only">Toggle language</span>
					</span>
				</button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				<DropdownMenuLabel>Language</DropdownMenuLabel>
				<DropdownMenuItem
					onClick={() => handleLanguageChange('en')}
					className="cursor-pointer hover:bg-terminal-darkGreen/45 hover:text-terminal-lightGreen focus:bg-terminal-darkGreen/45 focus:text-terminal-lightGreen data-[highlighted]:bg-terminal-darkGreen/45 data-[highlighted]:text-terminal-lightGreen"
				>
					<div className="flex w-full items-center justify-between">
						<span>🇬🇧 English</span>
						{locale === 'en' && <Check className="ml-2 h-4 w-4" />}
					</div>
				</DropdownMenuItem>
				<DropdownMenuItem
					onClick={() => handleLanguageChange('de')}
					className="cursor-pointer hover:bg-terminal-darkGreen/45 hover:text-terminal-lightGreen focus:bg-terminal-darkGreen/45 focus:text-terminal-lightGreen data-[highlighted]:bg-terminal-darkGreen/45 data-[highlighted]:text-terminal-lightGreen"
				>
					<div className="flex w-full items-center justify-between">
						<span>🇩🇪 Deutsch</span>
						{locale === 'de' && <Check className="ml-2 h-4 w-4" />}
					</div>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
