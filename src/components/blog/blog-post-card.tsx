import type { Post } from 'contentlayer/generated'
import { format, parseISO } from 'date-fns'
import { ChevronRight } from 'lucide-react'
import { memo } from 'react'
import { Link } from '@/i18n/navigation'
import { markerRotation } from '@/lib/utils'

interface BlogPostCardProps {
	post: Post
}

const BlogPostCard: React.FC<BlogPostCardProps> = ({ post }) => {
	const formattedDate = post.date
		? format(parseISO(post.date), 'dd.MM.yyyy')
		: ''

	return (
		<Link
			href={post.url}
			className="h-full border border-terminal-windowTitle bg-terminal-window cursor-pointer group relative flex flex-col transition-all duration-200 hover:border-terminal-window-border no-underline overflow-hidden"
		>
			{/* Subtle background effect */}
			<div className="absolute inset-0 bg-gradient-to-br from-terminal-cyan/3 via-transparent to-terminal-cyan/3 pointer-events-none" />

			<div className="p-6 pb-14 flex flex-1 flex-col gap-3 relative z-10">
				<div className="flex items-start justify-between gap-3">
					<div className="flex-1 min-w-0">
						{formattedDate && (
							<div className="mb-2 text-xs text-terminal-text/85 font-mono">
								<time dateTime={post.date}>{formattedDate}</time>
							</div>
						)}
						<div className="font-mono text-xl font-bold leading-snug line-clamp-2 text-terminal-text">
							{post.title}
						</div>
					</div>
				</div>

				{post.description && (
					<p className="text-base text-terminal-text/85 leading-relaxed line-clamp-2 mt-auto mb-0 group-hover:text-terminal-text transition-colors duration-200 font-sans">
						{post.description}
					</p>
				)}

				{post.tags?.length > 0 && (
					<div className="flex flex-wrap gap-2">
						{post.tags.map((tag) => (
							<span
								key={tag}
								className="text-xs px-2.5 py-1 bg-terminal-windowTitle text-terminal-text/85 font-medium rounded-sm"
							>
								{tag}
							</span>
						))}
					</div>
				)}
			</div>
			{/* Floating details arrow, same spot and marker as the project cards */}
			<span
				className="marker-stroke absolute bottom-3 right-3 z-10 flex items-center justify-center px-2.5 py-1.5"
				style={{ transform: markerRotation(post.url) }}
			>
				<ChevronRight
					size={24}
					className="group-hover:translate-x-1 transition-transform text-terminal-text/70 group-hover:text-terminal-ink"
				/>
			</span>
		</Link>
	)
}

export default memo(BlogPostCard)
