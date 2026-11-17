'use client'
import { ArrowLeft, ArrowUpRight, Code, ExternalLink } from 'lucide-react'
import { motion } from 'motion/react'
import type { ProjectDetails } from '@/components/Projects/project-card'
import { Link } from '@/i18n/navigation'
import { useTranslations } from '@/i18n/react'

interface ProjectDetailClientProps {
	project: ProjectDetails
}

const ProjectDetailClient = ({ project }: ProjectDetailClientProps) => {
	const t = useTranslations('Projects')

	return (
		<div className="max-w-7xl mx-auto pt-8 md:pt-16">
			{/* Back Button */}
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 0.4, delay: 0.4 }}
				className="mb-10 flex justify-start"
			>
				<Link
					href="/projects"
					className="group inline-flex items-center gap-2 font-mono text-sm text-terminal-text/70 no-underline hover:text-terminal-ink transition-colors duration-200"
				>
					<ArrowLeft
						size={14}
						className="group-hover:-translate-x-1 transition-transform"
					/>
					<span>{t('detailClient.back')}</span>
				</Link>
			</motion.div>
			{/* Title */}
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6 }}
				className="flex items-center gap-3 mb-10"
			>
				<Code className="h-8 w-8 text-terminal-ink" />
				<h1 className="text-4xl md:text-5xl font-bold text-terminal-text">
					{project.title}
				</h1>
			</motion.div>

			{/* Preview Image */}
			{project.imageUrl && (
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, delay: 0.1 }}
					className="relative border border-terminal-window-border bg-terminal-window overflow-hidden mb-8"
				>
					{/* Subtle glow effect */}
					<div className="absolute inset-0 bg-gradient-to-br from-terminal-cyan/3 via-transparent to-terminal-cyan/3 pointer-events-none z-10" />
					<img
						src={project.imageUrl}
						alt={project.title}
						className="w-full h-auto max-h-[36rem] min-h-64 object-cover"
						loading="eager"
					/>
					{/* Gradient overlay, darker toward the bottom-left corner */}
					<div className="absolute inset-0 bg-gradient-to-tr from-black/60 via-black/10 to-transparent pointer-events-none z-10" />
				</motion.div>
			)}

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
						{/* Subtle inner glow */}
						<div className="absolute inset-0 bg-gradient-to-br from-terminal-cyan/3 via-transparent to-terminal-cyan/3 pointer-events-none" />

						<div className="p-5 sm:p-8 relative z-10">
							<h2 className="text-sm font-semibold mb-4 text-terminal-ink uppercase tracking-wider">
								{t('detailClient.title')}
							</h2>

							<p className="text-lg text-terminal-text/90 mb-6">
								{project.description}
							</p>

							<p className="text-terminal-text/90 text-base leading-relaxed mb-6">
								{project.longDescription || project.description}
							</p>

							{project.additionalInfo && (
								<div className="mt-8 pt-6 border-t border-terminal-window-border">
									<div className="relative pl-6">
										<div className="absolute left-0 top-0 bottom-0 w-0.5 bg-terminal-cyan" />
										<p className="text-base text-terminal-text/85 leading-relaxed">
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
							{/* Subtle glow */}
							<div className="absolute inset-0 bg-gradient-to-br from-terminal-cyan/3 via-transparent to-terminal-cyan/3 pointer-events-none" />

							<div className="p-5 sm:p-8 relative z-10">
								<h3 className="text-sm font-semibold mb-4 text-terminal-ink uppercase tracking-wider">
									{t('detailClient.technologies')}
								</h3>
								<div className="flex flex-wrap gap-2">
									{project.tags.map((tag, idx) => (
										<motion.span
											key={tag}
											initial={{ opacity: 0, scale: 0.8 }}
											whileInView={{ opacity: 1, scale: 1 }}
											transition={{ duration: 0.3, delay: idx * 0.05 }}
											viewport={{ once: true }}
											className="text-xs px-2.5 py-1 bg-terminal-windowTitle text-terminal-text/70 font-medium rounded-sm"
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
							{/* Subtle glow */}
							<div className="absolute inset-0 bg-gradient-to-br from-terminal-cyan/3 via-transparent to-terminal-cyan/3 pointer-events-none" />

							<div className="p-5 sm:p-8 relative z-10">
								<h3 className="text-sm font-semibold mb-4 text-terminal-ink uppercase tracking-wider">
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
											className="group flex items-center gap-3 px-4 py-3 bg-terminal-card border border-terminal-window-border hover:border-terminal-cyan/50 [:root[data-theme=light]_&]:hover:border-black hover:bg-terminal-card/80 transition-all duration-200 no-underline"
										>
											<ExternalLink
												size={16}
												className="text-terminal-text/85 group-hover:text-terminal-ink transition-colors duration-200"
											/>
											<span className="text-sm text-terminal-text/90 group-hover:text-terminal-text transition-colors duration-200">
												{link.label}
											</span>
											<ArrowUpRight
												size={14}
												className="ml-auto text-terminal-text/70 group-hover:text-terminal-ink group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-200"
											/>
										</motion.a>
									))}
								</div>
							</div>
						</motion.div>
					)}
				</div>
			</div>
		</div>
	)
}

export default ProjectDetailClient
