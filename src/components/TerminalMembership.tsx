import TerminalButton from './TerminalButton'

const TerminalMembership = () => {
	return (
		<div className="space-y-6">
			<p className="mb-4">
				Wir heißen jeden willkommen, der sich für Technologie und Informatik
				begeistert!
				<br />
				Als Mitglied profitierst du von unseren Workshops, Events und einer
				großartigen Community von Gleichgesinnten.
			</p>

			<div className="terminal-price-info border border-terminal-windowBorder p-4 bg-terminal-window rounded max-w-md">
				<div className="text-terminal-text/50 mb-2">
					$ cat membership-fees.txt
				</div>
				<div className="flex flex-col gap-2">
					<div>
						<span className="text-terminal-lightGreen">Studierende:</span>
						<span className="text-success ml-2">0€ / Jahr</span>
					</div>
					<div>
						<span className="text-terminal-lightGreen">Externe:</span>
						<span className="text-success ml-2">20€ / Jahr</span>
					</div>
				</div>
			</div>

			<div>
				<TerminalButton href="https://join.neuland-ingolstadt.de/">
					Mitglied werden
				</TerminalButton>
				<TerminalButton href="mailto:info@neuland-ingolstadt.de">
					E-Mail schreiben
				</TerminalButton>
			</div>
		</div>
	)
}

export default TerminalMembership
