import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

/**
 * Stable per-key tilt (-5..5 deg) so highlighter strokes on cards each sit
 * a little differently, without changing between server and client renders.
 */
export function markerRotation(key: string): string {
	let hash = 0
	for (let i = 0; i < key.length; i++) {
		hash = (hash * 31 + key.charCodeAt(i)) | 0
	}
	const angle = ((Math.abs(hash) % 101) / 100) * 10 - 5
	return `rotate(${angle.toFixed(1)}deg)`
}
