'use client'

import * as TooltipPrimitive from '@radix-ui/react-tooltip'
import * as React from 'react'
import { useTranslations } from '@/i18n/react'
import { cn } from '@/lib/utils'

const TooltipProvider = TooltipPrimitive.Provider

const Tooltip = TooltipPrimitive.Root

const TooltipTrigger = TooltipPrimitive.Trigger

const TooltipContent = React.forwardRef<
	React.ElementRef<typeof TooltipPrimitive.Content>,
	React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
	<TooltipPrimitive.Portal>
		<TooltipPrimitive.Content
			ref={ref}
			sideOffset={sideOffset}
			className={cn(
				'z-50 overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
				className
			)}
			{...props}
		/>
	</TooltipPrimitive.Portal>
))
TooltipContent.displayName = TooltipPrimitive.Content.displayName

interface InternalOnlyTooltipProps {
	children: React.ReactNode
}

const InternalOnlyTooltip: React.FC<InternalOnlyTooltipProps> = ({
	children
}) => {
	const t = useTranslations('Home.eventsSection')

	return (
		<TooltipProvider delayDuration={150}>
			<Tooltip>
				<TooltipTrigger asChild>{children}</TooltipTrigger>
				<TooltipContent className="border-terminal-window-border/70 bg-terminal-window text-left font-mono text-terminal-text shadow-terminal/40 max-w-xs">
					<span className="block text-xs font-semibold uppercase tracking-wide text-terminal-text/80">
						{t('onlyForMembersTitle')}
					</span>
					<span className="text-[0.8rem] text-terminal-text/80">
						{t('onlyForMembersDescription')}
					</span>
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	)
}

export {
	InternalOnlyTooltip,
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger
}
