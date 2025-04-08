import { PostCard } from '@/components/blog/PostCard'
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbSeparator
} from '@/components/ui/breadcrumb'
import Link from 'next/link'
import { getPosts, getTags } from '../../get-posts'

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export async function generateMetadata(props: { params: any }) {
	const params = await props.params
	return {
		title: `Posts Tagged with "${decodeURIComponent(params.tag)}"`
	}
}

export async function generateStaticParams() {
	const allTags = await getTags()
	return [...new Set(allTags)].map((tag) => ({ tag }))
}

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export default async function TagPage(props: { params: any }) {
	const params = await props.params
	const posts = await getPosts()
	const decodedTag = decodeURIComponent(params.tag)

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

			<div className="mb-8">
				<h1 className="text-3xl font-bold mb-2">#{decodedTag}</h1>
				<p>Posts tagged with "{decodedTag}"</p>
			</div>

			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
				{posts
					.filter((post) => post.frontMatter.tags.includes(decodedTag))
					.map((post) => (
						<PostCard key={post.route} post={post} />
					))}
			</div>
		</>
	)
}
