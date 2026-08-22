import { createServerFn } from '@tanstack/react-start'
import {
	fetchMultipleOutlineDocuments,
	fetchOutlineDocument,
	OUTLINE_IDS
} from '@/lib/outline-api'

export const getOutlineDocument = createServerFn()
	.validator((id: string) => id)
	.handler(({ data }) => fetchOutlineDocument(data))

export const getMultipleOutlineDocuments = createServerFn()
	.validator((ids: string[]) => ids)
	.handler(({ data }) => fetchMultipleOutlineDocuments(data))

export { OUTLINE_IDS }
