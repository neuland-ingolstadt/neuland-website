import { createFileRoute } from '@tanstack/react-router'
import { allPosts } from 'contentlayer/generated'
import type { ProjectDetails } from '@/components/Projects/project-card'
import projectsData from '@/data/projects.json'

type SitemapEntry = {
	url: string
	lastModified: string
	changeFrequency: string
	priority: number
}

function escapeXml(value: string): string {
	return value
		.replaceAll('&', '&amp;')
		.replaceAll('<', '&lt;')
		.replaceAll('>', '&gt;')
		.replaceAll('"', '&quot;')
		.replaceAll("'", '&apos;')
}

function buildSitemap(): string {
	const baseUrl = 'https://neuland-ingolstadt.de'
	const now = new Date().toISOString()

	// Static pages
	const staticPages: SitemapEntry[] = [
		{
			url: baseUrl,
			lastModified: now,
			changeFrequency: 'weekly',
			priority: 1.0
		},
		{
			url: `${baseUrl}/blog`,
			lastModified: now,
			changeFrequency: 'weekly',
			priority: 0.8
		},
		{
			url: `${baseUrl}/projects`,
			lastModified: now,
			changeFrequency: 'weekly',
			priority: 0.8
		},
		{
			url: `${baseUrl}/events`,
			lastModified: now,
			changeFrequency: 'daily',
			priority: 0.8
		},
		{
			url: `${baseUrl}/legal/impressum`,
			lastModified: now,
			changeFrequency: 'monthly',
			priority: 0.3
		},
		{
			url: `${baseUrl}/legal/datenschutz`,
			lastModified: now,
			changeFrequency: 'monthly',
			priority: 0.3
		},
		{
			url: `${baseUrl}/legal/datenschutzordnung`,
			lastModified: now,
			changeFrequency: 'monthly',
			priority: 0.3
		}
	]

	// Blog posts
	const blogPosts: SitemapEntry[] = allPosts.map((post) => ({
		url: `${baseUrl}${post.url}`,
		lastModified: new Date(post.date).toISOString(),
		changeFrequency: 'monthly',
		priority: 0.5
	}))

	// Project pages
	const projectPages: SitemapEntry[] = (projectsData as ProjectDetails[]).map(
		(project) => ({
			url: `${baseUrl}/projects/${project.id}`,
			lastModified: now,
			changeFrequency: 'monthly',
			priority: 0.6
		})
	)

	const entries = [...staticPages, ...blogPosts, ...projectPages]

	return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries
	.map(
		(entry) => `  <url>
    <loc>${escapeXml(entry.url)}</loc>
    <lastmod>${escapeXml(entry.lastModified)}</lastmod>
    <changefreq>${escapeXml(entry.changeFrequency)}</changefreq>
    <priority>${entry.priority}</priority>
  </url>`
	)
	.join('\n')}
</urlset>`
}

export const Route = createFileRoute('/sitemap.xml')({
	server: {
		handlers: {
			GET: async () =>
				new Response(buildSitemap(), {
					headers: {
						'Content-Type': 'application/xml; charset=utf-8',
						'Cache-Control':
							'public, s-maxage=3600, stale-while-revalidate=86400'
					}
				})
		}
	}
})
