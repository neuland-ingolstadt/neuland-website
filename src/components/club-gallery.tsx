'use client'
import { ImagePlus } from 'lucide-react'
import { motion } from 'motion/react'
import type React from 'react'
import { useTranslations } from '@/i18n/react'

interface GalleryItem {
	id: 'talk' | 'printing' | 'lanparty' | 'social' | 'brainstorming' | 'meetup'
	/** Leave empty to render a placeholder until a real photo is added. */
	src?: string
	/** Object position class for photos that get cropped, e.g. portraits */
	focus?: string
	/** Grid span and tilt of the polaroid */
	style: string
}

const ITEMS: GalleryItem[] = [
	{
		id: 'talk',
		src: '/assets/gallery/talk.webp',
		focus: 'object-[85%_50%]',
		style: 'sm:col-span-2 sm:row-span-2 -rotate-1'
	},
	{
		id: 'printing',
		src: '/assets/gallery/printing.webp',
		focus: 'object-[50%_35%]',
		style: 'rotate-1'
	},
	{
		id: 'lanparty',
		src: '/assets/gallery/lanparty.webp',
		style: '-rotate-[1.5deg]'
	},
	{
		id: 'social',
		src: '/assets/gallery/social.webp',
		focus: 'object-[50%_55%]',
		style: 'rotate-[1.5deg]'
	},
	{
		id: 'brainstorming',
		src: '/assets/gallery/brainstorming.webp',
		style: '-rotate-1'
	},
	{
		id: 'meetup',
		src: '/assets/gallery/meetup.webp',
		style: 'rotate-1'
	}
]

const ClubGallery: React.FC = () => {
	const t = useTranslations('Home.gallerySection')

	return (
		<section className="mb-32 md:mb-40">
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				whileInView={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6 }}
				viewport={{ once: true }}
				className="mb-10 max-w-2xl"
			>
				<h2 className="mb-4 mt-0 text-balance font-mono text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
					{t('heading')}
				</h2>
				<p className="m-0 text-balance text-lg leading-relaxed text-terminal-text/80">
					{t('subtitle')}
				</p>
			</motion.div>

			<div className="grid grid-cols-1 gap-6 sm:grid-cols-3 lg:gap-8">
				{ITEMS.map((item, idx) => (
					<motion.figure
						key={item.id}
						initial={{ opacity: 0, y: 24 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: idx * 0.08 }}
						viewport={{ once: true }}
						className={`m-0 flex flex-col gap-3 border border-terminal-window-border bg-terminal-window p-3 transition-transform duration-300 hover:rotate-0 ${item.style}`}
					>
						<div className="relative min-h-48 flex-1 overflow-hidden bg-terminal-bg">
							{item.src ? (
								<img
									src={item.src}
									alt={t(`items.${item.id}`)}
									loading="lazy"
									className={`absolute inset-0 h-full w-full object-cover ${item.focus ?? ''}`}
								/>
							) : (
								<div className="absolute inset-0 flex flex-col items-center justify-center gap-2 border border-dashed border-terminal-window-border text-terminal-text/50">
									<ImagePlus className="h-8 w-8" />
									<span className="font-mono text-sm">{t('placeholder')}</span>
								</div>
							)}
						</div>
						<figcaption className="font-script text-xl leading-tight text-terminal-ink">
							{t(`items.${item.id}`)}
						</figcaption>
					</motion.figure>
				))}
			</div>
		</section>
	)
}

export default ClubGallery
