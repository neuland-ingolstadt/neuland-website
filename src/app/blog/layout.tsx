import { Layout } from 'nextra-theme-blog'
import '@/styles/blog/nextra-overrides.css'

export default async function RootLayout({
	children
}: { children: React.ReactNode }) {
	return (
		<div className="relative z-10 pt-6 font-sans">
			<Layout
				nextThemes={{
					enableSystem: false,
					forcedTheme: 'dark',
					defaultTheme: 'dark'
				}}
			>
				{children}
			</Layout>
		</div>
	)
}
