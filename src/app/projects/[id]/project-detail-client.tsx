'use client'
import { motion } from 'framer-motion'
import { ArrowLeft, ArrowUpRight, Code, ExternalLink } from 'lucide-react'
import Link from 'next/link'
import type { ProjectDetails } from '@/components/Projects/project-card'
import TerminalButton from '@/components/terminal-button'
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbSeparator
} from '@/components/ui/breadcrumb'

interface ProjectDetailClientProps {
	project: ProjectDetails
}

const ProjectDetailClient = ({ project }: ProjectDetailClientProps) => {
	return (
		<div className="min-h-screen py-18 px-4 md:px-8">
			<div className="max-w-7xl mx-auto">
				{/* Breadcrumb */}
				<motion.div
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.4 }}
					className="mb-8"
				>
					<Breadcrumb>
						<BreadcrumbList className="flex items-center">
							<BreadcrumbItem className="flex items-center">
								<BreadcrumbLink asChild className="flex items-center">
									<Link href="/" className="flex items-center">
										Home
									</Link>
								</BreadcrumbLink>
							</BreadcrumbItem>
							<BreadcrumbSeparator className="flex items-center mx-1" />
							<BreadcrumbItem className="flex items-center">
								<BreadcrumbLink asChild className="flex items-center">
									<Link href="/projects" className="flex items-center">
										Projekte
									</Link>
								</BreadcrumbLink>
							</BreadcrumbItem>
							<BreadcrumbSeparator className="flex items-center mx-1" />
							<BreadcrumbItem className="flex items-center">
								<BreadcrumbLink className="flex items-center">
									{project.title.length > 24
										? `${project.title.slice(0, 24)}...`
										: project.title}
								</BreadcrumbLink>
							</BreadcrumbItem>
						</BreadcrumbList>
					</Breadcrumb>
				</motion.div>

				{/* Hero Section */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
					className="mb-16"
				>
					<div className="text-center mb-12">
						<div className="flex items-center justify-center gap-3 mb-4">
							<Code className="h-8 w-8 text-terminal-cyan" />
							<h1 className="text-4xl md:text-5xl font-bold text-terminal-text">
								{project.title}
							</h1>
						</div>
						<p className="text-lg text-terminal-text/80 max-w-3xl mx-auto">
							{project.description}
						</p>
					</div>

					{/* Hero Image */}
					{project.imageUrl && (
						<motion.div
							initial={{ opacity: 0, scale: 0.95 }}
							animate={{ opacity: 1, scale: 1 }}
							transition={{ duration: 0.8, delay: 0.2 }}
							className="relative w-full max-w-4xl mx-auto rounded-lg overflow-hidden"
						>
							<div className="relative bg-terminal-window border border-terminal-window-border overflow-hidden">
								{/* Corner accent brackets */}
								<div className="absolute top-0 left-0 w-16 h-16 z-10">
									<div className="absolute top-0 left-0 w-8 h-px bg-terminal-cyan/40" />
									<div className="absolute top-0 left-0 w-px h-8 bg-terminal-cyan/40" />
								</div>
								<div className="absolute top-0 right-0 w-16 h-16 z-10">
									<div className="absolute top-0 right-0 w-8 h-px bg-terminal-cyan/40" />
									<div className="absolute top-0 right-0 w-px h-8 bg-terminal-cyan/40" />
								</div>
								<div className="absolute bottom-0 left-0 w-16 h-16 z-10">
									<div className="absolute bottom-0 left-0 w-8 h-px bg-terminal-cyan/40" />
									<div className="absolute bottom-0 left-0 w-px h-8 bg-terminal-cyan/40" />
								</div>
								<div className="absolute bottom-0 right-0 w-16 h-16 z-10">
									<div className="absolute bottom-0 right-0 w-8 h-px bg-terminal-cyan/40" />
									<div className="absolute bottom-0 right-0 w-px h-8 bg-terminal-cyan/40" />
								</div>

								{/* Subtle glow effect */}
								<div className="absolute inset-0 bg-gradient-to-br from-terminal-cyan/3 via-transparent to-terminal-cyan/3 pointer-events-none z-0" />

								{/** biome-ignore lint/performance/noImgElement: TODO */}
								<img
									src={project.imageUrl}
									alt={project.title}
									className="w-full h-auto object-cover relative z-0"
									loading="eager"
								/>
							</div>
						</motion.div>
					)}
				</motion.div>

				{/* Main Content Grid */}
				<div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
					{/* Main Content */}
					<div className="lg:col-span-2">
						<motion.div
							initial={{ opacity: 0, x: -30 }}
							whileInView={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.6 }}
							viewport={{ once: true }}
							className="relative bg-terminal-window border border-terminal-window-border overflow-hidden"
						>
							{/* Corner accent brackets */}
							<div className="absolute top-0 left-0 w-16 h-16">
								<div className="absolute top-0 left-0 w-8 h-px bg-terminal-cyan/30" />
								<div className="absolute top-0 left-0 w-px h-8 bg-terminal-cyan/30" />
							</div>
							<div className="absolute top-0 right-0 w-16 h-16">
								<div className="absolute top-0 right-0 w-8 h-px bg-terminal-cyan/30" />
								<div className="absolute top-0 right-0 w-px h-8 bg-terminal-cyan/30" />
							</div>
							<div className="absolute bottom-0 left-0 w-16 h-16">
								<div className="absolute bottom-0 left-0 w-8 h-px bg-terminal-cyan/30" />
								<div className="absolute bottom-0 left-0 w-px h-8 bg-terminal-cyan/30" />
							</div>
							<div className="absolute bottom-0 right-0 w-16 h-16">
								<div className="absolute bottom-0 right-0 w-8 h-px bg-terminal-cyan/30" />
								<div className="absolute bottom-0 right-0 w-px h-8 bg-terminal-cyan/30" />
							</div>

							{/* Subtle inner glow */}
							<div className="absolute inset-0 bg-gradient-to-br from-terminal-cyan/3 via-transparent to-terminal-cyan/3 pointer-events-none" />

							<div className="p-8 relative z-10">
								<h2 className="text-2xl font-semibold text-terminal-text mb-6">
									Über das Projekt
								</h2>

								<p className="text-terminal-text/80 text-base leading-relaxed mb-6">
									{project.longDescription || project.description}
								</p>

								{project.additionalInfo && (
									<div className="mt-8 pt-6 border-t border-terminal-window-border">
										<div className="relative pl-6">
											<div className="absolute left-0 top-0 bottom-0 w-0.5 bg-terminal-cyan" />
											<p className="text-sm text-terminal-text/70 leading-relaxed">
												{project.additionalInfo}
											</p>
										</div>
									</div>
								)}
							</div>
						</motion.div>
					</div>

					{/* Sidebar */}
					<div className="space-y-6">
						{/* Tags */}
						{project.tags && project.tags.length > 0 && (
							<motion.div
								initial={{ opacity: 0, x: 30 }}
								whileInView={{ opacity: 1, x: 0 }}
								transition={{ duration: 0.6 }}
								viewport={{ once: true }}
								className="relative bg-terminal-window border border-terminal-window-border overflow-hidden"
							>
								{/* Corner accent brackets */}
								<div className="absolute top-0 left-0 w-12 h-12">
									<div className="absolute top-0 left-0 w-6 h-px bg-terminal-cyan/30" />
									<div className="absolute top-0 left-0 w-px h-6 bg-terminal-cyan/30" />
								</div>
								<div className="absolute top-0 right-0 w-12 h-12">
									<div className="absolute top-0 right-0 w-6 h-px bg-terminal-cyan/30" />
									<div className="absolute top-0 right-0 w-px h-6 bg-terminal-cyan/30" />
								</div>
								<div className="absolute bottom-0 left-0 w-12 h-12">
									<div className="absolute bottom-0 left-0 w-6 h-px bg-terminal-cyan/30" />
									<div className="absolute bottom-0 left-0 w-px h-6 bg-terminal-cyan/30" />
								</div>
								<div className="absolute bottom-0 right-0 w-12 h-12">
									<div className="absolute bottom-0 right-0 w-6 h-px bg-terminal-cyan/30" />
									<div className="absolute bottom-0 right-0 w-px h-6 bg-terminal-cyan/30" />
								</div>

								{/* Subtle glow */}
								<div className="absolute inset-0 bg-gradient-to-br from-terminal-cyan/3 via-transparent to-terminal-cyan/3 pointer-events-none" />

								<div className="p-6 relative z-10">
									<h3 className="text-sm font-semibold mb-4 text-terminal-cyan uppercase tracking-wider">
										Technologien
									</h3>
									<div className="flex flex-wrap gap-2">
										{project.tags.map((tag, idx) => (
											<motion.span
												key={tag}
												initial={{ opacity: 0, scale: 0.8 }}
												whileInView={{ opacity: 1, scale: 1 }}
												transition={{ duration: 0.3, delay: idx * 0.05 }}
												viewport={{ once: true }}
												className="text-xs px-3 py-1.5 bg-terminal-card text-terminal-text/70 font-medium border border-terminal-window-border hover:border-terminal-cyan/50 hover:text-terminal-text transition-colors duration-200"
											>
												{tag}
											</motion.span>
										))}
									</div>
								</div>
							</motion.div>
						)}

						{/* Links */}
						{project.links && project.links.length > 0 && (
							<motion.div
								initial={{ opacity: 0, x: 30 }}
								whileInView={{ opacity: 1, x: 0 }}
								transition={{ duration: 0.6, delay: 0.2 }}
								viewport={{ once: true }}
								className="relative bg-terminal-window border border-terminal-window-border overflow-hidden"
							>
								{/* Corner accent brackets */}
								<div className="absolute top-0 left-0 w-12 h-12">
									<div className="absolute top-0 left-0 w-6 h-px bg-terminal-cyan/30" />
									<div className="absolute top-0 left-0 w-px h-6 bg-terminal-cyan/30" />
								</div>
								<div className="absolute top-0 right-0 w-12 h-12">
									<div className="absolute top-0 right-0 w-6 h-px bg-terminal-cyan/30" />
									<div className="absolute top-0 right-0 w-px h-6 bg-terminal-cyan/30" />
								</div>
								<div className="absolute bottom-0 left-0 w-12 h-12">
									<div className="absolute bottom-0 left-0 w-6 h-px bg-terminal-cyan/30" />
									<div className="absolute bottom-0 left-0 w-px h-6 bg-terminal-cyan/30" />
								</div>
								<div className="absolute bottom-0 right-0 w-12 h-12">
									<div className="absolute bottom-0 right-0 w-6 h-px bg-terminal-cyan/30" />
									<div className="absolute bottom-0 right-0 w-px h-6 bg-terminal-cyan/30" />
								</div>

								{/* Subtle glow */}
								<div className="absolute inset-0 bg-gradient-to-br from-terminal-cyan/3 via-transparent to-terminal-cyan/3 pointer-events-none" />

								<div className="p-6 relative z-10">
									<h3 className="text-sm font-semibold mb-4 text-terminal-cyan uppercase tracking-wider">
										Links
									</h3>
									<div className="flex flex-col gap-3">
										{project.links.map((link, idx) => (
											<motion.a
												key={link.label}
												href={link.url}
												target="_blank"
												rel="noreferrer noopener"
												initial={{ opacity: 0, x: 20 }}
												whileInView={{ opacity: 1, x: 0 }}
												transition={{ duration: 0.3, delay: idx * 0.1 }}
												viewport={{ once: true }}
												whileHover={{ x: 4 }}
												className="group flex items-center gap-3 px-4 py-3 bg-terminal-card border border-terminal-window-border hover:border-terminal-cyan/50 hover:bg-terminal-card/80 transition-all duration-200 no-underline"
											>
												<ExternalLink
													size={16}
													className="text-terminal-text/70 group-hover:text-terminal-cyan transition-colors duration-200"
												/>
												<span className="text-sm text-terminal-text/80 group-hover:text-terminal-text transition-colors duration-200">
													{link.label}
												</span>
												<ArrowUpRight
													size={14}
													className="ml-auto text-terminal-text/50 group-hover:text-terminal-cyan group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-200"
												/>
											</motion.a>
										))}
									</div>
								</div>
							</motion.div>
						)}
					</div>
				</div>

				{/* Back Button */}
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.4, delay: 0.4 }}
					className="pt-6 pb-6 flex justify-start"
				>
					<TerminalButton href="/projects" className="group">
						<div className="flex items-center gap-2 no-underline">
							<ArrowLeft
								size={16}
								className="group-hover:-translate-x-1 transition-transform"
							/>
							<span>Zurück zu Projekten</span>
						</div>
					</TerminalButton>
				</motion.div>
			</div>
		</div>
	)
}

export default ProjectDetailClient
