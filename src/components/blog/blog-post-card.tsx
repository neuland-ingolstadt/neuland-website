import type { Post } from 'contentlayer/generated'
import { ChevronRight } from 'lucide-react'
import moment from 'moment'
import Link from 'next/link'
import { memo } from 'react'

interface BlogPostCardProps {
	post: Post
}

const BlogPostCard: React.FC<BlogPostCardProps> = ({ post }) => {
	const formattedDate = post.date ? moment(post.date).format('DD.MM.YYYY') : ''

	return (
		<Link
			href={post.url}
			className="h-full border border-neutral-800 bg-[#0b0b0b] cursor-pointer group relative flex flex-col transition-all duration-200 hover:border-neutral-700 no-underline overflow-hidden"
		>
			{/* Subtle background effect */}
			<div className="absolute inset-0 bg-gradient-to-br from-terminal-cyan/3 via-transparent to-terminal-cyan/3 pointer-events-none" />

			{/* Creative accent - corner brackets on all corners */}
			<div className="absolute top-0 left-0 w-12 h-12">
				<div className="absolute top-0 left-0 w-6 h-px bg-terminal-cyan/30 group-hover:bg-terminal-cyan/50 transition-colors duration-200" />
				<div className="absolute top-0 left-0 w-px h-6 bg-terminal-cyan/30 group-hover:bg-terminal-cyan/50 transition-colors duration-200" />
			</div>
			<div className="absolute top-0 right-0 w-12 h-12">
				<div className="absolute top-0 right-0 w-6 h-px bg-terminal-cyan/30 group-hover:bg-terminal-cyan/50 transition-colors duration-200" />
				<div className="absolute top-0 right-0 w-px h-6 bg-terminal-cyan/30 group-hover:bg-terminal-cyan/50 transition-colors duration-200" />
			</div>
			<div className="absolute bottom-0 left-0 w-12 h-12">
				<div className="absolute bottom-0 left-0 w-6 h-px bg-terminal-cyan/30 group-hover:bg-terminal-cyan/50 transition-colors duration-200" />
				<div className="absolute bottom-0 left-0 w-px h-6 bg-terminal-cyan/30 group-hover:bg-terminal-cyan/50 transition-colors duration-200" />
			</div>
			<div className="absolute bottom-0 right-0 w-12 h-12">
				<div className="absolute bottom-0 right-0 w-6 h-px bg-terminal-cyan/30 group-hover:bg-terminal-cyan/50 transition-colors duration-200" />
				<div className="absolute bottom-0 right-0 w-px h-6 bg-terminal-cyan/30 group-hover:bg-terminal-cyan/50 transition-colors duration-200" />
			</div>

			<div className="p-6 flex flex-col gap-3 relative z-10">
				<div className="flex items-start justify-between gap-3">
					<div className="flex-1 min-w-0">
						<div className="text-lg font-semibold flex items-center gap-2 text-terminal-text mb-2">
							{post.title}
						</div>
						{formattedDate && (
							<div className="text-xs text-gray-400 font-mono">
								<time dateTime={post.date}>{formattedDate}</time>
							</div>
						)}
					</div>
					<ChevronRight
						size={20}
						className="shrink-0 text-gray-400 group-hover:text-terminal-cyan group-hover:translate-x-1 transition-all duration-200 mt-0.5"
					/>
				</div>

				{post.description && (
					<p className="text-sm text-gray-400 leading-relaxed line-clamp-2 group-hover:text-gray-300 transition-colors duration-200">
						{post.description}
					</p>
				)}

				{post.tags?.length > 0 && (
					<div className="flex flex-wrap gap-2 pt-1">
						{post.tags.map((tag) => (
							<span
								key={tag}
								className="text-xs px-2.5 py-1 bg-black text-gray-400 font-medium border border-neutral-800 group-hover:border-neutral-700 transition-colors duration-200"
							>
								{tag}
							</span>
						))}
					</div>
				)}
			</div>
		</Link>
	)
}

export default memo(BlogPostCard)
