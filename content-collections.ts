import { defineCollection, defineConfig } from '@content-collections/core'
import { compileMarkdown } from '@content-collections/markdown'
import type { Root } from 'hast'
import { imageSizeFromFile } from 'image-size/fromFile'
import path from 'node:path'
import rehypeExternalLinks from 'rehype-external-links'
import rehypePrettyCode from 'rehype-pretty-code'
import remarkGfm from 'remark-gfm'
import type { Plugin } from 'unified'
import { visit } from 'unist-util-visit'
import { z } from 'zod'

const authorSchema = z.union([
	z.string(),
	z.object({
		name: z.string(),
		link: z.string().optional()
	})
])

const absolutePathRegex = /^(?:[a-z]+:)?\/\//

/** Set width/height on local images; ignore unreadable files (e.g. Git LFS pointers). */
const rehypeImgSizeSafe: Plugin<[{ dir?: string }], Root> = (options) => {
	const dir = options?.dir
	return async (tree) => {
		const jobs: Promise<void>[] = []

		visit(tree, 'element', (node) => {
			if (node.tagName !== 'img' || typeof node.properties?.src !== 'string') {
				return
			}

			let src = node.properties.src
			if (absolutePathRegex.exec(src)) {
				return
			}

			const shouldJoin = !path.isAbsolute(src) || src.startsWith('/')
			if (dir && shouldJoin) {
				src = path.join(dir, src)
			}

			jobs.push(
				imageSizeFromFile(src)
					.then((dimensions) => {
						if (dimensions.width) {
							node.properties.width = dimensions.width
						}
						if (dimensions.height) {
							node.properties.height = dimensions.height
						}
					})
					.catch(() => {
						// Skip broken or missing images (e.g. unresolved Git LFS pointers).
					})
			)
		})

		await Promise.all(jobs)
	}
}

const posts = defineCollection({
	name: 'posts',
	directory: 'posts',
	include: '**/*.md',
	schema: z.object({
		title: z.string(),
		authors: z.array(authorSchema),
		description: z.string().optional(),
		date: z.string(),
		tags: z.array(z.string()).default([]),
		content: z.string()
	}),
	transform: async (document, context) => {
		const html = await compileMarkdown(context, document, {
			remarkPlugins: [[remarkGfm, { passThrough: ['link'] }]],
			rehypePlugins: [
				[
					// biome-ignore lint/suspicious/noExplicitAny: rehype plugin typing mismatch
					rehypePrettyCode as any,
					{
						theme: 'github-dark',
						keepBackground: false,
						defaultLang: 'plaintext'
					}
				],
				[rehypeImgSizeSafe, { dir: 'public' }],
				[rehypeExternalLinks, { target: '_blank', rel: 'noopener' }]
			]
		})

		return {
			...document,
			url: `/blog/${document._meta.path}`,
			html
		}
	}
})

export default defineConfig({
	content: [posts]
})
