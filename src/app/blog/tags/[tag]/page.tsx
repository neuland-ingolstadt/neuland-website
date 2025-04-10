import { PostCard } from '@/components/blog/PostCard'
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
import { getPosts, getTags } from '../../get-posts'

export async function generateMetadata(props: { params: { tag: string } }) {
	return {
		title: `Posts Tagged with "${decodeURIComponent(props.params.tag)}"`
	}
}

export async function generateStaticParams() {
	const allTags = await getTags()
	return [...new Set(allTags)].map((tag) => ({ tag }))
}

// Update the component's type definition to match Next.js App Router expectations
interface TagPageProps {
	params: {
		tag: string
	}
	searchParams?: {
		[key: string]: string | string[] | undefined
	}
}

export default async function TagPage({
	params,
	searchParams = {}
}: TagPageProps) {
	const posts = await getPosts()
	const decodedTag = decodeURIComponent(params.tag)

	const taggedPosts = posts.filter((post) =>
		post.frontMatter.tags.includes(decodedTag)
	)

	const page = Number(searchParams.page || '1')
	const postsPerPage = 12
	const totalPages = Math.ceil(taggedPosts.length / postsPerPage)
	const startIndex = (page - 1) * postsPerPage
	const endIndex = startIndex + postsPerPage
	const paginatedPosts = taggedPosts.slice(startIndex, endIndex)

	const generatePaginationItems = () => {
		const items = []
		for (let i = 1; i <= totalPages; i++) {
			items.push(i)
		}
		return items
	}

	const paginationItems = generatePaginationItems()

	return (
		<>
			<Breadcrumb className="-ml-[1.625em] no-underlin">
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
							Tag: {decodedTag}
						</BreadcrumbLink>
					</BreadcrumbItem>
				</BreadcrumbList>
			</Breadcrumb>

			<div className="mb-12">
				<h1 className="text-3xl font-bold mb-2">#{decodedTag}</h1>
				<p>Posts tagged with "{decodedTag}"</p>
			</div>

			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
				{paginatedPosts.map((post) => (
					<PostCard key={post.route} post={post} />
				))}
			</div>

			{totalPages > 1 && (
				<Pagination className="mt-12">
					<PaginationContent>
						{page > 1 && (
							<PaginationItem>
								<PaginationPrevious
									href={`/blog/tags/${params.tag}?page=${page - 1}`}
								/>
							</PaginationItem>
						)}

						{paginationItems.map((item) => (
							<PaginationItem key={`page-${item}`}>
								<PaginationLink
									href={`/blog/tags/${params.tag}?page=${item}`}
									isActive={page === item}
								>
									{item}
								</PaginationLink>
							</PaginationItem>
						))}

						{page < totalPages && (
							<PaginationItem>
								<PaginationNext
									href={`/blog/tags/${params.tag}?page=${page + 1}`}
								/>
							</PaginationItem>
						)}
					</PaginationContent>
				</Pagination>
			)}
		</>
	)
}
