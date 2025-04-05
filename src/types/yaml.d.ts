declare module '*.yml' {
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	const data: any
	export default data
}

declare module '*.yaml' {
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	const data: any
	export default data
}
