import { withContentlayer } from 'next-contentlayer2'

export default withContentlayer({
	output: 'standalone',
	experimental: {
		webpackMemoryOptimizations: true
	},
	reactCompiler: true
})
