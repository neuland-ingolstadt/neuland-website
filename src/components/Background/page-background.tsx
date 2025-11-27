'use client'
import type React from 'react'
import { useBackground } from '@/contexts/BackgroundContext'
import AmbientBackground from './ambient-background'
import GameOfLife from './game-of-life'

const MatrixEffect: React.FC = () => {
	const { backgroundType } = useBackground()

	return (
		<div className="pointer-events-none fixed top-0 left-0 right-0 bottom-0 overflow-hidden z-0">
			{backgroundType === 'gameOfLife' ? <GameOfLife /> : <AmbientBackground />}
		</div>
	)
}

export default MatrixEffect
