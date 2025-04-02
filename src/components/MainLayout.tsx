import MatrixEffect from '@/components/MatrixEffect'
import ScrollToTop from '@/components/ScrollToTop'
import { Outlet } from 'react-router-dom'
import TerminalHeader from './TerminalHeader'

const MainLayout = () => {
	return (
		<div className="terminal-container min-h-screen relative">
			<TerminalHeader />
			<ScrollToTop />
			<MatrixEffect />
			<div className="scanline" />

			<Outlet />
		</div>
	)
}

export default MainLayout
