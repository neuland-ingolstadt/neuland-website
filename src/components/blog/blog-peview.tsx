'use client'

import { allPosts } from 'contentlayer/generated'
import { compareDesc } from 'date-fns'
import { motion } from 'framer-motion'
import { memo, useMemo } from 'react'
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious
} from '@/components/ui/carousel'
import TerminalButton from '../terminal-button'
import BlogPostCard from './blog-post-card'

const BlogPreview = () => {
	const posts = useMemo(
		() =>
			allPosts
				.sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)))
				.slice(0, 5),
		[]
	)

	const carouselOptions = useMemo(
		() => ({
			align: 'start' as const,
			loop: false
		}),
		[]
	)

	return (
		<div className="relative overflow-visible">
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				whileInView={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6 }}
				viewport={{ once: true }}
				className="mb-6"
			>
				<p className="text-sm opacity-80 mb-6 font-mono">
					$ blog --list | grep featured
				</p>
			</motion.div>

			<Carousel opts={carouselOptions} className="w-full overflow-visible">
				<CarouselContent className="-ml-4 overflow-visible">
					{posts.map((post, idx) => (
						<CarouselItem
							key={idx}
							className="pl-4 sm:basis-1/2 lg:basis-1/3 overflow-visible"
						>
							<BlogPostCard post={post} />
						</CarouselItem>
					))}
				</CarouselContent>
				<CarouselPrevious className="left-0" />
				<CarouselNext className="right-0" />
			</Carousel>

			<div className="mt-6 mb-8">
				<div className="flex justify-end items-center">
					<TerminalButton href="/blog">Alle Posts</TerminalButton>
				</div>
			</div>
		</div>
	)
}

export default memo(BlogPreview)
