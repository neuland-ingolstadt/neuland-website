import 'server-only'

import { cache } from 'react'

import { evaluateBooleanFlag } from './openfeature'

export const isPrideThemeEnabled = cache(async () =>
	evaluateBooleanFlag('pride-theme')
)
