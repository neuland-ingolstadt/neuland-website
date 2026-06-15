import 'server-only'

import { FliptProvider } from '@openfeature/flipt-provider'
import { OpenFeature } from '@openfeature/server-sdk'

const namespace = process.env.FLIPT_NAMESPACE ?? 'neuland-website'

let providerReady: Promise<void> | undefined

async function ensureProvider() {
	if (!providerReady) {
		const url = process.env.FLIPT_URL ?? 'http://localhost:8080'
		const token = process.env.FLIPT_CLIENT_TOKEN

		const provider = new FliptProvider(namespace, {
			url,
			headers: token ? { Authorization: `Bearer ${token}` } : undefined
		})

		providerReady = OpenFeature.setProviderAndWait(provider)
	}

	await providerReady
}

export async function evaluateBooleanFlag(
	flagKey: string,
	entityId = 'anonymous',
	defaultValue = false
): Promise<boolean> {
	try {
		await ensureProvider()
		const client = OpenFeature.getClient()

		return await client.getBooleanValue(flagKey, defaultValue, {
			targetingKey: entityId
		})
	} catch (error) {
		console.error(`Failed to evaluate Flipt flag "${flagKey}":`, error)
		return defaultValue
	}
}
