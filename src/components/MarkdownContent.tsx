import { parseMarkdownSections } from '@/utils/markdownParser'
import rehypeCustomLists from '@/utils/rehypeCustomLists'
import type React from 'react'
import { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import rehypeFormat from 'rehype-format'
import rehypeStringify from 'rehype-stringify'
import remarkGfm from 'remark-gfm'
import TerminalSection from './TerminalSection'
import TocButton from './TocButton'
import TocModal from './TocModal'
import type { TocItem } from './types/TocTypes'

interface MarkdownContentProps {
	content: string
	showToc?: boolean
}

const MarkdownContent: React.FC<MarkdownContentProps> = ({
	content,
	showToc = false
}) => {
	const [isTocModalOpen, setIsTocModalOpen] = useState(false)
	const sections = parseMarkdownSections(content)

	const headerTitles: TocItem[] = []
	const headerSection = sections.find((s) => s.title === 'header')

	if (headerSection) {
		const h1Matches = headerSection.content.match(/^# (.+)$/m)
		if (h1Matches?.[1]) {
			const title = h1Matches[1].trim()
			const id = title
				.toLowerCase()
				.replace(/\s+/g, '-')
				.replace(/[^a-z0-9-]/g, '')
			headerTitles.push({
				title,
				id,
				level: 1
			})
		}
	}

	const regularTocItems: TocItem[] = sections
		.filter((section) => section.title !== 'header')
		.map((section) => {
			const id = section.title
				.toLowerCase()
				.replace(/\s+/g, '-')
				.replace(/[^a-z0-9-]/g, '')

			let level = 2
			if (section.headingLevel) {
				level = section.headingLevel
			}

			return {
				title: section.title,
				id,
				level
			}
		})

	const tocItems: TocItem[] = [...headerTitles, ...regularTocItems]

	const renderContent = (content: string) => (
		<ReactMarkdown
			remarkPlugins={[remarkGfm]}
			rehypePlugins={[rehypeStringify, rehypeFormat, rehypeCustomLists]}
			components={{
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
				li: ({ children }) => {
					return <li className="mt-1">{children}</li>
				},
				p: ({ children }) => <p className="mb-6">{children}</p>,
				h1: ({ children }) => (
					<h1
						className="text-3xl font-bold mb-8 text-terminal-cyan"
						id={
							typeof children === 'string'
								? children
										.toString()
										.toLowerCase()
										.replace(/\s+/g, '-')
										.replace(/[^a-z0-9-]/g, '')
								: undefined
						}
					>
						{children}
					</h1>
				),
				h2: ({ children }) => (
					<h2
						className="text-2xl font-bold mb-6 text-terminal-cyan"
						id={
							typeof children === 'string'
								? children
										.toString()
										.toLowerCase()
										.replace(/\s+/g, '-')
										.replace(/[^a-z0-9-]/g, '')
								: undefined
						}
					>
						{children}
					</h2>
				),
				h3: ({ children }) => (
					<h3
						className="text-xl font-semibold mb-6 text-terminal-cyan"
						id={
							typeof children === 'string'
								? children
										.toString()
										.toLowerCase()
										.replace(/\s+/g, '-')
										.replace(/[^a-z0-9-]/g, '')
								: undefined
						}
					>
						{children}
					</h3>
				),
				table: ({ children }) => (
					<div className="overflow-x-auto">
						<table className="min-w-[50%] mb-6 border-collapse border border-terminal-windowBorder">
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
					<tr className="border-b border-terminal-windowBorder">{children}</tr>
				),
				th: ({ children }) => (
					<th className="border border-terminal-windowBorder px-4 py-2 text-left font-mono">
						{children}
					</th>
				),
				td: ({ children }) => (
					<td className="border border-terminal-windowBorder px-4 py-2 font-mono">
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

			{sections.some((s) => s.title === 'header') && (
				<div className="mb-4">
					{renderContent(
						sections.find((s) => s.title === 'header')?.content || ''
					)}
				</div>
			)}

			{sections
				.filter((section) => section.title !== 'header')
				.map((section) => {
					const sectionId = section.title
						.toLowerCase()
						.replace(/\s+/g, '-')
						.replace(/[^a-z0-9-]/g, '')
					return (
						<div
							id={sectionId}
							key={section.title}
							className="text-terminal-text"
						>
							<TerminalSection
								title={section.title}
								headingLevel={section.headingLevel || 3}
							>
								{renderContent(section.content)}
							</TerminalSection>
						</div>
					)
				})}
		</>
	)
}

export default MarkdownContent
