import { PostCard } from '@/components/blog/PostCard'
import { Badge } from '@/components/ui/badge'
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
	searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
	const tags = await getTags()
	const posts = await getPosts()
	const allTags: Record<string, number> = Object.create(null)

	for (const tag of tags) {
		allTags[tag] ??= 0
		allTags[tag] += 1
	}

	const page = Number((await searchParams).page || '1')
	const postsPerPage = 12
	const totalPages = Math.ceil(posts.length / postsPerPage)
	const startIndex = (page - 1) * postsPerPage
	const endIndex = startIndex + postsPerPage
	const paginatedPosts = posts.slice(startIndex, endIndex)

	const generatePaginationItems = () => {
		const items = []
		// Generate all page numbers without ellipses
		for (let i = 1; i <= totalPages; i++) {
			items.push(i)
		}
		return items
	}

	const paginationItems = generatePaginationItems()

	return (
		<>
			<Breadcrumb className="-ml-[1.625em] no-underline">
				<BreadcrumbList className="flex items-center">
					<BreadcrumbItem className="flex items-center">
						<BreadcrumbLink asChild className="flex items-center">
							<Link href="/" className="flex items-center">
								root
							</Link>
						</BreadcrumbLink>
					</BreadcrumbItem>
					<BreadcrumbSeparator className="flex items-center mx-1" />
					<BreadcrumbItem className="flex items-center">
						<BreadcrumbLink className="flex items-center">Blog</BreadcrumbLink>
					</BreadcrumbItem>
				</BreadcrumbList>
			</Breadcrumb>

			<header className="mb-12 mt-2">
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
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
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

						{paginationItems.map((item) => (
							<PaginationItem key={`page-${item}`}>
								<PaginationLink
									href={`/blog?page=${item}`}
									isActive={page === item}
								>
									{item}
								</PaginationLink>
							</PaginationItem>
						))}

						{page < totalPages && (
							<PaginationItem>
								<PaginationNext href={`/blog?page=${page + 1}`} />
							</PaginationItem>
						)}
					</PaginationContent>
				</Pagination>
			)}
		</>
	)
}
