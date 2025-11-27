import { withContentlayer } from 'next-contentlayer2'

export default withContentlayer({
	output: 'standalone',
	i18n: {
		defaultLocale: 'de',
		locales: ['de', 'en']
	},
	experimental: {
		webpackMemoryOptimizations: true
	},
	reactCompiler: true
})
