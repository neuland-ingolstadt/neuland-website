import { useAptabase } from '@aptabase/react'
import { useLocation } from '@tanstack/react-router'
import { useEffect } from 'react'

const RouteTracker = () => {
	const pathname = useLocation({ select: (location) => location.pathname })
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
