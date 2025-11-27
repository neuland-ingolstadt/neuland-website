import { allPosts } from 'contentlayer/generated'
import { format, parseISO } from 'date-fns'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import TerminalButton from '@/components/terminal-button'
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbSeparator
} from '@/components/ui/breadcrumb'

type Author = {
	name: string
	link?: string
}

export const generateStaticParams = async () =>
	allPosts.map((post) => ({ slug: post._raw.flattenedPath }))

export const generateMetadata = async ({
	params
}: {
	params: { slug: string }
}) => {
	const { slug } = await params

	const post = allPosts.find((post) => post._raw.flattenedPath === slug)
	if (!post) throw new Error(`Post not found for slug: ${slug}`)
	return { title: post.title }
}

const PostLayout = async ({ params }: { params: { slug: string } }) => {
	const { slug } = await params

	const post = allPosts.find((post) => post._raw.flattenedPath === slug)
	if (!post) throw new Error(`Post not found for slug: ${slug}`)

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
							{post.title.length > 24
								? `${post.title.slice(0, 24)}...`
								: post.title}
						</BreadcrumbLink>
					</BreadcrumbItem>
				</BreadcrumbList>
			</Breadcrumb>
			<article className="mt-4 mb-8 ">
				<div className="pb-6 border-b border-terminal-window-border mb-6">
					<time
						dateTime={post.date}
						className="mb-1 text-xs text-terminal-text/70"
					>
						{format(parseISO(post.date), 'LLLL d, yyyy')}
					</time>

					<h1 className="text-3xl font-bold text-terminal-text">
						{post.title}
					</h1>
					{post.authors && post.authors.length > 0 && (
						<div className="mt-2 text-sm text-terminal-text/80">
							Von{' '}
							{post.authors.map((author, index) => {
								// Support both string and object format for backward compatibility
								const isString = typeof author === 'string'
								const authorName = isString ? author : (author as Author).name
								const authorLink = isString ? null : (author as Author).link

								return (
									<span key={index}>
										{authorLink ? (
											<Link
												href={authorLink}
												className="text-terminal-cyan hover:text-terminal-cyan/80 transition-colors no-underline"
												target="_blank"
												rel="noopener noreferrer"
											>
												{authorName}
											</Link>
										) : (
											authorName
										)}
										{index < post.authors.length - 1 && ', '}
									</span>
								)
							})}
						</div>
					)}

					{post.tags && post.tags.length > 0 && (
						<div className="mt-4 flex flex-wrap gap-2">
							{post.tags.map((tag) => (
								<Link
									key={tag}
									href={`/blog/tags/${encodeURIComponent(tag.toLowerCase())}`}
									className="no-underline group/tag"
								>
									<span className="inline-block text-xs px-2.5 py-1 bg-terminal-card text-terminal-text/70 font-medium border border-terminal-window-border group-hover/tag:border-terminal-highlight/40 group-hover/tag:text-terminal-text transition-colors duration-200">
										{tag}
									</span>
								</Link>
							))}
						</div>
					)}
				</div>
				<div
					className="[&>*]:mb-3 [&>*:last-child]:mb-0 prose-img:max-w-full [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:list-decimal [&_ol]:pl-6 [&_li]:mb-2"
					// biome-ignore lint/security/noDangerouslySetInnerHtml: no problem
					dangerouslySetInnerHTML={{ __html: post.body.html }}
				/>
			</article>

			<div className="pt-6 pb-6 flex justify-end">
				<TerminalButton href="/blog" className="group">
					<div className="flex items-center gap-2 no-underline">
						<ArrowLeft
							size={16}
							className="group-hover:-translate-x-1 transition-transform"
						/>
						<span>Alle Posts</span>
					</div>
				</TerminalButton>
			</div>
		</div>
	)
}

export default PostLayout
