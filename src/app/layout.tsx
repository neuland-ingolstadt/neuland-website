import type { Metadata } from 'next'
import { Noto_Sans_Mono, Shantell_Sans } from 'next/font/google'

import '../styles/index.css'

import MatrixEffect from '@/components/Background/PageBackground'
import TerminalFooter from '@/components/Footer/TerminalFooter'
import TerminalHeader from '@/components/Layout/TerminalHeader'
import Providers from '@/components/Provider'

const overpassMono = Noto_Sans_Mono({
	variable: '--font-mono',
	subsets: ['latin'],
	display: 'swap'
})

const shantellSans = Shantell_Sans({
	variable: '--font-sans',
	subsets: ['latin'],
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
		<html lang="de" className="dark">
			<body
				className={`${overpassMono.variable} ${shantellSans.variable} font-mono antialiased`}
			>
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
