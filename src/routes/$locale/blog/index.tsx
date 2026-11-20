import { createFileRoute } from '@tanstack/react-router'
import { allPosts } from 'content-collections'
import { compareDesc } from 'date-fns'
import { FileText, RssIcon, TagIcon } from 'lucide-react'
import { motion } from 'motion/react'
import { PostCard } from '@/components/blog/post-card'
import TerminalButton from '@/components/terminal-button'
import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious
} from '@/components/ui/pagination'
import { useRouter } from '@/i18n/navigation'
import { createTranslator, resolveLocale, useTranslations } from '@/i18n/react'

export const Route = createFileRoute('/$locale/blog/')({
	validateSearch: (search: Record<string, unknown>) => {
		const page = Number(search.page)
		return {
			page: Number.isFinite(page) && page > 0 ? page : undefined
		}
	},
	head: ({ params }) => {
		const t = createTranslator(resolveLocale(params.locale), 'Blog.metadata')
		return {
			meta: [
				{ title: t('title'), name: 'description', content: t('description') }
			]
		}
	},
	component: BlogPage
})

function BlogPage() {
	const posts = allPosts.sort((a, b) =>
		compareDesc(new Date(a.date), new Date(b.date))
	)

	const t = useTranslations('Blog')
	const search = Route.useSearch()
	const router = useRouter()

	const navigateToPage = (page: number) => {
		router.push(`/blog?page=${page}`)
	}

	// Pagination logic
	const POSTS_PER_PAGE = 12
	const currentPage = search.page || 1
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

	return (
		<div className="relative">
			<div
				aria-hidden="true"
				className="pointer-events-none absolute -top-[var(--navbar-height,4.5rem)] left-1/2 -z-10 h-[100vh] w-screen -translate-x-1/2"
				style={{
					backgroundImage:
						'radial-gradient(ellipse 60% 70% at 100% 0%, var(--backdrop-glow-a), transparent 70%)'
				}}
			/>
			{/* Header Section */}
			<motion.div
				initial={{ opacity: 0, y: -20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6 }}
				className="max-w-6xl mx-auto pt-8 mb-12 md:pt-16 md:mb-16"
			>
				<h1 className="mb-6 mt-0 font-mono text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl xl:text-7xl">
					{t('title')}
				</h1>

				<motion.p
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.6, delay: 0.2 }}
					className="mt-3 text-lg text-terminal-text/90 max-w-3xl"
				>
					{t('subtitle')}
				</motion.p>

				<motion.div
					initial={{ opacity: 0, y: 10 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, delay: 0.4 }}
					className="flex items-center gap-2 mt-4 text-sm text-terminal-text/80 font-mono"
				>
					<FileText size={16} />
					<span>{t('postsFound', { amountPosts: posts.length })}</span>
				</motion.div>

				<div className="mt-6 flex flex-wrap gap-3">
					<TerminalButton
						href="/feed"
						className="group no-underline flex items-center gap-2"
					>
						{t('rssFeed')}
						<RssIcon
							size={16}
							className="transition-transform duration-300 group-hover:scale-110"
						/>
					</TerminalButton>
					<TerminalButton
						href="/blog/tags"
						className="group no-underline flex items-center gap-2"
					>
						{t('allTags')}
						<TagIcon
							size={16}
							className="transition-transform duration-300 group-hover:rotate-16"
						/>
					</TerminalButton>
				</div>
			</motion.div>

			<div className="max-w-6xl mx-auto">
				<div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-10 lg:grid-cols-3">
					{paginatedPosts.map((post) => (
						<PostCard post={post} key={post.url} />
					))}
				</div>

				{totalPages > 1 && (
					<Pagination className="mt-12 md:mt-16">
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
			</div>
		</div>
	)
}
