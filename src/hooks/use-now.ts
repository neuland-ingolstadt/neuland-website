import { useEffect, useState } from 'react'

/** Current time in ms, refreshed every minute. `null` until mounted, so server and client render the same. */
export function useNow(intervalMs = 60_000) {
	const [now, setNow] = useState<number | null>(null)

	useEffect(() => {
		setNow(Date.now())
		const timer = setInterval(() => setNow(Date.now()), intervalMs)
		return () => clearInterval(timer)
	}, [intervalMs])

	return now
}
