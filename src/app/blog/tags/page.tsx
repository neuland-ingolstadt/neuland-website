import { allPosts } from 'contentlayer/generated'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbSeparator
} from '@/components/ui/breadcrumb'

export default function TagsIndexPage() {
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
		<div className="mx-auto max-w-5xl mb-12">
			<Breadcrumb>
				<BreadcrumbList className="flex items-center">
					<BreadcrumbItem className="flex items-center">
						<BreadcrumbLink asChild className="flex items-center">
							<Link href="/" className="flex items-center">
								Home
							</Link>
						</BreadcrumbLink>
					</BreadcrumbItem>
					<BreadcrumbSeparator className="flex items-center mx-1" />
					<BreadcrumbItem className="flex items-center">
						<BreadcrumbLink asChild className="flex items-center">
							<Link href="/blog" className="flex items-center">
								Blog
							</Link>
						</BreadcrumbLink>
					</BreadcrumbItem>
					<BreadcrumbSeparator className="flex items-center mx-1" />
					<BreadcrumbItem className="flex items-center">
						<BreadcrumbLink className="flex items-center">Tags</BreadcrumbLink>
					</BreadcrumbItem>
				</BreadcrumbList>
			</Breadcrumb>

			<h1 className="mt-4 mb-2 text-3xl font-bold ">Blog Tags</h1>
			<p className="mb-8 text-terminal-text/70">
				Durchsuche alle {sortedTags.length} Tags des Neuland Blogs
			</p>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
				{sortedTags.map(([tag, count]) => {
					const displayTag = tag.charAt(0).toUpperCase() + tag.slice(1)

					return (
						<Link
							key={tag}
							href={`/blog/tags/${encodeURIComponent(tag)}`}
							className="group no-underline"
						>
							<div className="relative bg-terminal-window border border-terminal-window-border p-5 flex items-center justify-between transition-all duration-200 hover:border-terminal-highlight/40 overflow-hidden">
								{/* Subtle background effect */}
								<div className="absolute inset-0 bg-gradient-to-br from-terminal-cyan/1 via-transparent to-terminal-cyan/3 pointer-events-none" />

								{/* Corner accent brackets */}
								<div className="absolute top-0 left-0 w-8 h-8">
									<div className="absolute top-0 left-0 w-4 h-px bg-terminal-cyan/30 group-hover:bg-terminal-cyan/50 transition-colors duration-200" />
									<div className="absolute top-0 left-0 w-px h-4 bg-terminal-cyan/30 group-hover:bg-terminal-cyan/50 transition-colors duration-200" />
								</div>
								<div className="absolute top-0 right-0 w-8 h-8">
									<div className="absolute top-0 right-0 w-4 h-px bg-terminal-cyan/30 group-hover:bg-terminal-cyan/50 transition-colors duration-200" />
									<div className="absolute top-0 right-0 w-px h-4 bg-terminal-cyan/30 group-hover:bg-terminal-cyan/50 transition-colors duration-200" />
								</div>
								<div className="absolute bottom-0 left-0 w-8 h-8">
									<div className="absolute bottom-0 left-0 w-4 h-px bg-terminal-cyan/30 group-hover:bg-terminal-cyan/50 transition-colors duration-200" />
									<div className="absolute bottom-0 left-0 w-px h-4 bg-terminal-cyan/30 group-hover:bg-terminal-cyan/50 transition-colors duration-200" />
								</div>
								<div className="absolute bottom-0 right-0 w-8 h-8">
									<div className="absolute bottom-0 right-0 w-4 h-px bg-terminal-cyan/30 group-hover:bg-terminal-cyan/50 transition-colors duration-200" />
									<div className="absolute bottom-0 right-0 w-px h-4 bg-terminal-cyan/30 group-hover:bg-terminal-cyan/50 transition-colors duration-200" />
								</div>

								<div className="relative z-10 flex items-center flex-1 min-w-0">
									<Badge
										variant="outline"
										className="text-sm py-0.5 px-2 mr-3 border-terminal-window-border bg-terminal-card text-terminal-text/70 group-hover:border-terminal-highlight/40 transition-colors duration-200"
									>
										{displayTag}
									</Badge>
									<span className="text-terminal-text/70 text-sm group-hover:text-terminal-text transition-colors duration-200">
										{count} {count === 1 ? 'Beitrag' : 'Beiträge'}
									</span>
								</div>
								<span className="relative z-10 text-terminal-text/60 group-hover:text-terminal-cyan text-xs transition-colors duration-200 flex items-center gap-1">
									View
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
