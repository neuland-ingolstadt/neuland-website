import MatrixEffect from '@/components/Background/PageBackground'
import ScrollToTop from '@/components/Layout/ScrollToTop'
import { Outlet } from 'react-router-dom'
import RouteTracker from './RouteTracker'
import TerminalHeader from './TerminalHeader'

const MainLayout = () => {
	return (
		<div className="terminal-container min-h-screen relative">
			<RouteTracker />
			<TerminalHeader />
			<ScrollToTop />
			<MatrixEffect />
			<Outlet />
		</div>
	)
}

export default MainLayout
