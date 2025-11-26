'use client'
import type React from 'react'
import { createContext, useContext, useEffect, useState } from 'react'

export type BackgroundType = 'simple' | 'gameOfLife'

interface BackgroundContextType {
	backgroundType: BackgroundType
	setBackgroundType: (type: BackgroundType) => void
	toggleBackgroundType: () => void
	crossesRotationToken: number
	triggerCrossesRotation: () => void
}

const BackgroundContext = createContext<BackgroundContextType | undefined>(
	undefined
)

export const BackgroundProvider: React.FC<{ children: React.ReactNode }> = ({
	children
}) => {
	const [backgroundType, setBackgroundTypeState] =
		useState<BackgroundType>('simple')
	const [crossesRotationToken, setCrossesRotationToken] = useState(0)

	useEffect(() => {
		const savedType = localStorage.getItem(
			'backgroundType'
		) as BackgroundType | null
		if (savedType && (savedType === 'simple' || savedType === 'gameOfLife')) {
			setBackgroundTypeState(savedType)
		}
	}, [])

	const setBackgroundType = (type: BackgroundType) => {
		setBackgroundTypeState(type)
		localStorage.setItem('backgroundType', type)
	}

	const toggleBackgroundType = () => {
		setBackgroundTypeState((prev) => {
			const newType = prev === 'simple' ? 'gameOfLife' : 'simple'
			localStorage.setItem('backgroundType', newType)
			return newType
		})
	}

	const triggerCrossesRotation = () => {
		setCrossesRotationToken((prev) => prev + 1)
	}

	return (
		<BackgroundContext.Provider
			value={{
				backgroundType,
				setBackgroundType,
				toggleBackgroundType,
				crossesRotationToken,
				triggerCrossesRotation
			}}
		>
			{children}
		</BackgroundContext.Provider>
	)
}

export const useBackground = (): BackgroundContextType => {
	const context = useContext(BackgroundContext)
	if (context === undefined) {
		throw new Error('useBackground must be used within a BackgroundProvider')
	}
	return context
}
