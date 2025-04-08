import { Layout } from 'nextra-theme-blog'

export default async function RootLayout({ children }) {
	return (
		<div className="relative z-10 pt-6 font-sans">
			<Layout
				nextThemes={{
					defaultTheme: 'dark'
				}}
			>
				{children}
			</Layout>
		</div>
	)
}
