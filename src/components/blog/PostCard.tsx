'use client'
import { Badge } from '@/components/ui/badge'
import moment from 'moment'
import Link from 'next/link'
import type { BlogMetadata } from 'nextra-theme-blog'

type PostCardProps = {
	post: {
		route: string
		frontMatter: BlogMetadata
	}
}

export function PostCard({ post }: PostCardProps) {
	return (
		<>
			<Link
				href={`/blog/${post.route}`}
				key={post.frontMatter.title}
				className="block group no-underline"
			>
				<div className="bg-terminal-window border border-terminal-window-border rounded-lg overflow-hidden group-hover:border-terminal-cyan transition-colors duration-300 flex flex-col h-full">
					<div className="p-4 flex-grow">
						<h2 className="text-lg font-bold mb-2 text-terminal-text line-clamp-2">
							{post.frontMatter.title}
						</h2>
						<div className="flex flex-col gap-1 text-md text-terminal-text mb-3 ">
							{post.frontMatter.date && (
								<time dateTime={post.frontMatter.date}>
									{moment(post.frontMatter.date).format('DD.MM.YYYY')}
								</time>
							)}
							{post.frontMatter.author &&
								post.frontMatter.author.length > 0 && (
									<span>{post.frontMatter.author}</span>
								)}
						</div>
						{post.frontMatter?.tags && post.frontMatter.tags.length > 0 && (
							<div className="flex flex-wrap gap-1 mb-3">
								{post.frontMatter.tags.map((tag) => (
									<Badge
										key={tag}
										variant="outline"
										className="text-[12px] py-0"
									>
										{tag}
									</Badge>
								))}
							</div>
						)}
						<p className="text-terminal-text text-sm line-clamp-2 font-sans">
							{post.frontMatter.description}
						</p>
					</div>
					<div className="px-4 py-2 bg-terminal-bg border-t border-terminal-window-border mt-auto">
						<span className="text-terminal-text/90 text-xs font-mono">
							Read more →
						</span>
					</div>
				</div>
			</Link>
		</>
	)
}
