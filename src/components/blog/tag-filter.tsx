'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

// Type for blog post metadata
interface BlogPost {
	slug: string
	title: string
	description: string
	date: string
	authors: string[]
	draft: boolean
	tags: string[]
}

export function TagFilter({
	tags,
	posts
}: {
	tags: string[]
	posts: BlogPost[]
}) {
	const [selectedTags, setSelectedTags] = useState<string[]>([])

	const filteredPosts =
		selectedTags.length > 0
			? posts.filter((post) =>
					selectedTags.some((tag) => post.tags.includes(tag))
				)
			: posts

	const toggleTag = (tag: string) => {
		setSelectedTags((prev) =>
			prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
		)
	}

	return (
		<>
			<div className="mb-6">
				<h2 className="text-terminal-text-muted mb-2 text-sm">
					Filter by tag:
				</h2>
				<div className="flex flex-wrap gap-2">
					{tags.map((tag) => (
						<Badge
							key={tag}
							className={`cursor-pointer ${
								selectedTags.includes(tag)
									? 'bg-terminal-cyan text-terminal-onAccent'
									: 'bg-terminal-card text-terminal-text/80 border border-terminal-window-border'
							}`}
							onClick={() => toggleTag(tag)}
						>
							{tag}
						</Badge>
					))}
					{selectedTags.length > 0 && (
						<Button
							variant="ghost"
							size="sm"
							onClick={() => setSelectedTags([])}
							className="text-terminal-text-muted hover:text-terminal-text"
						>
							Clear filters
						</Button>
					)}
				</div>
			</div>

			<div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
				{filteredPosts.map((post) => (
					<Link
						href={`/blog/${post.slug}`}
						key={post.slug}
						className="block group"
					>
						<div className="bg-terminal-window border border-terminal-window-border rounded-lg overflow-hidden group-hover:border-terminal-cyan transition-colors duration-300 flex flex-col h-full">
							<div className="p-4 flex-grow">
								<h2 className="text-lg font-bold mb-2 text-terminal-yellow line-clamp-2">
									{post.title}
								</h2>
								<div className="flex flex-col gap-1 text-xs text-terminal-text-muted mb-3 font-mono">
									{post.date && <time dateTime={post.date}>{post.date}</time>}
									{post.authors && post.authors.length > 0 && (
										<span>{post.authors.join(', ')}</span>
									)}
								</div>
								{post.tags.length > 0 && (
									<div className="flex flex-wrap gap-1 mb-3">
										{post.tags.map((tag) => (
											<Badge
												key={tag}
												variant="outline"
												className="text-[8px] py-0"
											>
												{tag}
											</Badge>
										))}
									</div>
								)}
								<p className="text-terminal-text text-sm line-clamp-2">
									{post.description}
								</p>
							</div>
							<div className="px-4 py-2 bg-terminal-bg border-t border-terminal-window-border mt-auto">
								<span className="text-terminal-cyan text-xs font-mono group-hover:underline">
									Mehr lesen →
								</span>
							</div>
						</div>
					</Link>
				))}
			</div>
		</>
	)
}
