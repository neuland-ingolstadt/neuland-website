import { createFileRoute, notFound } from '@tanstack/react-router'
import { allPosts } from 'contentlayer/generated'
import { format, parseISO } from 'date-fns'
import { ArrowLeft } from 'lucide-react'
import TerminalButton from '@/components/terminal-button'
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbSeparator
} from '@/components/ui/breadcrumb'
import { Link } from '@/i18n/navigation'
import { useTranslations } from '@/i18n/react'

type Author = {
	name: string
	link?: string
}

export const Route = createFileRoute('/$locale/blog/$slug')({
	loader: async ({ params }) => {
		const post = allPosts.find(
			(candidate) => candidate._raw.flattenedPath === params.slug
		)
		if (!post) {
			throw notFound()
		}
		return { post }
	},
	head: ({ loaderData }) => ({
		meta: [{ title: loaderData?.post.title ?? 'Neuland Blog' }]
	}),
	component: PostPage
})

function PostPage() {
	const { post } = Route.useLoaderData()
	const t = useTranslations('Blog')

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
							{post.title.length > 24
								? `${post.title.slice(0, 24)}...`
								: post.title}
						</BreadcrumbLink>
					</BreadcrumbItem>
				</BreadcrumbList>
			</Breadcrumb>
			<article className="mt-4 mb-8 ">
				<div className="mb-6 border-b border-terminal-window-border pb-6">
					<time
						dateTime={post.date}
						className="text-terminal-text/70 mb-1 text-xs"
					>
						{format(parseISO(post.date), 'LLLL d, yyyy')}
					</time>

					<h1 className="text-terminal-text text-3xl font-bold">
						{post.title}
					</h1>
					{post.authors && post.authors.length > 0 && (
						<div className="text-terminal-text/80 mt-2 text-sm">
							{t('by')}{' '}
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
												className="text-terminal-cyan hover:text-terminal-cyan/80 no-underline transition-colors"
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
									className="group/tag no-underline"
								>
									<span className="bg-terminal-card text-terminal-text/70 group-hover/tag:border-terminal-highlight/40 group-hover/tag:text-terminal-text inline-block border border-terminal-window-border px-2.5 py-1 text-xs font-medium transition-colors duration-200">
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

			<div className="flex justify-end pt-6 pb-6">
				<TerminalButton href="/blog" className="group">
					<div className="no-underline flex items-center gap-2">
						<ArrowLeft
							size={16}
							className="transition-transform group-hover:-translate-x-1"
						/>
						<span>{t('allPosts')}</span>
					</div>
				</TerminalButton>
			</div>
		</div>
	)
}
