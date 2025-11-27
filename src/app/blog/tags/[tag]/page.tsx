import { allPosts } from 'contentlayer/generated'
import { compareDesc } from 'date-fns'
import Link from 'next/link'
import { PostCard } from '@/components/blog/post-card'
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbSeparator
} from '@/components/ui/breadcrumb'
import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious
} from '@/components/ui/pagination'

export default async function TagPage({
	params,
	searchParams
}: {
	params: Promise<{ tag: string }> | { tag: string }
	searchParams:
		| Promise<{ [key: string]: string | string[] | undefined }>
		| { [key: string]: string | string[] | undefined }
}) {
	const resolvedParams = await params
	const resolvedSearchParams = await searchParams
	const tag = decodeURIComponent(resolvedParams.tag)

	// Filter posts by tag (case insensitive comparison)
	const filteredPosts = allPosts
		.filter((post) =>
			post.tags?.some((postTag) => postTag.toLowerCase() === tag.toLowerCase())
		)
		.sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)))

	// Pagination logic
	const POSTS_PER_PAGE = 12
	const currentPage = Number(resolvedSearchParams.page) || 1
	const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE)

	const paginatedPosts = filteredPosts.slice(
		(currentPage - 1) * POSTS_PER_PAGE,
		currentPage * POSTS_PER_PAGE
	)

	// Function to generate pagination items
	const generatePaginationItems = () => {
		const items = []

		// Always show first page
		items.push(
			<PaginationItem key="page-1">
				<PaginationLink
					href={`/blog/tags/${tag}?page=1`}
					isActive={currentPage === 1}
				>
					1
				</PaginationLink>
			</PaginationItem>
		)

		// Show ellipsis if needed
		if (currentPage > 3) {
			items.push(
				<PaginationItem key="ellipsis-1">
					<PaginationEllipsis />
				</PaginationItem>
			)
		}

		// Show pages around current page
		for (
			let i = Math.max(2, currentPage - 1);
			i <= Math.min(totalPages - 1, currentPage + 1);
			i++
		) {
			if (i <= currentPage + 1 && i >= currentPage - 1) {
				items.push(
					<PaginationItem key={`page-${i}`}>
						<PaginationLink
							href={`/blog/tags/${tag}?page=${i}`}
							isActive={currentPage === i}
						>
							{i}
						</PaginationLink>
					</PaginationItem>
				)
			}
		}

		// Show ellipsis if needed
		if (currentPage < totalPages - 2) {
			items.push(
				<PaginationItem key="ellipsis-2">
					<PaginationEllipsis />
				</PaginationItem>
			)
		}

		// Always show last page if there are more than 1 page
		if (totalPages > 1) {
			items.push(
				<PaginationItem key={`page-${totalPages}`}>
					<PaginationLink
						href={`/blog/tags/${tag}?page=${totalPages}`}
						isActive={currentPage === totalPages}
					>
						{totalPages}
					</PaginationLink>
				</PaginationItem>
			)
		}

		return items
	}

	// Display tag name with proper capitalization for title
	const displayTag = tag.charAt(0).toUpperCase() + tag.slice(1)

	return (
		<div className="mx-auto max-w-5xl">
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
						<BreadcrumbLink className="flex items-center">
							{displayTag}
						</BreadcrumbLink>
					</BreadcrumbItem>
				</BreadcrumbList>
			</Breadcrumb>
			<h1 className="mt-4 mb-2 text-3xl font-bold ">{displayTag}</h1>
			<p className="mb-8 text-terminal-text/70">
				{filteredPosts.length}{' '}
				{filteredPosts.length === 1 ? 'Beitrag' : 'Beiträge'} gefunden
			</p>

			{filteredPosts.length > 0 ? (
				<>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
						{paginatedPosts.map((post, idx) => (
							<PostCard post={post} key={idx} />
						))}
					</div>

					{totalPages > 1 && (
						<Pagination className="my-12">
							<PaginationContent>
								<PaginationItem>
									<PaginationPrevious
										href={`/blog/tags/${tag}?page=${currentPage > 1 ? currentPage - 1 : 1}`}
										aria-disabled={currentPage === 1}
										className={
											currentPage === 1 ? 'pointer-events-none opacity-50' : ''
										}
									/>
								</PaginationItem>

								{generatePaginationItems()}

								<PaginationItem>
									<PaginationNext
										href={`/blog/tags/${tag}?page=${currentPage < totalPages ? currentPage + 1 : totalPages}`}
										aria-disabled={currentPage === totalPages}
										className={
											currentPage === totalPages
												? 'pointer-events-none opacity-50'
												: ''
										}
									/>
								</PaginationItem>
							</PaginationContent>
						</Pagination>
					)}
				</>
			) : (
				<div className="text-center py-12">
					<p className="text-lg text-terminal-text/70">
						No posts found with this tag.
					</p>
					<Link
						href="/blog"
						className="mt-4 inline-block text-terminal-cyan hover:underline"
					>
						Back to all posts
					</Link>
				</div>
			)}
		</div>
	)
}
