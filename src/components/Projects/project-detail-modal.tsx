'use client'
import { AnimatePresence, motion } from 'framer-motion'
import { ExternalLink } from 'lucide-react'
import type React from 'react'
import { memo, useCallback, useEffect, useState } from 'react'
import TerminalButton from '../terminal-button'
import TypewriterText from '../typewriter-text'
import type { ProjectDetails } from './project-card'
import ProjectTerminalWindow from './project-terminal-window'

interface ProjectDetailModalProps {
	project: ProjectDetails | null
	isOpen: boolean
	onClose: () => void
}

const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({
	project,
	isOpen,
	onClose
}) => {
	const [showContent, setShowContent] = useState(false)

	useEffect(() => {
		if (isOpen) {
			const timer = setTimeout(() => setShowContent(true), 300)
			document.body.style.overflow = 'hidden'
			return () => {
				clearTimeout(timer)
			}
		}
		setShowContent(false)
		document.body.style.overflow = 'auto'
	}, [isOpen])

	useEffect(() => {
		if (!isOpen) return

		const handleEscape = (e: KeyboardEvent) => {
			if (e.key === 'Escape') onClose()
		}

		window.addEventListener('keydown', handleEscape)
		return () => window.removeEventListener('keydown', handleEscape)
	}, [isOpen, onClose])

	const handleBackdropClick = useCallback(() => {
		onClose()
	}, [onClose])

	if (!project || !isOpen) return null

	return (
		<AnimatePresence>
			{isOpen && (
				<>
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.2 }}
						className="fixed inset-0 bg-terminal-overlay z-40"
						onClick={handleBackdropClick}
						aria-hidden="true"
					/>

					<motion.div
						initial={{ scale: 0.9, opacity: 0 }}
						animate={{ scale: 1, opacity: 1 }}
						exit={{ scale: 0.9, opacity: 0 }}
						transition={{ type: 'spring', damping: 20, stiffness: 300 }}
						className="fixed z-50 flex flex-col items-center justify-center pointer-events-none"
						style={{
							top: '60px',
							left: '0',
							right: '0',
							bottom: '0',
							padding: '16px'
						}}
					>
						<div className="pointer-events-auto w-full max-w-4xl max-h-[calc(100vh-120px)] mb-10 overflow-visible">
							<ProjectTerminalWindow
								title={`projekt.sh --name="${project.title}"`}
								onClose={onClose}
							>
								<div className="flex flex-col h-full">
									<div className="flex flex-col md:flex-row gap-6 p-4">
										{project.imageUrl && (
											<div className="hidden md:flex md:w-2/5 shrink-0 flex-col justify-start">
												{/** biome-ignore lint/performance/noImgElement: TODO */}
												<img
													src={project.imageUrl}
													alt={project.title}
													className="w-full max-w-[420px] max-h-[320px] object-cover border border-terminal-window-border"
													loading="lazy"
												/>
												{project.tags && project.tags.length > 0 && (
													<div className="mt-4 w-full">
														<p className="text-sm mb-2 font-mono text-terminal-text/60">
															$ tags --list
														</p>
														<div className="flex flex-wrap gap-2">
															{project.tags.map((tag) => (
																<span
																	key={tag}
																	className="text-xs px-2.5 py-1 bg-terminal-card text-terminal-text/70 font-medium border border-terminal-window-border"
																>
																	{tag}
																</span>
															))}
														</div>
													</div>
												)}
											</div>
										)}

										<div className="flex-1 overflow-auto">
											<h3 className="text-xl font-bold text-terminal-text mb-4">
												{project.title}
											</h3>

											{showContent ? (
												<>
													<div className="mb-6">
														<TypewriterText
															text={
																project.longDescription || project.description
															}
															className="text-terminal-text/70"
															delay={1}
															preventLayoutJumps
														/>
													</div>

													{project.additionalInfo && (
														<div className="mb-6 mt-4 border-l-2 border-terminal-window-border pl-4">
															<p className="text-sm text-terminal-text/70">
																{project.additionalInfo}
															</p>
														</div>
													)}

													<div className="mt-4">
														{!project.imageUrl &&
														project.tags &&
														project.tags.length > 0 ? (
															<div className="flex flex-row gap-8 mt-4">
																{/* Links column */}
																<div className="flex flex-col">
																	<p className="text-sm mb-2 font-mono text-terminal-text/60">
																		$ links --open
																	</p>
																	<div className="flex flex-wrap gap-3 items-center">
																		{project.links.map((link) => (
																			<TerminalButton
																				key={link.label}
																				href={link.url}
																				target="_blank"
																				rel="noreferrer noopener"
																				className="flex items-center px-3 py-1"
																				dark
																			>
																				<ExternalLink
																					size={14}
																					className="mr-2"
																				/>
																				{link.label}
																			</TerminalButton>
																		))}
																	</div>
																</div>
																{/* Tags column */}
																<div className="flex flex-col">
																	<p className="text-sm mb-2 font-mono text-terminal-text/60">
																		$ tags --list
																	</p>
																	<div className="flex flex-wrap gap-2">
																		{project.tags.map((tag) => (
																			<span
																				key={tag}
																				className="text-xs px-2.5 py-1 bg-terminal-card text-terminal-text/70 font-medium border border-terminal-window-border"
																			>
																				{tag}
																			</span>
																		))}
																	</div>
																</div>
															</div>
														) : (
															<div className="mt-4">
																<p className="text-sm mb-4 font-mono text-terminal-text/60">
																	$ links --open
																</p>
																<div className="flex flex-wrap gap-3 items-center">
																	{project.links.map((link) => (
																		<TerminalButton
																			key={link.label}
																			href={link.url}
																			target="_blank"
																			rel="noreferrer noopener"
																			className="flex items-center px-3 py-1"
																			dark
																		>
																			<ExternalLink
																				size={14}
																				className="mr-2"
																			/>
																			{link.label}
																		</TerminalButton>
																	))}
																</div>
															</div>
														)}
													</div>
												</>
											) : (
												<div className="animate-pulse flex space-x-4">
													<div className="flex-1 space-y-4 py-1">
														<div className="h-4 bg-terminal-card rounded w-3/4" />
														<div className="space-y-2">
															<div className="h-4 bg-terminal-card rounded" />
															<div className="h-4 bg-terminal-card rounded w-5/6" />
														</div>
													</div>
												</div>
											)}
										</div>
									</div>
								</div>
							</ProjectTerminalWindow>
						</div>
					</motion.div>
				</>
			)}
		</AnimatePresence>
	)
}

export default memo(ProjectDetailModal)
