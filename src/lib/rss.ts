import { allPosts } from 'contentlayer/generated'
import { compareDesc } from 'date-fns'

function extractDescription(content: string): string {
	if (!content) return ''

	// Remove frontmatter
	let text = content.replace(/^---[\s\S]*?---/, '').trim()

	// Handle headings properly - replace with bold text and preserve line breaks for RSS
	text = text.replace(/^(#{1,6})\s+(.*)$/gm, '<strong>$2</strong>')

	// Remove image markdown
	text = text.replace(/!\[[^\]]*\]\([^)]*\)/g, '')

	// Convert links to plain text
	text = text.replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')

	// Preserve paragraph breaks by converting double newlines to <br> tags
	text = text.replace(/\n\n+/g, '<br><br>')

	// Preserve single line breaks
	text = text.replace(/\n/g, '<br>')

	// Normalize whitespace (but preserve our <br> tags)
	text = text
		.replace(/\s+/g, (match) => {
			// Don't collapse spaces that are part of <br> tags
			return match.includes('<br>') ? match : ' '
		})
		.trim()

	if (text.length <= 700) return text

	const truncated = text.substring(0, 550)
	const sentenceEnd = truncated.match(/[.!?]\s+/g)

	if (sentenceEnd && sentenceEnd.length > 0) {
		const lastIndex = truncated.lastIndexOf(sentenceEnd[sentenceEnd.length - 1])
		if (lastIndex > 500) {
			return `${truncated.substring(0, lastIndex + 1)}...`
		}
	}

	return `${truncated.substring(0, 700)}...`
}

export function buildRssFeed(): Response {
	const siteUrl = 'https://neuland-ingolstadt.de'
	const siteName = 'Neuland Ingolstadt Blog'
	const siteDescription =
		'Latest updates from Neuland Ingolstadt - student projects, events, and technical insights.'

	const sortedPosts = allPosts.sort((a, b) =>
		compareDesc(new Date(a.date), new Date(b.date))
	)

	const rssXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>${siteName}</title>
    <description>${siteDescription}</description>
    <link>${siteUrl}/blog</link>
    <atom:link href="${siteUrl}/feed.xml" rel="self" type="application/rss+xml" />
    <language>en</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <managingEditor>info@neuland-ingolstadt.de (Neuland Ingolstadt)</managingEditor>
    <webMaster>info@neuland-ingolstadt.de (Neuland Ingolstadt)</webMaster>
    <generator>TanStack Start RSS Generator</generator>
    <image>
      <url>${siteUrl}/favicon.png</url>
      <title>${siteName}</title>
      <link>${siteUrl}/blog</link>
    </image>
${sortedPosts
	.map((post) => {
		const postUrl = `${siteUrl}${post.url}`
		const authors = Array.isArray(post.authors)
			? post.authors
					.map((author: unknown) =>
						typeof author === 'object' && author !== null && 'name' in author
							? (author as { name: string }).name
							: String(author)
					)
					.join(', ')
			: 'Neuland Ingolstadt'

		const extractedPreview = extractDescription(post.body.raw || '')

		const description = post.description
			? `${post.description}<br /><br />${extractedPreview}`
			: extractedPreview

		return `    <item>
      <title><![CDATA[${post.title}]]></title>
      <description><![CDATA[${description}]]></description>
      <link>${postUrl}</link>
      <guid isPermaLink="true">${postUrl}</guid>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <author>${authors}</author>
      ${
				post.tags && post.tags.length > 0
					? post.tags
							.map((tag) => `<category>${tag}</category>`)
							.join('\n      ')
					: ''
			}
    </item>`
	})
	.join('\n')}
  </channel>
</rss>`

	return new Response(rssXml, {
		headers: {
			'Content-Type': 'application/rss+xml; charset=utf-8',
			'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400'
		}
	})
}
