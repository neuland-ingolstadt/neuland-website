import Image from 'next/image'
import type React from 'react'
import GlassBox from './ui/GlassBox'

const sponsors = [
	{
		name: 'Technische Hochschule Ingolstadt',
		href: 'https://www.thi.de/',
		logo: '/assets/thi.webp',
		width: 260,
		height: 90,
		imageClassName: 'h-16',
		wrapperClassName: 'bg-white/95 rounded-2xl px-5 py-3'
	},
	{
		name: 'EXP',
		href: 'https://www.exp.de/',
		logo: '/assets/exp.webp',
		width: 140,
		height: 40,
		imageClassName: 'h-12'
	}
]

const TerminalPartners: React.FC = () => {
	return (
		<section className="my-10 max-w-5xl mx-auto">
			<div className="flex flex-col gap-6">
				<GlassBox className="font-mono p-5">
					<p className="text-terminal-text/60 text-sm mb-2">
						$ cat sponsors.txt
					</p>
					<p className="text-terminal-text text-lg font-medium">
						Unsere Partner machen unsere Projekte überhaupt erst möglich.
					</p>
					<p className="text-terminal-text/80 text-sm">
						Mit ihrem Support bringen wir als studentischer Verein Tech nach
						Ingolstadt und halten die Community lebendig.
					</p>
				</GlassBox>

				<div className="grid grid-cols-1 gap-6 md:grid-cols-2">
					{sponsors.map((sponsor) => (
						<GlassBox
							key={sponsor.name}
							className="group p-6 border-terminal-text/20 bg-terminal-surface/70"
						>
							<a
								href={sponsor.href}
								target="_blank"
								rel="noreferrer noopener"
								className="flex h-full w-full items-center justify-center no-underline"
								aria-label={`${sponsor.name} Website`}
							>
								<div
									className={`flex items-center justify-center ${sponsor.wrapperClassName ?? ''}`}
								>
									<Image
										src={sponsor.logo}
										alt={`${sponsor.name} Logo`}
										width={sponsor.width}
										height={sponsor.height}
										className={`${sponsor.imageClassName ?? 'h-16'} w-auto object-contain`}
										sizes="(min-width: 768px) 240px, 70vw"
										priority
									/>
								</div>
							</a>
						</GlassBox>
					))}
				</div>

				<div className="text-terminal-text/80 text-sm">
					<span>Partner werden? Schreib uns an </span>
					<a
						href="mailto:info@neuland-ingolstadt.de"
						className="text-terminal-cyan hover:underline"
					>
						info@neuland-ingolstadt.de
					</a>
					<span>.</span>
				</div>
			</div>
		</section>
	)
}

export default TerminalPartners
