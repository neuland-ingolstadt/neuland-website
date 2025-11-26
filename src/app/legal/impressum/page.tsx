'use client'
import { motion } from 'framer-motion'
import { Mail, MapPin, Phone, Scale, Users } from 'lucide-react'
import Link from 'next/link'
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbSeparator
} from '@/components/ui/breadcrumb'
import vorstandData from '@/data/vorstand.json'

export default function Impressum() {
	return (
		<div className="pt-20 pb-12">
			<div className="max-w-4xl mx-auto px-4">
				<Breadcrumb className="mb-8">
					<BreadcrumbList>
						<BreadcrumbItem>
							<BreadcrumbLink asChild>
								<Link href="/">Home</Link>
							</BreadcrumbLink>
						</BreadcrumbItem>
						<BreadcrumbSeparator />
						<BreadcrumbItem>
							<BreadcrumbLink>Impressum</BreadcrumbLink>
						</BreadcrumbItem>
					</BreadcrumbList>
				</Breadcrumb>

				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
					className="relative bg-[#0b0b0b] border border-neutral-800 overflow-hidden"
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
					<div className="absolute inset-0 bg-gradient-to-br from-terminal-cyan/1 via-transparent to-terminal-cyan/1 pointer-events-none" />

					<div className="p-8 md:p-12 relative z-10">
						{/* Header */}
						<div className="mb-8">
							<h1 className="text-4xl font-bold text-terminal-text mb-2">
								Impressum
							</h1>
							<p className="text-gray-400 text-sm font-mono">
								$ cat impressum.txt
							</p>
						</div>

						{/* Organization Info */}
						<motion.div
							initial={{ opacity: 0, y: 10 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, delay: 0.1 }}
							className="mb-8 pb-8 border-b border-neutral-800"
						>
							<div className="flex items-start gap-3 mb-4">
								<MapPin className="h-5 w-5 text-terminal-cyan shrink-0 mt-0.5" />
								<div>
									<h3 className="text-lg font-semibold text-terminal-text mb-2">
										Verein
									</h3>
									<p className="text-gray-400 leading-relaxed mb-2">
										Neuland Ingolstadt e.V.
									</p>
									<p className="text-gray-400 leading-relaxed">
										Esplanade 10
										<br />
										85049 Ingolstadt
									</p>
								</div>
							</div>
						</motion.div>

						{/* Registry Info */}
						<motion.div
							initial={{ opacity: 0, y: 10 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, delay: 0.2 }}
							className="mb-8 pb-8 border-b border-neutral-800"
						>
							<div className="flex items-start gap-3">
								<Scale className="h-5 w-5 text-terminal-cyan shrink-0 mt-0.5" />
								<div>
									<h3 className="text-lg font-semibold text-terminal-text mb-2">
										Registergericht
									</h3>
									<p className="text-gray-400 leading-relaxed mb-1">
										Amtsgericht Ingolstadt
									</p>
									<p className="text-gray-400 leading-relaxed">
										Registernummer: <span className="font-mono">VR 201088</span>
									</p>
								</div>
							</div>
						</motion.div>

						{/* Contact Info */}
						<motion.div
							initial={{ opacity: 0, y: 10 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, delay: 0.3 }}
							className="mb-8 pb-8 border-b border-neutral-800"
						>
							<h3 className="text-lg font-semibold text-terminal-text mb-4 flex items-center gap-2">
								<Mail className="h-5 w-5 text-terminal-cyan" />
								Kontakt
							</h3>
							<div className="space-y-3">
								<div className="flex items-center gap-3">
									<Mail className="h-4 w-4 text-gray-500 shrink-0" />
									<a
										href="mailto:info@neuland-ingolstadt.de"
										className="text-gray-400 hover:text-terminal-cyan transition-colors duration-200 no-underline"
									>
										info@neuland-ingolstadt.de
									</a>
								</div>
								<div className="flex items-center gap-3">
									<Phone className="h-4 w-4 text-gray-500 shrink-0" />
									<a
										href="tel:015678384646"
										className="text-gray-400 hover:text-terminal-cyan transition-colors duration-200 no-underline"
									>
										015678 384646
									</a>
								</div>
							</div>
						</motion.div>

						{/* Board Members */}
						<motion.div
							initial={{ opacity: 0, y: 10 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, delay: 0.4 }}
							className="mb-8 pb-8 border-b border-neutral-800"
						>
							<h3 className="text-lg font-semibold text-terminal-text mb-4 flex items-center gap-2">
								<Users className="h-5 w-5 text-terminal-cyan" />
								Vorstand
							</h3>
							<p className="text-gray-400 mb-3">Vertreten durch:</p>
							<div className="space-y-2">
								{vorstandData.vorstand.map((member, index) => (
									<div
										key={index}
										className="text-terminal-text font-medium pl-4 border-l-2 border-neutral-800 hover:border-terminal-cyan/40 transition-colors duration-200"
									>
										{member.name}
									</div>
								))}
							</div>
						</motion.div>

						{/* Responsible Person */}
						<motion.div
							initial={{ opacity: 0, y: 10 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, delay: 0.5 }}
						>
							<p className="text-gray-400">
								Inhaltlich verantwortlich:{' '}
								<span className="text-terminal-text font-semibold">
									{vorstandData.verantwortlicher}
								</span>
							</p>
						</motion.div>
					</div>
				</motion.div>
			</div>
		</div>
	)
}
