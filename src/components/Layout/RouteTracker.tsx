import { useAptabase } from '@aptabase/react'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const RouteTracker = () => {
	const location = useLocation()
	const { trackEvent } = useAptabase()

	useEffect(() => {
		const path = location.pathname === '/' ? 'home' : location.pathname.slice(1)

		trackEvent('Route', {
			path,
			referrer: document.referrer || 'direct'
		})
	}, [location, trackEvent])

	return null
}

export default RouteTracker
