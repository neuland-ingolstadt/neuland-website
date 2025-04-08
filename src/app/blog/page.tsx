import { PostCard } from '@/components/blog/PostCard'
import { Badge } from '@/components/ui/badge'
import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious
} from '@/components/ui/pagination'
import Link from 'next/link'
import { getPosts, getTags } from './get-posts'

export const metadata = {
	title: 'Neuland Blog'
}

export default async function PostsPage({
	searchParams
}: {
	searchParams: { [key: string]: string | string[] | undefined }
}) {
	const tags = await getTags()
	const posts = await getPosts()
	const allTags = Object.create(null)

	for (const tag of tags) {
		allTags[tag] ??= 0
		allTags[tag] += 1
	}

	const page = Number(searchParams.page || '1')
	const postsPerPage = 9
	const totalPages = Math.ceil(posts.length / postsPerPage)
	const startIndex = (page - 1) * postsPerPage
	const endIndex = startIndex + postsPerPage
	const paginatedPosts = posts.slice(startIndex, endIndex)

	const generatePaginationItems = () => {
		const items = []

		items.push(1)

		let rangeStart = Math.max(2, page - 1)
		let rangeEnd = Math.min(totalPages - 1, page + 1)

		if (page <= 3) {
			rangeStart = 2
			rangeEnd = Math.min(4, totalPages - 1)
		} else if (page >= totalPages - 2) {
			rangeStart = Math.max(totalPages - 3, 2)
			rangeEnd = totalPages - 1
		}

		if (rangeStart > 2) {
			items.push('ellipsis-start')
		}

		for (let i = rangeStart; i <= rangeEnd; i++) {
			items.push(i)
		}

		if (rangeEnd < totalPages - 1) {
			items.push('ellipsis-end')
		}

		if (totalPages > 1) {
			items.push(totalPages)
		}

		return items
	}

	const paginationItems = generatePaginationItems()

	return (
		<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
			<header className="mb-12">
				<h1 className="text-4xl font-bold text-terminal-highlight mb-6 font-mono">
					{metadata.title}
				</h1>
				<div className="not-prose flex flex-wrap gap-2 mb-8">
					{Object.entries(allTags).map(([tag, count]) => (
						<Link key={tag} href={`/blog/tags/${tag}`} className="no-underline">
							<Badge
								variant="outline"
								className="cursor-pointer hover:bg-terminal-window-border text-sm"
							>
								{tag} <span className="font-semibold">({count})</span>
							</Badge>
						</Link>
					))}
				</div>
			</header>
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
				{paginatedPosts.map((post) => (
					<PostCard key={post.route} post={post} />
				))}
			</div>

			{totalPages > 1 && (
				<Pagination className="mt-12">
					<PaginationContent>
						{page > 1 && (
							<PaginationItem>
								<PaginationPrevious href={`/blog?page=${page - 1}`} />
							</PaginationItem>
						)}

						{paginationItems.map((item, _index) => {
							if (item === 'ellipsis-start' || item === 'ellipsis-end') {
								return (
									<PaginationItem key={`ellipsis-${item}`}>
										<PaginationEllipsis />
									</PaginationItem>
								)
							}

							return (
								<PaginationItem key={`page-${item}`}>
									<PaginationLink
										href={`/blog?page=${item}`}
										isActive={page === item}
									>
										{item}
									</PaginationLink>
								</PaginationItem>
							)
						})}

						{page < totalPages && (
							<PaginationItem>
								<PaginationNext href={`/blog?page=${page + 1}`} />
							</PaginationItem>
						)}
					</PaginationContent>
				</Pagination>
			)}
		</div>
	)
}
