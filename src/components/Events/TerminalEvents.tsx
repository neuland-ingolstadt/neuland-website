import TerminalTypeWriter from '@/components/Events/TerminalTypeWriter'
import TerminalWindow from '@/components/Events/TerminalWindow'
import TerminalSection from '@/components/Layout/TerminalSection'
import TerminalList from '@/components/TerminalList'
import { cn } from '@/lib/utils'
import { LucideArrowBigLeft } from 'lucide-react'
import React, { useState, useCallback, useRef, useEffect } from 'react'

interface Event {
	title: string
	date: string
	location: string
	description: string
	rruleText?: string
}

interface TerminalEventsProps {
	semester: string
	events: Event[]
}

const TerminalEvents: React.FC<TerminalEventsProps> = ({
	semester,
	events
}) => {
	const [selectedEventIndex, setSelectedEventIndex] = useState<number | null>(
		null
	)
	const [containerHeight, setContainerHeight] = useState<number | null>(null)
	const containerRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		if (containerRef.current) {
			const timer = setTimeout(() => {
				setContainerHeight(containerRef.current?.scrollHeight || null)
			}, 10)
			return () => clearTimeout(timer)
		}
	}, [selectedEventIndex])

	const handleEventClick = useCallback((index: number) => {
		setSelectedEventIndex((prev) => (prev === index ? null : index))
	}, [])

	const handleRedButtonClick = useCallback(() => {
		setSelectedEventIndex(null)
		setContainerHeight(null)
	}, [])

	const resetSelectedEvent = useCallback(() => {
		setSelectedEventIndex(null)
		setContainerHeight(null)
	}, [])

	return (
		<TerminalSection
			title="Aktuelle Veranstaltungen"
			subtitle={`Events im ${semester}`}
			headingLevel={2}
		>
			<div className="max-w-5xl mx-auto justify-start mt-10">
				<TerminalWindow
					title={`events.sh --semester '${semester}'`}
					showStickyNote={true}
					onRedButtonClick={handleRedButtonClick}
				>
					<TerminalList>
						<div
							ref={containerRef}
							className="min-h-[420px]"
							style={{
								height:
									selectedEventIndex !== null && containerHeight
										? `${containerHeight}px`
										: 'auto',
								minHeight: containerHeight
									? `${Math.min(containerHeight, 420)}px`
									: '420px',
								overflowY: selectedEventIndex !== null ? 'auto' : 'visible'
							}}
						>
							{selectedEventIndex !== null ? (
								<div className="h-full flex flex-col overflow-hidden ml-1 pt-1">
									<strong className="text-terminal-highlight font-medium">
										{events[selectedEventIndex].title}
										{events[selectedEventIndex].location && (
											<span className="text-terminal-text/60 ml-2">
												@{events[selectedEventIndex].location}
											</span>
										)}
									</strong>

									<div className="mb-5 text-terminal-text/80">
										{events[selectedEventIndex].date
											.split('\n')
											.map((line, i) => (
												<React.Fragment key={i}>
													{line}
													{i <
														events[selectedEventIndex].date.split('\n').length -
															1 && <br />}
												</React.Fragment>
											))}
										{events[selectedEventIndex].rruleText && (
											<div className="text-terminal-text/60 text-sm first-letter:uppercase">
												{events[selectedEventIndex].rruleText}
											</div>
										)}
									</div>

									<strong
										className={cn('text-terminal-highlight font-medium', {
											hidden: !events[selectedEventIndex].description
										})}
									>
										Details
									</strong>
									<div className="mt-0 overflow-y-auto">
										<TerminalTypeWriter
											text={events[selectedEventIndex].description}
											isActive={true}
											delay={7}
										/>
									</div>

									<div className="mt-auto pt-3 pb-4">
										<button
											onClick={resetSelectedEvent}
											className="text-terminal-text  transition-colors px-2 py-1 text-sm inline-flex items-center font-bold group bg-black rounded-md border border-terminal-windowBorder hover:bg-terminal-windowBorder/30  "
											type="button"
										>
											<LucideArrowBigLeft
												size={16}
												className="mr-1 group-hover:text-terminal-highlight transition-colors"
											/>
											Alle Events
										</button>
									</div>
								</div>
							) : (
								<>
									{events.map((event, index) => (
										<div
											key={index}
											onClick={() => handleEventClick(index)}
											className="cursor-pointer hover:bg-terminal-windowBorder/30 p-1 rounded transition-colors mb-2"
											onKeyDown={(e) => {
												if (e.key === 'Enter') {
													handleEventClick(index)
												}
											}}
										>
											<strong className="text-terminal-highlight font-medium">
												{event.title}
												{event.location && (
													<span className="text-terminal-text/60 ml-2">
														@{event.location}
													</span>
												)}
											</strong>
											<br />
											{event.date.split('\n').map((line, i) => (
												<React.Fragment key={i}>
													{line}
													{i < event.date.split('\n').length - 1 && <br />}
												</React.Fragment>
											))}
											{event.rruleText && (
												<div className="text-terminal-text/60 text-sm first-letter:uppercase">
													{event.rruleText}
												</div>
											)}
										</div>
									))}
								</>
							)}
						</div>
					</TerminalList>
				</TerminalWindow>
			</div>
		</TerminalSection>
	)
}

export default TerminalEvents
