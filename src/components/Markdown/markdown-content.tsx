'use client'
import type React from 'react'
import { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import rehypeFormat from 'rehype-format'
import rehypeStringify from 'rehype-stringify'
import remarkGfm from 'remark-gfm'
import { parseMarkdownSections } from '@/utils/markdownParser'
import rehypeCustomLists from '@/utils/rehypeCustomLists'
import TerminalSection from '../Layout/terminal-section'
import type { TocItem } from '../types/TocTypes'
import TocButton from './toc-button'
import TocModal from './toc-modal'

export interface MarkdownDocument {
	content: string
	title?: string
}

interface MarkdownContentProps {
	content: string | MarkdownDocument[]
	showToc?: boolean
}

const MarkdownContent: React.FC<MarkdownContentProps> = ({
	content,
	showToc = false
}) => {
	const [isTocModalOpen, setIsTocModalOpen] = useState(false)

	// Convert single content to array format for unified processing
	const contentArray: MarkdownDocument[] = Array.isArray(content)
		? content
		: [{ content }]

	// Process all markdown documents
	const allSections = contentArray.flatMap((doc, docIndex) => {
		const sections = parseMarkdownSections(doc.content)
		// Add document index to section IDs to avoid conflicts
		return sections.map((section) => ({
			...section,
			docIndex,
			docTitle: doc.title
		}))
	})

	// Generate TOC items for all documents
	const tocItems: TocItem[] = []

	// Process header sections first
	contentArray.forEach((doc, docIndex) => {
		const sections = parseMarkdownSections(doc.content)
		const headerSection = sections.find((s) => s.title === 'header')

		if (headerSection) {
			const h1Matches = headerSection.content.match(/^# (.+)$/m)
			if (h1Matches?.[1]) {
				const title = h1Matches[1].trim()
				const id = `doc-${docIndex}-${title
					.toLowerCase()
					.replace(/\s+/g, '-')
					.replace(/[^a-z0-9-]/g, '')}`

				tocItems.push({
					title: doc.title ? `${doc.title}: ${title}` : title,
					id,
					level: 1,
					docIndex
				})
			}
		}
	})

	// Process regular sections
	allSections
		.filter((section) => section.title !== 'header')
		.forEach((section) => {
			const id = `doc-${section.docIndex}-${section.title
				.toLowerCase()
				.replace(/\s+/g, '-')
				.replace(/[^a-z0-9-]/g, '')}`

			let level = 2
			if (section.headingLevel) {
				level = section.headingLevel
			}

			const title = section.docTitle
				? `${section.docTitle}: ${section.title}`
				: section.title

			tocItems.push({
				title,
				id,
				level,
				docIndex: section.docIndex
			})
		})

	const renderContent = (content: string, docIndex: number) => (
		<ReactMarkdown
			remarkPlugins={[remarkGfm]}
			// biome-ignore lint/suspicious/noExplicitAny: no problem
			rehypePlugins={[rehypeStringify as any, rehypeFormat, rehypeCustomLists]}
			components={{
				h1: ({ children }) => {
					const id =
						typeof children === 'string'
							? `doc-${docIndex}-${children
									.toString()
									.toLowerCase()
									.replace(/\s+/g, '-')
									.replace(/[^a-z0-9-]/g, '')}`
							: undefined

					return (
						<h1 className="text-3xl font-bold mb-8 text-terminal-cyan" id={id}>
							{children}
						</h1>
					)
				},
				h2: ({ children }) => {
					const id =
						typeof children === 'string'
							? `doc-${docIndex}-${children
									.toString()
									.toLowerCase()
									.replace(/\s+/g, '-')
									.replace(/[^a-z0-9-]/g, '')}`
							: undefined

					return (
						<h2 className="text-2xl font-bold mb-6 text-terminal-cyan" id={id}>
							{children}
						</h2>
					)
				},
				h3: ({ children }) => {
					const id =
						typeof children === 'string'
							? `doc-${docIndex}-${children
									.toString()
									.toLowerCase()
									.replace(/\s+/g, '-')
									.replace(/[^a-z0-9-]/g, '')}`
							: undefined

					return (
						<h3
							className="text-xl font-semibold mb-6 text-terminal-cyan"
							id={id}
						>
							{children}
						</h3>
					)
				},
				ol: ({
					node,
					children,
					depth,
					...props
				}: React.ComponentProps<'ol'> & {
					node?: {
						properties?: {
							className?: string | string[]
						}
					}
					depth?: number
				}) => {
					const currentDepth = depth || 0
					const isAlphabetic =
						node?.properties?.className &&
						(Array.isArray(node.properties.className)
							? node.properties.className.includes('alphabetic-list')
							: node.properties.className === 'alphabetic-list')

					let listClass = 'pl-6 mb-6 '

					if (isAlphabetic) {
						listClass += 'list-[lower-latin]'
					} else if (currentDepth === 0) {
						listClass += 'list-decimal'
					} else {
						listClass += 'list-[lower-latin] mt-2'
					}

					return (
						<ol className={listClass} {...props}>
							{children}
						</ol>
					)
				},
				ul: ({ children }) => {
					return <ul className="pl-6 mb-6 list-disc">{children}</ul>
				},
				li: ({ children }) => {
					return <li className="mt-1">{children}</li>
				},
				p: ({ children }) => <p className="mb-6">{children}</p>,
				table: ({ children }) => (
					<div className="overflow-x-auto">
						<table className="min-w-[50%] mb-6 border-collapse border border-terminal-window-border">
							{children}
						</table>
					</div>
				),
				thead: ({ children }) => (
					<thead className="bg-terminal-window text-terminal-cyan">
						{children}
					</thead>
				),
				tbody: ({ children }) => (
					<tbody className="bg-terminal-bg">{children}</tbody>
				),
				tr: ({ children }) => (
					<tr className="border-b border-terminal-window-border">{children}</tr>
				),
				th: ({ children }) => (
					<th className="border border-terminal-window-border px-4 py-2 text-left font-mono">
						{children}
					</th>
				),
				td: ({ children }) => (
					<td className="border border-terminal-window-border px-4 py-2 font-mono">
						{children}
					</td>
				)
			}}
		>
			{content}
		</ReactMarkdown>
	)

	return (
		<>
			{showToc && tocItems.length > 0 && (
				<>
					<TocButton onClick={() => setIsTocModalOpen(true)} />
					<TocModal
						sections={tocItems}
						isOpen={isTocModalOpen}
						onClose={() => setIsTocModalOpen(false)}
					/>
				</>
			)}

			{contentArray.map((doc, docIndex) => {
				const docSections = parseMarkdownSections(doc.content)
				const headerSection = docSections.find((s) => s.title === 'header')

				return (
					<div key={`doc-${docIndex}`} className="mb-12">
						{doc.title && (
							<h1 className="text-4xl font-bold mb-8 text-terminal-yellow">
								{doc.title}
							</h1>
						)}

						{headerSection && (
							<div className="mb-4">
								{renderContent(headerSection.content, docIndex)}
							</div>
						)}

						{docSections
							.filter((section) => section.title !== 'header')
							.map((section) => {
								const sectionId = `doc-${docIndex}-${section.title
									.toLowerCase()
									.replace(/\s+/g, '-')
									.replace(/[^a-z0-9-]/g, '')}`

								return (
									<div
										id={sectionId}
										key={`${docIndex}-${section.title}`}
										className="text-terminal-text"
									>
										<TerminalSection
											title={section.title}
											headingLevel={section.headingLevel || 3}
											classNames="mb-8"
											showPrefix={false}
										>
											{renderContent(section.content, docIndex)}
										</TerminalSection>
									</div>
								)
							})}
					</div>
				)
			})}
		</>
	)
}

export default MarkdownContent
