import { AnimatePresence, motion } from 'framer-motion'
import { ExternalLink } from 'lucide-react'
import type React from 'react'
import { useEffect, useState } from 'react'
import TypewriterText from '../TypewriterText'
import type { ProjectDetails } from './ProjectCard'
import ProjectTerminalWindow from './ProjectTerminalWindow'

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
				document.body.style.overflow = 'auto'
			}
		}
		setShowContent(false)
	}, [isOpen])

	// Close on escape key
	useEffect(() => {
		const handleEscape = (e: KeyboardEvent) => {
			if (e.key === 'Escape') onClose()
		}

		window.addEventListener('keydown', handleEscape)
		return () => window.removeEventListener('keydown', handleEscape)
	}, [onClose])

	if (!project) return null

	return (
		<AnimatePresence>
			{isOpen && (
				<>
					{/* Backdrop - z-40 to be below the modal but above other content */}
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.2 }}
						className="fixed inset-0 bg-black bg-opacity-70 z-40 bg"
						onClick={onClose}
						aria-hidden="true"
					/>

					{/* Modal - z-50 to be above backdrop */}
					<motion.div
						initial={{ scale: 0.9, opacity: 0 }}
						animate={{ scale: 1, opacity: 1 }}
						exit={{ scale: 0.9, opacity: 0 }}
						transition={{ type: 'spring', damping: 20, stiffness: 300 }}
						className="fixed z-50 flex flex-col items-center justify-center pointer-events-none"
						style={{
							top: '60px', // Space for navbar
							left: '0',
							right: '0',
							bottom: '0',
							padding: '16px'
						}}
					>
						{/* SimpleTerminalWindow with pointer-events-auto to receive clicks */}
						<div className="pointer-events-auto w-full max-w-4xl max-h-full overflow-auto">
							<ProjectTerminalWindow
								title={`projekt.sh --name="${project.title}"`}
								onClose={onClose}
							>
								<div className="flex flex-col h-full overflow-hidden">
									<div className="flex flex-col md:flex-row gap-6 overflow-auto p-1">
										{/* Left side: Image or preview - hidden on small screens */}
										{project.imageUrl && (
											<div className="hidden md:block md:w-1/3 flex-shrink-0">
												<img
													src={project.imageUrl}
													alt={project.title}
													className="max-h-[70vh] rounded border border-terminal-windowBorder"
												/>
											</div>
										)}

										{/* Right side: Content */}
										<div className="flex-1 overflow-auto">
											<h3 className="text-xl font-bold text-terminal-cyan mb-4">
												{project.title}
											</h3>

											{showContent ? (
												<>
													<div className="mb-6">
														<TypewriterText
															text={
																project.longDescription || project.description
															}
															className="text-terminal-text"
															delay={5}
															preventLayoutJumps
														/>
													</div>

													{project.additionalInfo && (
														<div className="mb-6 mt-4 border-l-2 border-terminal-windowBorder pl-4">
															<p className="text-sm opacity-90">
																{project.additionalInfo}
															</p>
														</div>
													)}

													{/* Tags */}
													{project.tags && project.tags.length > 0 && (
														<div className="mb-6">
															<p className="text-sm mb-2 font-mono opacity-70">
																$ tags --list
															</p>
															<div className="flex flex-wrap gap-2">
																{project.tags.map((tag) => (
																	<span
																		key={tag}
																		className="text-xs px-2 py-1 rounded-sm bg-terminal-window border border-terminal-windowBorder text-terminal-cyan"
																	>
																		{tag}
																	</span>
																))}
															</div>
														</div>
													)}

													{/* Links */}
													<div className="mt-4">
														<p className="text-sm mb-4 font-mono opacity-70">
															$ links --open
														</p>
														<div className="flex flex-wrap gap-3">
															{project.links.map((link) => (
																<a
																	key={link.label}
																	href={link.url}
																	target="_blank"
																	rel="noreferrer noopener"
																	className="text-terminal-cyan flex items-center px-3 py-1 border border-terminal-cyan rounded-sm hover:bg-terminal-cyan hover:bg-opacity-10 transition-colors"
																>
																	<ExternalLink size={14} className="mr-2" />
																	{link.label}
																</a>
															))}
														</div>
													</div>
												</>
											) : (
												<div className="animate-pulse flex space-x-4">
													<div className="flex-1 space-y-4 py-1">
														<div className="h-4 bg-terminal-windowBorder rounded w-3/4" />
														<div className="space-y-2">
															<div className="h-4 bg-terminal-windowBorder rounded" />
															<div className="h-4 bg-terminal-windowBorder rounded w-5/6" />
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

export default ProjectDetailModal
