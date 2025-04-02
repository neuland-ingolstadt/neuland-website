import { Toaster as Sonner } from '@/components/ui/sonner'
import { Toaster } from '@/components/ui/toaster'
import { TooltipProvider } from '@/components/ui/tooltip'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import MainLayout from './components/MainLayout'
import Datenschutzhinweise from './pages/Datenschutzhinweise'
import Datenschutzordnung from './pages/Datenschutzordnung'
import Impressum from './pages/Impressum'
import Index from './pages/Index'
import NotFound from './pages/NotFound'
import Satzung from './pages/Satzung'

const queryClient = new QueryClient()

const App = () => (
	<QueryClientProvider client={queryClient}>
		<TooltipProvider>
			<Toaster />
			<Sonner />
			<BrowserRouter>
				<Routes>
					<Route element={<MainLayout />}>
						<Route path="/" element={<Index />} />
						<Route path="/satzung" element={<Satzung />} />
						<Route
							path="/datenschutzordnung"
							element={<Datenschutzordnung />}
						/>
						<Route
							path="/datenschutzhinweise"
							element={<Datenschutzhinweise />}
						/>
						<Route path="/impressum" element={<Impressum />} />
						{/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
						<Route path="*" element={<NotFound />} />
					</Route>
				</Routes>
			</BrowserRouter>
		</TooltipProvider>
	</QueryClientProvider>
)

export default App
