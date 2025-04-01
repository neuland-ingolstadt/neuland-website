declare module '*.md' {
	const content: string
	export default content
}

// Also handle the specific path with the @ alias
declare module '@/data/markdown/imprint.md' {
	const content: string
	export default content
}
