import { normalizePages } from 'nextra/normalize-pages'
import { getPageMap } from 'nextra/page-map'

// Define frontmatter type for better type safety
interface Frontmatter {
	date?: string
	tags?: string[]
	title?: string
	description?: string
	published?: boolean
	defaultTweetText?: string
	[key: string]: any
}

// Add correct types to the post object
interface Post {
	name: string
	route: string
	frontMatter: Frontmatter
	[key: string]: any
}

export async function getPosts() {
	const { directories } = normalizePages({
		list: await getPageMap('/posts'),
		route: '/posts'
	})

	return directories
		.filter((post: Post) => post.name !== 'index')
		.filter((post: Post) => post.frontMatter?.published)
		.sort((a: Post, b: Post) => {
			// Handle missing dates by using string comparison with fallback to empty string
			const dateA = a.frontMatter?.date || ''
			const dateB = b.frontMatter?.date || ''

			// Simple string comparison (newer dates should be first)
			return dateB.localeCompare(dateA)
		})
}

export async function getTags() {
	const posts = await getPosts()
	const tags = posts.flatMap((post) => post.frontMatter.tags)
	return tags
}
