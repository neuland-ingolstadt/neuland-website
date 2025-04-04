import fs from 'node:fs'
import path from 'node:path'
import axios from 'axios'

/**
 * Fetches content from a URL and saves it to a static file during build
 * @param url URL to fetch content from
 * @param outputPath Path to save the content to
 */
export async function fetchAndSaveStaticContent(
	url: string,
	outputPath: string
): Promise<void> {
	try {
		console.log(`Fetching content from ${url}...`)
		const response = await axios.get(url)
		const content = response.data

		// Ensure directory exists
		const dir = path.dirname(outputPath)
		if (!fs.existsSync(dir)) {
			fs.mkdirSync(dir, { recursive: true })
		}

		// Write content to file
		fs.writeFileSync(
			outputPath,
			typeof content === 'string' ? content : JSON.stringify(content)
		)
		console.log(`Content saved to ${outputPath}`)
	} catch (error) {
		console.error(`Error fetching content from ${url}:`, error)
		throw error
	}
}

/**
 * Import static content at build time
 * @param filePath Path to the static file
 */
export function importStaticContent(filePath: string) {
	return import.meta.glob('/src/static/**/*', { as: 'raw', eager: true })[
		filePath
	]
}
