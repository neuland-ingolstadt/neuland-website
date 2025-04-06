import type React from 'react'

const TerminalPartners: React.FC = () => {
	return (
		<div className="flex flex-wrap justify-center items-center my-6 gap-6">
			<a
				href="https://www.epos-cat.de/"
				className="badge-link no-underline"
				target="_blank"
				rel="noreferrer noopener"
			>
				<img
					src="assets/epos_dark.svg"
					alt="EPOS CAT GmbH"
					className="h-12 sm:h-16 mx-4 my-2 filter brightness-90 hover:brightness-100 transition-all duration-300"
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
					className="h-12 sm:h-16 mx-4 my-2 filter brightness-90 hover:brightness-100 transition-all duration-300"
				/>
			</a>
		</div>
	)
}

export default TerminalPartners
