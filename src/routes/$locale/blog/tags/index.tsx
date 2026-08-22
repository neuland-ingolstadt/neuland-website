import { createFileRoute } from '@tanstack/react-router'
import { allPosts } from 'contentlayer/generated'
import { Badge } from '@/components/ui/badge'
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbSeparator
} from '@/components/ui/breadcrumb'
import { Link } from '@/i18n/navigation'
import { useTranslations } from '@/i18n/react'

export const Route = createFileRoute('/$locale/blog/tags/')({
	head: () => ({
		meta: [{ title: 'Neuland Blog Tags' }]
	}),
	component: TagsIndexPage
})

function TagsIndexPage() {
	const t = useTranslations('Blog.tags')

	// Get all unique tags and count how many posts use each tag
	const tagCounts = allPosts.reduce(
		(acc, post) => {
			if (post.tags && post.tags.length > 0) {
				post.tags.forEach((tag) => {
					const tagLower = tag.toLowerCase()
					acc[tagLower] = (acc[tagLower] || 0) + 1
				})
			}
			return acc
		},
		{} as Record<string, number>
	)

	// Convert to array and sort alphabetically
	const sortedTags = Object.entries(tagCounts).sort(([tagA], [tagB]) =>
		tagA.localeCompare(tagB)
	)

	return (
		<div className="mx-auto mb-12 max-w-5xl">
			<Breadcrumb>
				<BreadcrumbList className="flex items-center">
					<BreadcrumbItem className="flex items-center">
						<BreadcrumbLink asChild className="flex items-center">
							<Link href="/" className="flex items-center">
								Home
							</Link>
						</BreadcrumbLink>
					</BreadcrumbItem>
					<BreadcrumbSeparator className="mx-1 flex items-center" />
					<BreadcrumbItem className="flex items-center">
						<BreadcrumbLink asChild className="flex items-center">
							<Link href="/blog" className="flex items-center">
								Blog
							</Link>
						</BreadcrumbLink>
					</BreadcrumbItem>
					<BreadcrumbSeparator className="mx-1 flex items-center" />
					<BreadcrumbItem className="flex items-center">
						<BreadcrumbLink className="flex items-center">Tags</BreadcrumbLink>
					</BreadcrumbItem>
				</BreadcrumbList>
			</Breadcrumb>

			<h1 className="mt-4 mb-2 text-3xl font-bold ">Blog Tags</h1>
			<p className="text-terminal-text/70 mb-8">
				{t('searchAllTags', { numberOfTags: sortedTags.length })}
			</p>

			<div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-2">
				{sortedTags.map(([tag, count]) => {
					const displayTag = tag.charAt(0).toUpperCase() + tag.slice(1)

					return (
						<Link
							key={tag}
							href={`/blog/tags/${encodeURIComponent(tag)}`}
							className="group no-underline"
						>
							<div className="bg-terminal-window hover:border-terminal-highlight/40 relative flex items-center justify-between overflow-hidden border border-terminal-window-border p-5 transition-all duration-200">
								{/* Subtle background effect */}
								<div className="from-terminal-cyan/1 via-transparent to-terminal-cyan/3 pointer-events-none absolute inset-0 bg-gradient-to-br" />

								{/* Corner accent brackets */}
								<div className="top-0 left-0 absolute h-8 w-8">
									<div className="bg-terminal-cyan/30 group-hover:bg-terminal-cyan/50 top-0 left-0 absolute h-px w-4 transition-colors duration-200" />
									<div className="bg-terminal-cyan/30 group-hover:bg-terminal-cyan/50 top-0 left-0 absolute h-4 w-px transition-colors duration-200" />
								</div>
								<div className="top-0 right-0 absolute h-8 w-8">
									<div className="bg-terminal-cyan/30 group-hover:bg-terminal-cyan/50 top-0 right-0 absolute h-px w-4 transition-colors duration-200" />
									<div className="bg-terminal-cyan/30 group-hover:bg-terminal-cyan/50 top-0 right-0 absolute h-4 w-px transition-colors duration-200" />
								</div>
								<div className="bottom-0 left-0 absolute h-8 w-8">
									<div className="bg-terminal-cyan/30 group-hover:bg-terminal-cyan/50 bottom-0 left-0 absolute h-px w-4 transition-colors duration-200" />
									<div className="bg-terminal-cyan/30 group-hover:bg-terminal-cyan/50 bottom-0 left-0 absolute h-4 w-px transition-colors duration-200" />
								</div>
								<div className="bottom-0 right-0 absolute h-8 w-8">
									<div className="bg-terminal-cyan/30 group-hover:bg-terminal-cyan/50 bottom-0 right-0 absolute h-px w-4 transition-colors duration-200" />
									<div className="bg-terminal-cyan/30 group-hover:bg-terminal-cyan/50 bottom-0 right-0 absolute h-4 w-px transition-colors duration-200" />
								</div>

								<div className="relative z-10 flex min-w-0 flex-1 items-center">
									<Badge
										variant="outline"
										className="text-terminal-text/70 group-hover:border-terminal-highlight/40 mr-3 border-terminal-window-border bg-terminal-card px-2 py-0.5 text-sm transition-colors duration-200"
									>
										{displayTag}
									</Badge>
									<span className="text-terminal-text/70 group-hover:text-terminal-text text-sm transition-colors duration-200">
										{t('amountPosts', { numberOfPosts: count })}
									</span>
								</div>
								<span className="text-terminal-text/60 group-hover:text-terminal-cyan relative z-10 flex items-center gap-1 text-xs transition-colors duration-200">
									{t('display')}
									<span className="inline-block transition-transform duration-200 group-hover:translate-x-1">
										→
									</span>
								</span>
							</div>
						</Link>
					)
				})}
			</div>
		</div>
	)
}
