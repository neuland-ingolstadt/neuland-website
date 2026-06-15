import 'server-only'

import { FliptClient } from '@flipt-io/flipt'

const namespace = process.env.FLIPT_NAMESPACE ?? 'neuland-website'
const environment = process.env.FLIPT_ENVIRONMENT ?? 'production'

function getFliptClient() {
	const url = process.env.FLIPT_URL ?? 'http://localhost:8080'
	const token = process.env.FLIPT_CLIENT_TOKEN

	return new FliptClient({
		url,
		headers: {
			...(token ? { Authorization: `Bearer ${token}` } : {}),
			'X-Flipt-Environment': environment
		}
	})
}

export async function evaluateBooleanFlag(
	flagKey: string,
	entityId = 'anonymous'
): Promise<boolean> {
	try {
		const result = await getFliptClient().evaluation.boolean({
			namespaceKey: namespace,
			flagKey,
			entityId,
			context: {}
		})

		return result.enabled
	} catch (error) {
		console.error(`Failed to evaluate Flipt flag "${flagKey}":`, error)
		return false
	}
}
