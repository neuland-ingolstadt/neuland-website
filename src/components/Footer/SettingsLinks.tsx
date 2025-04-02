import { Switch } from '@/components/ui/switch'
import { useBackground } from '@/contexts/BackgroundContext'
import { AnimatePresence, motion } from 'framer-motion'
import type React from 'react'
import { useCallback, useEffect, useRef, useState } from 'react'

const SettingsLinks: React.FC = () => {
	const { backgroundType, toggleBackgroundType } = useBackground()
	const [lightTogglePosition, setLightTogglePosition] = useState({ x: 0, y: 0 })
	const [toggleAttempts, setToggleAttempts] = useState(0)
	const lightToggleRef = useRef<HTMLDivElement>(null)
	const containerRef = useRef<HTMLLIElement>(null)

	const handleLightToggleClick = useCallback(() => {
		if (toggleAttempts < 3) {
			setToggleAttempts(toggleAttempts + 1)
			const angle = Math.random() * Math.PI * 2
			const newX = Math.cos(angle) * 60
			const newY = Math.sin(angle) * 60
			setLightTogglePosition({ x: newX, y: newY })
		}
	}, [toggleAttempts])

	useEffect(() => {
		if (toggleAttempts >= 3) {
			const timer = setTimeout(() => {
				setToggleAttempts(0)
				setLightTogglePosition({ x: 0, y: 0 })
			}, 7000)
			return () => clearTimeout(timer)
		}
	}, [toggleAttempts])

	return (
		<nav>
			<ul>
				<li className="mb-2">
					<a
						href="https://github.com/neuland-ingolstadt/neuland-website"
						rel="noreferrer noopener"
						target="_blank"
						className="!text-terminal-text"
					>
						$ <span className="text-terminal-cyan">git clone</span>{' '}
						neuland-website
						<span className="ml-1 text-terminal-yellow">✨</span>
					</a>
				</li>
				<li className="mt-3 flex items-center">
					<span className="text-terminal-text mr-2">
						$ <span className="text-terminal-cyan">toggle</span> game of life
					</span>
					<Switch
						aria-label="Toggle Game of Life"
						checked={backgroundType === 'gameOfLife'}
						onCheckedChange={() => toggleBackgroundType()}
						className="ml-2"
					/>
				</li>
				<li className="mt-3 flex flex-col" ref={containerRef}>
					<div className="flex items-center">
						<span className="text-terminal-text mr-2">
							$ <span className="text-terminal-cyan">toggle</span> light mode
						</span>
						{toggleAttempts < 3 && (
							// biome-ignore lint/a11y/useKeyWithClickEvents: not needed for the easter egg
							<div
								ref={lightToggleRef}
								onClick={handleLightToggleClick}
								style={{
									transform: `translate(${lightTogglePosition.x}px, ${lightTogglePosition.y}px)`,
									transition:
										'transform 0.15s cubic-bezier(0.34, 1.56, 0.64, 1)',
									display: 'inline-block',
									willChange: 'transform'
								}}
							>
								<Switch
									aria-label="Toggle Light Mode"
									checked={false}
									className="ml-2 cursor-pointer"
								/>
							</div>
						)}
					</div>
					<AnimatePresence>
						{toggleAttempts >= 3 && (
							<motion.div
								initial={{ opacity: 0, height: 0 }}
								animate={{ opacity: 1, height: 'auto' }}
								exit={{ opacity: 0, height: 0 }}
								transition={{ duration: 0.2 }}
								className="text-terminal-yellow text-sm mt-2 ml-6 p-2 border border-terminal-red bg-terminal-red/10 rounded overflow-hidden"
							>
								<motion.div
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									transition={{ delay: 0.2 }}
								>
									<span className="text-terminal-lightGreen">Error:</span> Light
									mode rejected. Real developers embrace the darkness.
								</motion.div>
							</motion.div>
						)}
					</AnimatePresence>
				</li>
			</ul>
		</nav>
	)
}

export default SettingsLinks
