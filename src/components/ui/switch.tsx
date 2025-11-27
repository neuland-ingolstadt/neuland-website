import * as SwitchPrimitives from '@radix-ui/react-switch'
import * as React from 'react'

import { cn } from '@/lib/utils'

const Switch = React.forwardRef<
	React.ElementRef<typeof SwitchPrimitives.Root>,
	React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>
>(({ className, ...props }, ref) => (
	<SwitchPrimitives.Root
		className={cn(
			'peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center  border transition-colors focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-terminal-cyan focus-visible:ring-offset-1 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-terminal-darkGreen/45 data-[state=unchecked]:bg-terminal-window/40 data-[state=checked]:border-terminal-mediumGreen data-[state=unchecked]:border-terminal-window-border',
			className
		)}
		{...props}
		ref={ref}
	>
		<SwitchPrimitives.Thumb
			className={cn(
				'pointer-events-none block h-3 w-4 transition-transform data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-[0.15rem] data-[state=checked]:bg-terminal-mediumGreen data-[state=unchecked]:bg-terminal-muted'
			)}
		/>
	</SwitchPrimitives.Root>
))
Switch.displayName = SwitchPrimitives.Root.displayName

export { Switch }
