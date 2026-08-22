import { evaluateBooleanFlag } from './openfeature'

export const isPrideThemeEnabled = () => evaluateBooleanFlag('pride-theme')
