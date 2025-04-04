/**
 * API functions for fetching documents from the Hedgedoc instance
 */

export async function fetchDocument(url: string): Promise<string> {
	const response = await fetch(url)

	if (!response.ok) {
		throw new Error(`HTTP error! Status: ${response.status}`)
	}

	return response.text()
}
