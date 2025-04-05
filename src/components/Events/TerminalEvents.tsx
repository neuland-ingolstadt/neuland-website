import TerminalTypeWriter from '@/components/Events/TerminalTypeWriter'
import TerminalWindow from '@/components/Events/TerminalWindow'
import TerminalSection from '@/components/Layout/TerminalSection'
import TerminalList from '@/components/TerminalList'
import { cn } from '@/lib/utils'
import { fetchEvents } from '@/services/events'
import { useQuery } from '@tanstack/react-query'
import { LucideArrowBigLeft } from 'lucide-react'
import React, { useState, useCallback, useRef } from 'react'

const TerminalEvents: React.FC = () => {
	const {
		data: eventsData,
		isFetching,
		isError
	} = useQuery({
		queryKey: ['eventsData'],
		queryFn: fetchEvents,
		initialData: { semester: 'SS 25', events: [] }
	})
	console.log(eventsData, isFetching, isError)

	const [selectedEventIndex, setSelectedEventIndex] = useState<number | null>(
		null
	)
	const containerRef = useRef<HTMLDivElement>(null)

	const handleEventClick = useCallback((index: number) => {
		setSelectedEventIndex((prev) => (prev === index ? null : index))
	}, [])

	const handleRedButtonClick = useCallback(() => {
		setSelectedEventIndex(null)
	}, [])

	const resetSelectedEvent = useCallback(() => {
		setSelectedEventIndex(null)
	}, [])

	return (
		<TerminalSection
			title="Aktuelle Veranstaltungen"
			subtitle={`Events im ${eventsData.semester}`}
			headingLevel={2}
		>
			<div className="max-w-5xl mx-auto justify-start mt-10 mb-8">
				<TerminalWindow
					title={`eventsData.sh --semester '${eventsData.semester}'`}
					showStickyNote={true}
					onRedButtonClick={handleRedButtonClick}
					className="max-h-[65vh] sm:max-h-[55vh] md:max-h-[60vh] overflow-hidden"
				>
					<div
						className="overflow-auto"
						style={{ maxHeight: 'calc(100% - 20px)' }}
					>
						<TerminalList>
							{isError ? (
								<div className="p-4 text-terminal-lightGreen">
									<p className="text-md mb-2">
										Oh no! Something went wrong while fetching the events.
									</p>

									<p className="text-sm mt-4 text-terminal-text/70">
										Our hamsters powering the server might be taking a break.
										<br />
										Please check back later!
									</p>
								</div>
							) : isFetching ? (
								<div className="p-4 max-w-lg">
									<p className="text-terminal-lightGreen animate-pulse">
										Loading events...
										<br />
										Please wait while we fetch the latest hackathons, workshops,
										and pizza parties...
									</p>
								</div>
							) : (
								<div
									ref={containerRef}
									className="min-h-[350px] h-[calc(65vh-100px)] sm:h-[calc(55vh-100px)] md:h-[calc(60vh-100px)] overflow-y-auto"
									style={{
										overflowY: selectedEventIndex !== null ? 'auto' : 'visible'
									}}
								>
									{selectedEventIndex !== null ? (
										<div className="h-full flex flex-col overflow-hidden ml-1 pt-1">
											<strong className="text-terminal-highlight font-medium">
												{eventsData.events[selectedEventIndex].title}
												{eventsData.events[selectedEventIndex].location && (
													<span className="text-terminal-text/60 ml-2">
														@{eventsData.events[selectedEventIndex].location}
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
																		? 'text-terminal-text/50'
																		: ''
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
												{eventsData.events[selectedEventIndex].rruleText && (
													<div className="text-terminal-text/60 text-sm first-letter:uppercase">
														{eventsData.events[selectedEventIndex].rruleText}
													</div>
												)}
											</div>

											<strong
												className={cn('text-terminal-highlight font-medium', {
													hidden:
														!eventsData.events[selectedEventIndex].description
												})}
											>
												Details
											</strong>
											<div className="mt-0 overflow-y-auto">
												<TerminalTypeWriter
													text={
														eventsData.events[selectedEventIndex].description
													}
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
											{eventsData?.events?.map((event, index) => (
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
															<span
																className={
																	line.trim().toLowerCase() === 'tbd'
																		? 'text-terminal-text/50'
																		: ''
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
										</>
									)}
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
