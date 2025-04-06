import type React from 'react'

const TerminalPartners: React.FC = () => {
	return (
		<div className="partner-logos flex flex-wrap justify-center items-center my-6 gap-6">
			<a
				href="https://www.epos-cat.de/"
				className="badge-link no-underline"
				target="_blank"
				rel="noreferrer noopener"
			>
				<img
					src="assets/epos_dark.svg"
					alt="EPOS CAT GmbH"
					className="partner-logo"
				/>
			</a>
			<a
				href="https://www.explore.de/"
				className="badge-link no-underline"
				target="_blank"
				rel="noreferrer noopener"
			>
				<img
					src="assets/exp.webp"
					alt="EXP software GmbH"
					className="partner-logo"
				/>
			</a>
		</div>
	)
}

export default TerminalPartners
