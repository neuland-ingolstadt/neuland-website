'use client'
import { CalendarIcon, LucideArrowBigLeft } from 'lucide-react'
import React, { useCallback, useRef, useState } from 'react'
import TerminalTypeWriter from '@/components/Events/terminal-type-writer'
import TerminalWindow from '@/components/Events/terminal-window'
import TerminalSection from '@/components/Layout/terminal-section'
import TerminalButton from '@/components/terminal-button'
import TerminalList from '@/components/terminal-list'
import { cn } from '@/lib/utils'
import type { fetchEvents } from '@/services/events'
import CalendarModal from './calendar-modal'

interface TerminalEventsProps {
	initialData?: Awaited<ReturnType<typeof fetchEvents>>
	error?: string | null
}

const TerminalEvents: React.FC<TerminalEventsProps> = ({
	initialData,
	error: serverError
}) => {
	const eventsData = initialData || {
		semester: `SS ${new Date().getFullYear()}`,
		events: []
	}
	const error = serverError

	const [selectedEventIndex, setSelectedEventIndex] = useState<number | null>(
		null
	)
	const containerRef = useRef<HTMLDivElement>(null)
	const [containerHeight, setContainerHeight] = useState<number | null>(null)
	const [isCalModalOpen, setIsCalModalOpen] = useState(false)
	const icalUrl = 'https://cl.neuland-ingolstadt.de/api/ical/4'

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

	const openCalModal = useCallback(() => {
		setIsCalModalOpen(true)
	}, [])

	const closeCalModal = useCallback(() => {
		setIsCalModalOpen(false)
	}, [])

	return (
		<TerminalSection
			title="Unsere Veranstaltungen"
			subtitle={`Events im ${eventsData?.semester || `SS ${new Date().getFullYear()}`}`}
			headingLevel={2}
		>
			<div className="max-w-5xl mx-auto justify-start mt-10 mb-8 relative overflow-visible min-h-[200px] font-mono">
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
							{error ? (
								<div className="p-4 text-terminal-lightGreen">
									<p className="text-md mb-2">
										Oh nein! Beim Abrufen der Events ist etwas schiefgelaufen.
									</p>
									<p className="text-sm text-terminal-lightGreen/60">
										{typeof error === 'object' &&
										error !== null &&
										'message' in error
											? (error as { message: string }).message
											: typeof error === 'string'
												? error
												: 'Unbekannter Fehler'}
									</p>
									<p className="text-sm mt-4 text-terminal-text/70">
										Unsere Serverwartungsmannschaft macht gerade wohl
										Kaffeepause.
										<br />
										Bitte versuche es später noch einmal!
									</p>
								</div>
							) : !eventsData?.events || eventsData.events.length === 0 ? (
								<div className="p-4 text-terminal-text font-bold">
									<p className="text-md mb-3">
										Danke für eure Teilnahme an den über 20 Events in diesem
										Semester! 🎉
									</p>
									<p className="text-sm mb-3 text-terminal-text/80">
										Wir arbeiten bereits an spannenden neuen Events für das
										kommende Semester.
										<br />
										<span className="text-terminal-highlight">$</span>{' '}
										./prepare_ctf.sh --season WS25/26 --hype-level=MAXIMUM
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
													<strong className="text-terminal-lightGreen text-xl break-words pr-4 max-w-full">
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
													</div>

													<strong
														className={cn('text-terminal-lightGreen text-lg', {
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
														className="text-terminal-text transition-colors px-2 py-1 text-sm inline-flex items-center font-bold group bg-terminal-card rounded-md border border-terminal-window-border hover:bg-terminal-window-border/30"
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
											// biome-ignore lint/a11y/noStaticElementInteractions: no problem
											<div
												key={index}
												onClick={() => handleEventClick(index)}
												className="cursor-pointer hover:bg-terminal-window-border/30 p-1 rounded-lg transition-colors mb-1"
												onKeyDown={(e) => {
													if (e.key === 'Enter') {
														handleEventClick(index)
													}
												}}
											>
												<strong className="text-terminal-lightGreen text-[1.05rem]">
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
												{/* rrule short text removed in new API */}
											</div>
										))}
									</div>
								</div>
							)}
						</TerminalList>
					</div>
				</TerminalWindow>

				<div className="flex sm:justify-end -mt-4 ">
					<TerminalButton onClick={openCalModal}>
						<CalendarIcon
							size={16}
							className="mr-2 group-hover:rotate-8 transition-transform duration-300"
						/>
						Events abonnieren
					</TerminalButton>
				</div>

				<CalendarModal
					isOpen={isCalModalOpen}
					onClose={closeCalModal}
					icalUrl={icalUrl}
				/>
			</div>
		</TerminalSection>
	)
}

export default TerminalEvents
