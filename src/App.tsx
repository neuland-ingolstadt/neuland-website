import { Toaster as Sonner } from '@/components/ui/sonner'
import { Toaster } from '@/components/ui/toaster'
import { TooltipProvider } from '@/components/ui/tooltip'
import { BackgroundProvider } from '@/contexts/BackgroundContext'
import { AptabaseProvider } from '@aptabase/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import MainLayout from './components/Layout/MainLayout'
import DatenschutzVerein from './pages/DatenschutzVerein'
import DatenschutzWebsite from './pages/DatenschutzWebsite'
import Impressum from './pages/Impressum'
import Index from './pages/Index'
import NotFound from './pages/NotFound'
import Satzung from './pages/Satzung'

const queryClient = new QueryClient()

const App = () => {
	const APTABASE_KEY = import.meta.env.VITE_APTABASE_KEY ?? ''
	return (
		<AptabaseProvider
			appKey={APTABASE_KEY}
			options={{
				host: 'https://analytics.neuland.app'
			}}
		>
			<BackgroundProvider>
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
										element={<DatenschutzVerein />}
									/>

									<Route path="/datenschutz" element={<DatenschutzWebsite />} />
									<Route path="/impressum" element={<Impressum />} />
									{/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
									<Route path="*" element={<NotFound />} />
								</Route>
							</Routes>
						</BrowserRouter>
					</TooltipProvider>
				</QueryClientProvider>
			</BackgroundProvider>
		</AptabaseProvider>
	)
}
export default App
