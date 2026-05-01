import { withContentlayer } from 'next-contentlayer2';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

export default withContentlayer(withNextIntl({
	output: 'standalone',
	experimental: {
		webpackMemoryOptimizations: true
	},
	reactCompiler: true,
	async redirects() {
		return [
			{
				source: '/:path*',
				has: [{ type: 'host', value: 'cloud.informatik.sexy' }],
				destination: 'https://cloud.neuland.ing/:path*',
				permanent: true
			}
		]
	}
}))
