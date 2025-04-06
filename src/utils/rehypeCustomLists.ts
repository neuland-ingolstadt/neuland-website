import type { Element, ElementContent } from 'hast'
import type { Plugin } from 'unified'
import { visit } from 'unist-util-visit'

const rehypeCustomLists: Plugin = () => {
	return (tree) => {
		visit(tree, 'element', (node: Element) => {
			if (node.tagName === 'ol') {
				let hasAlphabeticItems = false

				node.children.forEach((child: ElementContent) => {
					// Check if the child is an Element node with tagName 'li'
					if ('tagName' in child && child.tagName === 'li') {
						const firstChild = child.children[0]

						if (
							firstChild?.type === 'text' &&
							/^\s*[a-z]\)/.test(firstChild.value)
						) {
							hasAlphabeticItems = true

							firstChild.value = firstChild.value.replace(/^\s*[a-z]\)\s*/, '')
						}
					}
				})

				if (hasAlphabeticItems) {
					node.properties = node.properties || {}
					node.properties.style = 'list-style-type: lower-alpha;'
					node.properties.className = node.properties.className || []

					if (typeof node.properties.className === 'string') {
						node.properties.className = [node.properties.className]
					}
					;(node.properties.className as string[]).push('alphabetic-list')
				}
			}
		})
	}
}

export default rehypeCustomLists
