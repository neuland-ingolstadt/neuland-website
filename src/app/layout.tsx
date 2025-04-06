import type { Metadata } from 'next'
import { DM_Mono } from 'next/font/google'

import '../styles/index.css'

import MatrixEffect from '@/components/Background/PageBackground'
import TerminalFooter from '@/components/Footer/TerminalFooter'
import TerminalHeader from '@/components/Layout/TerminalHeader'
import Providers from '@/components/Provider'

const spaceMono = DM_Mono({
	variable: '--font-mono',
	subsets: ['latin'],
	weight: ['400', '500'],
	display: 'swap'
})

export const metadata: Metadata = {
	title: 'Neuland Ingolstadt e.V.',
	description:
		'Der Informatik-Verein deines Vertrauens. Von Studierenden für Studierende und alle, die sich für Informatik begeistern können.'
}

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="en" className="dark">
			<body className={`${spaceMono.variable} font-mono antialiased`}>
				<Providers>
					<TerminalHeader />
					<MatrixEffect />
					<div className="container px-4 sm:px-12 mx-auto pt-6 relative z-10">
						{children}
						<TerminalFooter />
					</div>
				</Providers>
			</body>
		</html>
	)
}
