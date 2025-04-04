const axios = require('axios')
const fs = require('node:fs')
const path = require('node:path')

const CONTENT_SOURCES = [
	{
		url: 'https://pad.informatik.sexy/jEf0CAYVRim-4zjgJ7gaBQ/download',
		outputPath: path.join(__dirname, '../src/static/content/datenschutz.md')
	},
	{
		url: 'https://pad.informatik.sexy/Satzung/download',
		outputPath: path.join(__dirname, '../src/static/content/satzung.md')
	},
	{
		url: 'https://pad.informatik.sexy/s/Datenschutzordnung/download',
		outputPath: path.join(
			__dirname,
			'../src/static/content/datenschutzordnung.md'
		)
	},
	{
		url: 'https://pad.informatik.sexy/s/Datenschutzhinweise/download',
		outputPath: path.join(
			__dirname,
			'../src/static/content/datenschutzhinweise.md'
		)
	}
]

async function fetchAndSaveContent() {
	try {
		for (const source of CONTENT_SOURCES) {
			console.log(`Fetching content from ${source.url}...`)
			const response = await axios.get(source.url)
			const content = response.data

			// Ensure directory exists
			const dir = path.dirname(source.outputPath)
			if (!fs.existsSync(dir)) {
				fs.mkdirSync(dir, { recursive: true })
			}

			// Write content to file
			fs.writeFileSync(source.outputPath, content)
			console.log(`Content saved to ${source.outputPath}`)
		}

		console.log('All content fetched and saved successfully.')
	} catch (error) {
		console.error('Error fetching content:', error)
		process.exit(1)
	}
}

fetchAndSaveContent()
