import { Badge } from '@/components/ui/badge'
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbSeparator
} from '@/components/ui/breadcrumb'
import moment from 'moment'
import Link from 'next/link'
import { generateStaticParamsFor, importPage } from 'nextra/pages'
import './styles.css'

// Define proper Props type for our page components
export interface PageProps {
	params: Promise<{
		mdxPath: string[]
	}>
	searchParams?: Promise<Record<string, string | string[]>>
}

// Define metadata structure
interface PageMetadata {
	title?: string
	date?: string
	readingTime?: {
		text: string
		minutes: number
		time: number
		words: number
	}
	authors?: string[]
	tags?: string[]
}

export const generateStaticParams = generateStaticParamsFor('mdxPath')

export async function generateMetadata(props: PageProps) {
	const params = await props.params
	const { metadata } = await importPage(params.mdxPath)
	return metadata
}

export default async function Page(props: PageProps) {
	const params = await props.params
	const result = await importPage(params.mdxPath)
	const { default: MDXContent, metadata } = result as {
		default: React.ComponentType<PageProps>
		metadata: PageMetadata
	}

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
						<BreadcrumbLink asChild className="flex items-center">
							<Link href="/blog" className="flex items-center">
								Blog
							</Link>
						</BreadcrumbLink>
					</BreadcrumbItem>
					<BreadcrumbSeparator className="flex items-center mx-1" />
					<BreadcrumbItem className="flex items-center">
						<BreadcrumbLink className="flex items-center line-clamp-1">
							{metadata?.title || 'Article'}
						</BreadcrumbLink>
					</BreadcrumbItem>
				</BreadcrumbList>
			</Breadcrumb>

			<div className="article-header mb-8 border-b border-terminal-window-border pb-6">
				{metadata?.title && (
					<h1 className="text-3xl font-bold mb-4">{metadata.title}</h1>
				)}

				<div className="flex flex-wrap items-center gap-4 text-sm text-terminal-text-muted mb-4">
					{metadata?.date && (
						<time dateTime={metadata.date} className="font-mono">
							{moment(metadata.date).format('DD.MM.YYYY')}
						</time>
					)}

					{metadata?.readingTime && (
						<span className="font-mono">{metadata.readingTime.text}</span>
					)}

					{metadata?.authors && metadata.authors.length > 0 && (
						<div className="flex items-center">
							<span className="mr-1">By</span>
							{metadata.authors.map((author: string, idx: number) => (
								<span key={author} className="font-medium">
									{author}
									{idx < (metadata.authors?.length ?? 0) - 1 ? ', ' : ''}
								</span>
							))}
						</div>
					)}
				</div>

				{metadata?.tags && metadata.tags.length > 0 && (
					<div className="flex flex-wrap gap-2">
						{metadata.tags.map((tag: string) => (
							<Link
								href={`/blog/tags/${encodeURIComponent(tag)}`}
								key={tag}
								className="no-underline"
							>
								<Badge
									variant="outline"
									className="cursor-pointer hover:bg-terminal-window-border "
								>
									#{tag}
								</Badge>
							</Link>
						))}
					</div>
				)}
			</div>

			<MDXContent {...props} />
		</>
	)
}
