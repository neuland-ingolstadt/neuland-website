import { createServerFn } from '@tanstack/react-start'
import { evaluateBooleanFlag } from '@/lib/openfeature'

export const getPrideThemeEnabled = createServerFn().handler(async () =>
	evaluateBooleanFlag('pride-theme')
)
