import positionsData from '@/data/positions.json'
import type { Locale } from '@/i18n/react'

export const DISCORD_URL = 'https://discord.gg/gsxgQqvVue'

export const positionTeams = [
	'development',
	'design',
	'events',
	'hr',
	'management',
	'marketing',
	'cybersecurity',
	'sponsoring',
	'board'
] as const
export type PositionTeam = (typeof positionTeams)[number]

export type PositionStatus = 'open' | 'filled'
export type PositionFormat = 'remote' | 'onsite' | 'hybrid'
/** Working language of the role */
export type PositionLanguage = 'de' | 'en' | 'both'

export interface LocalizedText {
	de: string
	en: string
}

export interface LocalizedList {
	de: string[]
	en: string[]
}

export interface Position {
	/** URL slug */
	id: string
	/** Human-readable, unique reference, e.g. NL-ENG-001 */
	jobId: string
	team: PositionTeam
	status: PositionStatus
	postedAt: string
	format: PositionFormat
	language: PositionLanguage
	hoursPerWeek: { min: number; max: number }
	projectId?: string
	contact: { name: string; role: string }
	title: LocalizedText
	shortDescription: LocalizedText
	tasks: LocalizedList
	requirements: LocalizedList
	niceToHave: LocalizedList
	benefits: LocalizedList
}

export const positions = positionsData as Position[]

export const localize = (value: LocalizedText, locale: Locale): string =>
	value[locale] ?? value.de

export const localizeList = (value: LocalizedList, locale: Locale): string[] =>
	value[locale] ?? value.de

export const getPosition = (id: string): Position | undefined =>
	positions.find((position) => position.id === id)

const statusOrder: Record<PositionStatus, number> = {
	open: 0,
	filled: 1
}

/** Open positions first, then newest first */
export const sortPositions = (list: Position[]): Position[] =>
	[...list].sort(
		(a, b) =>
			statusOrder[a.status] - statusOrder[b.status] ||
			b.postedAt.localeCompare(a.postedAt)
	)

export const filterPositions = (
	list: Position[],
	filters: { team: PositionTeam | null }
): Position[] =>
	sortPositions(
		list.filter(
			(position) =>
				(!filters.team || position.team === filters.team) &&
				position.status !== 'filled'
		)
	)
