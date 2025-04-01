interface Section {
	title: string
	content: string
	headingLevel?: number
}

export const parseMarkdownSections = (markdown: string): Section[] => {
	const sections: Section[] = []
	const lines = markdown.split('\n')
	let currentTitle = ''
	let currentHeadingLevel = 3
	let currentContent: string[] = []
	let inHeader = true
	const headerContent: string[] = []

	const formatListItems = (content: string): string => {
		const lines = content.split('\n')
		let inList = false

		for (let i = 0; i < lines.length; i++) {
			if (/^\d+\.\s/.test(lines[i])) {
				inList = true
			}

			if (inList && /^\s*[a-z]\)\s/.test(lines[i])) {
				lines[i] = lines[i].replace(/^(\s*)([a-z])\)\s+(.+)$/, '$1   - $2) $3')
			}

			if (
				inList &&
				lines[i].trim() === '' &&
				(i === lines.length - 1 || !/^\s*[a-z]\)\s/.test(lines[i + 1]))
			) {
				inList = false
			}
		}

		return lines.join('\n')
	}

	lines.forEach((line, index) => {
		if (line.startsWith('### ')) {
			inHeader = false

			if (currentTitle) {
				sections.push({
					title: currentTitle,
					content: formatListItems(currentContent.join('\n').trim()),
					headingLevel: currentHeadingLevel
				})
				currentContent = []
			}
			currentTitle = line.replace('### ', '').trim()
			currentHeadingLevel = 3
		} else if (line.startsWith('## ')) {
			inHeader = false

			if (currentTitle) {
				sections.push({
					title: currentTitle,
					content: formatListItems(currentContent.join('\n').trim()),
					headingLevel: currentHeadingLevel
				})
				currentContent = []
			}
			currentTitle = line.replace('## ', '').trim()
			currentHeadingLevel = 2
		} else if (line.startsWith('# ')) {
			if (inHeader) {
				headerContent.push(line)
			} else {
				if (currentTitle) {
					sections.push({
						title: currentTitle,
						content: formatListItems(currentContent.join('\n').trim()),
						headingLevel: currentHeadingLevel
					})
					currentContent = []
				}
				currentTitle = line.replace('# ', '').trim()
				currentHeadingLevel = 1
			}
		} else {
			if (inHeader && headerContent.length > 0) {
				headerContent.push(line)

				if (
					index === lines.length - 1 ||
					lines[index + 1].startsWith('### ') ||
					lines[index + 1].startsWith('## ') ||
					lines[index + 1].startsWith('# ')
				) {
					inHeader = false
					sections.push({
						title: 'header',
						content: formatListItems(headerContent.join('\n').trim()),
						headingLevel: 0
					})
				}
			} else {
				currentContent.push(line)
			}
		}
	})

	if (currentTitle) {
		sections.push({
			title: currentTitle,
			content: formatListItems(currentContent.join('\n').trim()),
			headingLevel: currentHeadingLevel
		})
	}

	return sections
}
