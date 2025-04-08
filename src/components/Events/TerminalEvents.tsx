'use client'
import TerminalTypeWriter from '@/components/Events/TerminalTypeWriter'
import TerminalWindow from '@/components/Events/TerminalWindow'
import TerminalSection from '@/components/Layout/TerminalSection'
import TerminalList from '@/components/TerminalList'
import { cn } from '@/lib/utils'
import { fetchEvents } from '@/services/events'
import { useQuery } from '@tanstack/react-query'
import { LucideArrowBigLeft } from 'lucide-react'
import React, { useState, useCallback, useRef, useEffect } from 'react'

const TerminalEvents: React.FC = () => {
	const {
		data: eventsData,
		isFetching,
		isError,
		error
	} = useQuery({
		queryKey: ['eventsData'],
		queryFn: fetchEvents,
		retry: 2,
		refetchOnWindowFocus: false,
		staleTime: 5 * 60 * 1000,
		initialData: { semester: `SS ${new Date().getFullYear()}`, events: [] }
	})

	const [selectedEventIndex, setSelectedEventIndex] = useState<number | null>(
		null
	)
	const containerRef = useRef<HTMLDivElement>(null)
	const [containerHeight, setContainerHeight] = useState<number | null>(null)

	const handleEventClick = useCallback(
		(index: number) => {
			if (containerRef.current && selectedEventIndex === null) {
				setContainerHeight(containerRef.current.offsetHeight)
			}
			setSelectedEventIndex((prev) => (prev === index ? null : index))
		},
		[selectedEventIndex]
	)

	const handleRedButtonClick = useCallback(() => {
		setSelectedEventIndex(null)
	}, [])

	const resetSelectedEvent = useCallback(() => {
		setSelectedEventIndex(null)
		setContainerHeight(null)
	}, [])

	useEffect(() => {
		setSelectedEventIndex(null)
	}, [eventsData])

	return (
		<TerminalSection
			title="Aktuelle Veranstaltungen"
			subtitle={`Events im ${eventsData?.semester || `SS ${new Date().getFullYear()}`}`}
			headingLevel={2}
		>
			<div className="max-w-5xl mx-auto justify-start mt-10 mb-8 relative overflow-visible">
				<TerminalWindow
					title={`eventsData.sh --semester '${eventsData?.semester || `SS ${new Date().getFullYear()}`}'`}
					showStickyNote={true}
					onRedButtonClick={handleRedButtonClick}
					className="max-h-none"
				>
					<div
						className="overflow-auto overflow-x-hidden"
						style={{ maxHeight: 'none' }}
					>
						<TerminalList>
							{isError ? (
								<div className="p-4 text-terminal-lightGreen">
									<p className="text-md mb-2">
										Oh nein! Beim Abrufen der Events ist etwas schiefgelaufen.
									</p>
									<p className="text-sm text-terminal-lightGreen/60">
										{error instanceof Error
											? error.message
											: 'Unbekannter Fehler'}
									</p>
									<p className="text-sm mt-4 text-terminal-text/70">
										Unsere Serverwartungsmannschaft macht gerade wohl
										Kaffeepause.
										<br />
										Bitte versuche es später noch einmal!
									</p>
								</div>
							) : isFetching ? (
								<div className="p-4 max-w-lg">
									<p className="text-terminal-text/80 animate-pulse">
										Veranstaltungen werden geladen...
									</p>
								</div>
							) : !eventsData?.events || eventsData.events.length === 0 ? (
								<div className="p-4 text-terminal-lightGreen">
									<p className="text-md mb-2">
										Aktuell sind keine Veranstaltungen geplant.
									</p>
									<p className="text-sm mt-4 text-terminal-text/70">
										Schau bald wieder vorbei für neue Events!
									</p>
								</div>
							) : (
								<div
									ref={containerRef}
									className="min-h-[250px] h-auto relative"
									style={{
										overflowY: 'visible',
										height:
											selectedEventIndex !== null && containerHeight
												? `${containerHeight}px`
												: 'auto'
									}}
								>
									<div
										className={cn(
											'h-full flex flex-col overflow-hidden overflow-x-hidden ml-1 pt-1 absolute top-0 left-0 w-[calc(100%-8px)] transition-opacity duration-300 ease-in-out',
											selectedEventIndex !== null
												? 'opacity-100 z-10'
												: 'opacity-0 pointer-events-none'
										)}
									>
										{selectedEventIndex !== null && (
											<div className="flex flex-col h-full">
												<div className="flex-none">
													<strong className="text-terminal-highlight text-xl break-words pr-4 max-w-full">
														{eventsData.events[selectedEventIndex].title}
														{eventsData.events[selectedEventIndex].location && (
															<span className="text-terminal-text/60 ml-2 break-all">
																@
																{eventsData.events[selectedEventIndex].location}
															</span>
														)}
													</strong>

													<div className="mb-5 text-terminal-text/80">
														{eventsData.events[selectedEventIndex].date
															.split('\n')
															.map((line, i) => (
																<React.Fragment key={i}>
																	<span
																		className={
																			line.trim().toLowerCase() === 'tbd'
																				? 'text-terminal-text/50 text-[0.95rem]'
																				: 'text-[0.95rem]'
																		}
																	>
																		{line}
																	</span>
																	{i <
																		eventsData.events[
																			selectedEventIndex
																		].date.split('\n').length -
																			1 && <br />}
																</React.Fragment>
															))}
														{eventsData.events[selectedEventIndex]
															.rruleText && (
															<div className="text-terminal-text/60 text-sm first-letter:uppercase">
																{
																	eventsData.events[selectedEventIndex]
																		.rruleText
																}
															</div>
														)}
													</div>

													<strong
														className={cn('text-terminal-highlight text-lg', {
															hidden:
																!eventsData.events[selectedEventIndex]
																	.description
														})}
													>
														Details
													</strong>
												</div>

												<div
													className="overflow-y-auto overflow-x-hidden pr-4 max-w-full flex-1"
													style={{
														maxHeight: containerHeight
															? `${containerHeight - 150}px`
															: 'auto'
													}}
												>
													<div className="max-w-full overflow-hidden">
														<TerminalTypeWriter
															text={
																eventsData.events[selectedEventIndex]
																	.description
															}
															isActive={true}
															delay={7}
														/>
													</div>
												</div>

												<div className="flex-none pt-3 pb-4">
													<button
														onClick={resetSelectedEvent}
														className="text-terminal-text transition-colors px-2 py-1 text-sm inline-flex items-center font-bold group bg-black rounded-md border border-terminal-window-border hover:bg-terminal-window-border/30"
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
										)}
									</div>

									<div
										className={cn(
											'transition-opacity duration-300 ease-in-out',
											selectedEventIndex === null
												? 'opacity-100 z-10'
												: 'opacity-0 pointer-events-none'
										)}
									>
										{eventsData?.events?.map((event, index) => (
											<div
												key={index}
												onClick={() => handleEventClick(index)}
												className="cursor-pointer hover:bg-terminal-window-border/30 p-1 rounded-lg transition-colors mb-1"
												onKeyDown={(e) => {
													if (e.key === 'Enter') {
														handleEventClick(index)
													}
												}}
												aria-label={`Event: ${event.title}`}
											>
												<strong className="text-terminal-highlight text-[1.05rem]">
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
														<span
															className={
																line.trim().toLowerCase() === 'tbd'
																	? 'text-terminal-text/50 text-[0.95rem]'
																	: 'text-[0.95rem]'
															}
														>
															{line}
														</span>
														{i < event.date.split('\n').length - 1 && <br />}
													</React.Fragment>
												))}
												{event.rruleTextShort && (
													<div className="text-terminal-text/60 text-sm first-letter:uppercase">
														{event.rruleTextShort}
													</div>
												)}
											</div>
										))}
									</div>
								</div>
							)}
						</TerminalList>
					</div>
				</TerminalWindow>
			</div>
		</TerminalSection>
	)
}

export default TerminalEvents
