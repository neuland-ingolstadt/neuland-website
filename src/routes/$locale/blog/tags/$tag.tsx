import { createFileRoute } from '@tanstack/react-router'
import { allPosts } from 'contentlayer/generated'
import { compareDesc } from 'date-fns'
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
import { Link, useRouter } from '@/i18n/navigation'
import { useTranslations } from '@/i18n/react'

export const Route = createFileRoute('/$locale/blog/tags/$tag')({
	validateSearch: (search: Record<string, unknown>) => {
		const page = Number(search.page)
		return {
			page: Number.isFinite(page) && page > 0 ? page : undefined
		}
	},
	head: ({ params }) => {
		const tag = decodeURIComponent(params.tag)
		const displayTag = tag.charAt(0).toUpperCase() + tag.slice(1)
		return { meta: [{ title: `${displayTag} - Neuland Blog` }] }
	},
	component: TagPage
})

function TagPage() {
	const { tag: rawTag } = Route.useParams()
	const search = Route.useSearch()
	const router = useRouter()
	const tag = decodeURIComponent(rawTag)

	const navigateToPage = (page: number) => {
		router.push(`/blog/tags/${rawTag}?page=${page}`)
	}

	// Filter posts by tag (case insensitive comparison)
	const filteredPosts = allPosts
		.filter((post) =>
			post.tags?.some((postTag) => postTag.toLowerCase() === tag.toLowerCase())
		)
		.sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)))

	// Pagination logic
	const POSTS_PER_PAGE = 12
	const currentPage = search.page || 1
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
					href="#"
					onClick={(event) => {
						event.preventDefault()
						navigateToPage(1)
					}}
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
							href="#"
							onClick={(event) => {
								event.preventDefault()
								navigateToPage(i)
							}}
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
						href="#"
						onClick={(event) => {
							event.preventDefault()
							navigateToPage(totalPages)
						}}
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

	const t = useTranslations('Blog.tags')

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
						<BreadcrumbLink className="flex items-center">
							{displayTag}
						</BreadcrumbLink>
					</BreadcrumbItem>
				</BreadcrumbList>
			</Breadcrumb>
			<h1 className="mt-4 mb-2 text-3xl font-bold ">{displayTag}</h1>
			<p className="text-terminal-text/70 mb-8">
				{t('amountPosts', { numberOfPosts: filteredPosts.length })}
			</p>

			{filteredPosts.length > 0 ? (
				<>
					<div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
						{paginatedPosts.map((post, idx) => (
							<PostCard post={post} key={idx} />
						))}
					</div>

					{totalPages > 1 && (
						<Pagination className="my-12">
							<PaginationContent>
								<PaginationItem>
									<PaginationPrevious
										href="#"
										onClick={(event) => {
											event.preventDefault()
											if (currentPage > 1) navigateToPage(currentPage - 1)
										}}
										aria-disabled={currentPage === 1}
										className={
											currentPage === 1 ? 'pointer-events-none opacity-50' : ''
										}
									/>
								</PaginationItem>

								{generatePaginationItems()}

								<PaginationItem>
									<PaginationNext
										href="#"
										onClick={(event) => {
											event.preventDefault()
											if (currentPage < totalPages)
												navigateToPage(currentPage + 1)
										}}
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
				<div className="py-12 text-center">
					<p className="text-terminal-text/70 text-lg">
						{t('noPostsFoundWithTag')}
					</p>
					<Link
						href="/blog"
						className="text-terminal-cyan hover:underline mt-4 inline-block"
					>
						{t('backToAll')}
					</Link>
				</div>
			)}
		</div>
	)
}
