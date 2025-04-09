import nextra from 'nextra'

const withNextra = nextra({
	defaultShowCopyCode: true,
	readingTime: true,
	staticImage: true,

	mdxOptions: {
		rehypePrettyCodeOptions: {
			theme: 'nord',
			defaultLang: 'plaintext'
		}
	}
})

export default withNextra({
	pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],

	onDemandEntries: {
		maxInactiveAge: 25 * 1000,
		pagesBufferLength: 4
	},

	output: 'standalone'
})
