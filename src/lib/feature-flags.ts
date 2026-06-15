import 'server-only'

import { cache } from 'react'

import { evaluateBooleanFlag } from './flipt'

export const isPrideThemeEnabled = cache(async () =>
	evaluateBooleanFlag('pride-theme')
)
