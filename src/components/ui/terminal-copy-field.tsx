'use client'

import { Check, Copy } from 'lucide-react'
import { useCallback, useState } from 'react'

interface TerminalCopyFieldProps {
	value: string
	label?: string
	removeSpaces?: boolean
}

export const TerminalCopyField = ({
	value,
	label,
	removeSpaces = false
}: TerminalCopyFieldProps) => {
	const [copied, setCopied] = useState(false)

	const handleCopy = useCallback(() => {
		// Only remove spaces when removeSpaces is set
		const textToCopy = removeSpaces ? value.replace(/\s/g, '') : value

		navigator.clipboard.writeText(textToCopy).then(() => {
			setCopied(true)
			setTimeout(() => setCopied(false), 2000)
		})
	}, [value, removeSpaces])

	return (
		<div className="flex flex-col gap-2 w-full mb-4">
			{label && (
				<p className="text-[10px] font-mono text-terminal-text/50 uppercase tracking-widest m-0">
					/ {label}
				</p>
			)}
			<div className="flex items-center justify-between border border-terminal-text/20 bg-terminal-window px-4 py-3 hover:border-terminal-cyan/40 transition-colors duration-200 group relative z-10">
				<code className="text-sm font-mono text-terminal-text truncate pr-2">
					{value}
				</code>
				<button
					type="button"
					onClick={handleCopy}
					className="shrink-0 p-1 ml-2 text-terminal-text/40 hover:text-terminal-cyan transition-colors duration-200 flex items-center justify-center"
					aria-label="Copy to clipboard"
				>
					{/* Fixed sizes added here to prevent image explosion */}
					{copied ? (
						<Check className="w-4 h-4 text-terminal-cyan" />
					) : (
						<Copy className="w-4 h-4" />
					)}
				</button>
			</div>
		</div>
	)
}
