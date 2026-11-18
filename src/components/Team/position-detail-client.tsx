'use client'
import { ArrowLeft, Check, Copy } from 'lucide-react'
import { motion } from 'motion/react'
import type React from 'react'
import { useEffect, useRef, useState } from 'react'
import { badgeClass, StatusBadge } from '@/components/Team/position-card'
import TerminalButton from '@/components/terminal-button'
import { Link } from '@/i18n/navigation'
import { resolveLocale, useLocale, useTranslations } from '@/i18n/react'
import { copyToClipboard } from '@/lib/clipboard'
import {
	DISCORD_URL,
	localize,
	localizeList,
	type Position
} from '@/lib/positions'

interface PositionDetailClientProps {
	position: Position
}

const InfoBox: React.FC<{
	title?: string
	className?: string
	children: React.ReactNode
}> = ({ title, className = '', children }) => (
	<motion.div
		initial={{ opacity: 0, y: 20 }}
		whileInView={{ opacity: 1, y: 0 }}
		transition={{ duration: 0.5 }}
		viewport={{ once: true }}
		className={`relative bg-terminal-window border border-terminal-window-border overflow-hidden ${className}`}
	>
		{/* Subtle inner glow */}
		<div className="absolute inset-0 bg-gradient-to-br from-terminal-cyan/3 via-transparent to-terminal-cyan/3 pointer-events-none" />
		<div className="p-5 sm:p-8 relative z-10">
			{title && (
				<h2 className="text-sm font-semibold mb-4 text-terminal-ink uppercase tracking-wider">
					{title}
				</h2>
			)}
			{children}
		</div>
	</motion.div>
)

const BulletList: React.FC<{ items: string[] }> = ({ items }) => (
	<ul className="space-y-3 list-none p-0 m-0">
		{items.map((item) => (
			<li
				key={item}
				className="relative pl-6 text-base text-terminal-text/90 leading-relaxed"
			>
				<span className="absolute left-0 top-0 font-mono text-terminal-ink">
					&gt;
				</span>
				{item}
			</li>
		))}
	</ul>
)

type CopyState = 'idle' | 'copied' | 'failed'

const useCopy = () => {
	const [state, setState] = useState<CopyState>('idle')
	const resetTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

	useEffect(
		() => () => {
			if (resetTimer.current) clearTimeout(resetTimer.current)
		},
		[]
	)

	const copy = async (text: string) => {
		let next: CopyState = 'copied'
		if (!(await copyToClipboard(text))) {
			next = 'failed'
		}
		setState(next)
		if (resetTimer.current) clearTimeout(resetTimer.current)
		resetTimer.current = setTimeout(() => setState('idle'), 2000)
	}

	return { state, copy }
}

const stepKeys = {
	new: ['ticket', 'meeting', 'join', 'onboarding'],
	member: ['contact', 'meeting', 'start']
} as const

type StepTab = keyof typeof stepKeys
const stepTabs = Object.keys(stepKeys) as StepTab[]

const PositionDetailClient = ({ position }: PositionDetailClientProps) => {
	const t = useTranslations('Team')
	const locale = resolveLocale(useLocale())
	const jobIdCopy = useCopy()
	const [stepTab, setStepTab] = useState<StepTab>('new')

	const metaItems = [
		t(`teams.${position.team}`),
		t('hoursPerWeek', {
			min: position.hoursPerWeek.min,
			max: position.hoursPerWeek.max
		}),
		t(`format.${position.format}`),
		t(`language.${position.language}`)
	]

	const sections = [
		{ key: 'tasks', items: localizeList(position.tasks, locale) },
		{ key: 'requirements', items: localizeList(position.requirements, locale) },
		{ key: 'niceToHave', items: localizeList(position.niceToHave, locale) },
		{ key: 'benefits', items: localizeList(position.benefits, locale) }
	].filter(({ items }) => items.length > 0)

	return (
		<div className="max-w-7xl mx-auto pt-8 md:pt-16">
			{/* Back link */}
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 0.4, delay: 0.4 }}
				className="mb-10 flex justify-start"
			>
				<Link
					href="/open-positions"
					className="group inline-flex items-center gap-2 font-mono text-sm text-terminal-text/70 no-underline hover:text-terminal-ink transition-colors duration-200"
				>
					<ArrowLeft
						size={14}
						className="group-hover:-translate-x-1 transition-transform"
					/>
					<span>{t('detail.back')}</span>
				</Link>
			</motion.div>

			{/* Title */}
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6 }}
				className="mb-6"
			>
				<div className="flex flex-wrap items-center gap-x-4 gap-y-3">
					<h1 className="text-4xl md:text-5xl font-bold text-terminal-text m-0">
						{localize(position.title, locale)}
					</h1>
					<StatusBadge status={position.status} />
				</div>
			</motion.div>

			{/* Meta bar */}
			<div className="flex flex-wrap gap-2 mb-10">
				{metaItems.map((item) => (
					<span key={item} className={badgeClass}>
						{item}
					</span>
				))}
			</div>

			{/* Job ID */}
			<div className="flex flex-wrap items-center gap-3 mb-10 font-mono text-sm text-terminal-text/80">
				<span>
					{t('detail.jobId')}:{' '}
					<span className="text-terminal-ink font-bold">{position.jobId}</span>
				</span>
			</div>

			{position.status === 'filled' && (
				<p className="mb-8 font-mono text-sm text-terminal-text/80">
					&gt; {t('detail.filledNotice')}
				</p>
			)}

			<div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-10 mb-12 md:mb-16">
				<div className="lg:col-span-2 space-y-8 md:space-y-10">
					<InfoBox title={t('detail.description')}>
						<p className="text-lg text-terminal-text/90 leading-relaxed m-0">
							{localize(position.shortDescription, locale)}
						</p>
					</InfoBox>

					<InfoBox>
						<div className="space-y-8">
							{sections.map(({ key, items }) => (
								<section key={key}>
									<h3 className="text-sm font-semibold mb-4 text-terminal-ink uppercase tracking-wider">
										{t(`detail.${key}`)}
									</h3>
									<BulletList items={items} />
								</section>
							))}
						</div>
					</InfoBox>
				</div>

				<div className="space-y-8 md:space-y-10">
					<InfoBox title={t('detail.apply.title')}>
						<p className="text-base text-terminal-text/90 leading-relaxed mb-6">
							{t(
								stepTab === 'member'
									? 'detail.apply.hintMember'
									: 'detail.apply.hint'
							)}
						</p>
						<div className="flex flex-col gap-3">
							<TerminalButton onClick={() => jobIdCopy.copy(position.jobId)}>
								{jobIdCopy.state === 'copied' ? (
									<Check size={16} />
								) : (
									<Copy size={16} />
								)}
								{jobIdCopy.state === 'copied'
									? t('detail.apply.copied')
									: jobIdCopy.state === 'failed'
										? t('detail.apply.copyFailed')
										: t('detail.copyJobId')}
							</TerminalButton>
							<TerminalButton
								primary
								href={DISCORD_URL}
								target="_blank"
								rel="noreferrer noopener"
							>
								{t('detail.apply.cta')}
							</TerminalButton>
						</div>
					</InfoBox>

					<InfoBox title={t('detail.contact')}>
						<p className="text-base font-semibold text-terminal-text m-0">
							{position.contact.name}
						</p>
						<p className="text-sm text-terminal-text/70 mt-1 mb-0">
							{position.contact.role}
						</p>
					</InfoBox>

					<InfoBox title={t('detail.steps.title')}>
						<div
							role="tablist"
							className="mb-5 grid grid-cols-2 gap-1 rounded-md border border-terminal-window-border p-1"
						>
							{stepTabs.map((tab) => (
								<button
									key={tab}
									type="button"
									role="tab"
									aria-selected={stepTab === tab}
									onClick={() => setStepTab(tab)}
									className={`cursor-pointer rounded px-2 py-2 font-mono text-xs transition-colors duration-200 ${stepTab === tab ? 'bg-terminal-text/20 text-terminal-text' : 'text-terminal-text/70 hover:text-terminal-text'}`}
								>
									{t(`detail.steps.tabs.${tab}`)}
								</button>
							))}
						</div>
						<ol role="tabpanel" className="space-y-5 list-none p-0 m-0">
							{stepKeys[stepTab].map((key, idx) => (
								<li key={key} className="flex gap-4">
									<span className="font-mono font-bold text-terminal-ink">
										{idx + 1}.
									</span>
									<div>
										<p className="text-base font-semibold text-terminal-text m-0">
											{t(`detail.steps.${stepTab}.${key}.title`)}
										</p>
										<p className="text-sm text-terminal-text/80 mt-1 mb-0">
											{t(`detail.steps.${stepTab}.${key}.description`)}
										</p>
									</div>
								</li>
							))}
						</ol>
					</InfoBox>
				</div>
			</div>
		</div>
	)
}

export default PositionDetailClient
