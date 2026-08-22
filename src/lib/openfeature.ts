import { FliptProvider } from '@openfeature/flipt-provider'
import { OpenFeature } from '@openfeature/server-sdk'

const namespace = process.env.FLIPT_NAMESPACE ?? 'neuland-website'

let providerReady: Promise<void> | undefined

async function ensureProvider() {
	const url = process.env.FLIPT_URL
	if (!url) {
		return false
	}

	if (!providerReady) {
		const token = process.env.FLIPT_CLIENT_TOKEN

		const provider = new FliptProvider(namespace, {
			url,
			headers: token ? { Authorization: `Bearer ${token}` } : undefined
		})

		providerReady = OpenFeature.setProviderAndWait(provider)
	}

	await providerReady
	return true
}

export async function evaluateBooleanFlag(
	flagKey: string,
	entityId = 'anonymous',
	defaultValue = false
): Promise<boolean> {
	try {
		const ready = await ensureProvider()
		if (!ready) {
			return defaultValue
		}

		const client = OpenFeature.getClient()

		return await client.getBooleanValue(flagKey, defaultValue, {
			targetingKey: entityId
		})
	} catch (error) {
		console.error(`Failed to evaluate Flipt flag "${flagKey}":`, error)
		return defaultValue
	}
}
