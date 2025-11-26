import { allPosts } from 'contentlayer/generated'
import { compareDesc } from 'date-fns'
import { RssIcon, TagIcon } from 'lucide-react'
import Link from 'next/link'
import { PostCard } from '@/components/blog/post-card'
import TerminalButton from '@/components/terminal-button'
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

export default async function Home({
	searchParams
}: {
	searchParams: { [key: string]: string | string[] | undefined }
}) {
	const posts = allPosts.sort((a, b) =>
		compareDesc(new Date(a.date), new Date(b.date))
	)

	const { page } = await searchParams

	// Pagination logic
	const POSTS_PER_PAGE = 12
	const currentPage = Number(page) || 1
	const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE)

	const paginatedPosts = posts.slice(
		(currentPage - 1) * POSTS_PER_PAGE,
		currentPage * POSTS_PER_PAGE
	)

	// Function to generate pagination items
	const generatePaginationItems = () => {
		const items = []

		// Always show first page
		items.push(
			<PaginationItem key="page-1">
				<PaginationLink href="/blog?page=1" isActive={currentPage === 1}>
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
							href={`/blog?page=${i}`}
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
						href={`/blog?page=${totalPages}`}
						isActive={currentPage === totalPages}
					>
						{totalPages}
					</PaginationLink>
				</PaginationItem>
			)
		}

		return items
	}

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
				</BreadcrumbList>
			</Breadcrumb>

			<div className="flex justify-between items-center mt-4 mb-8">
				<h1 className="text-3xl font-bold ">Neuland Blog</h1>
				<div className="flex gap-2">
					<TerminalButton
						href="/feed"
						className="flex items-center gap-2 no-underline group"
					>
						RSS Feed
						<RssIcon
							size={16}
							className="transition-transform duration-300 group-hover:scale-110"
						/>
					</TerminalButton>
					<TerminalButton
						href="/blog/tags"
						className="flex items-center gap-2 no-underline group"
					>
						Alle Tags
						<TagIcon
							size={16}
							className="transition-transform duration-300 group-hover:rotate-16"
						/>
					</TerminalButton>
				</div>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ">
				{paginatedPosts.map((post, idx) => (
					<PostCard post={post} key={idx} />
				))}
			</div>

			{totalPages > 1 && (
				<Pagination className="my-12">
					<PaginationContent>
						<PaginationItem>
							<PaginationPrevious
								href={`/blog?page=${currentPage > 1 ? currentPage - 1 : 1}`}
								aria-disabled={currentPage === 1}
								className={
									currentPage === 1 ? 'pointer-events-none opacity-50' : ''
								}
							/>
						</PaginationItem>

						{generatePaginationItems()}

						<PaginationItem>
							<PaginationNext
								href={`/blog?page=${currentPage < totalPages ? currentPage + 1 : totalPages}`}
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
		</div>
	)
}
