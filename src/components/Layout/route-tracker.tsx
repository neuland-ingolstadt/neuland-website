import { useAptabase } from '@aptabase/react'
import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

const RouteTracker = () => {
	const pathname = usePathname()
	const { trackEvent } = useAptabase()

	useEffect(() => {
		const path = pathname === '/' ? 'home' : pathname.slice(1)

		trackEvent('Route', {
			path,
			referrer: document.referrer || 'direct'
		})
	}, [pathname, trackEvent])

	return null
}

export default RouteTracker
