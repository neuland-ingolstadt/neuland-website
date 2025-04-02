import MatrixEffect from '@/components/Background/PageBackground'
import ScrollToTop from '@/components/Layout/ScrollToTop'
import { Outlet } from 'react-router-dom'
import TerminalHeader from './TerminalHeader'

const MainLayout = () => {
	return (
		<div className="terminal-container min-h-screen relative">
			<TerminalHeader />
			<ScrollToTop />
			<MatrixEffect />
			<div className="pt-16">
				{' '}
				{/* Add padding to account for fixed navbar height */}
				<Outlet />
			</div>
		</div>
	)
}

export default MainLayout
