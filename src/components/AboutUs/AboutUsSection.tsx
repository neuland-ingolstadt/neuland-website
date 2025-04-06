'use client'
import TerminalSection from '@/components/Layout/TerminalSection'
import type React from 'react'

const AboutUsSection: React.FC = () => {
	return (
		<TerminalSection title="Über uns" headingLevel={2}>
			<p>
				Wir bieten den Studierenden eine <strong>Plattform</strong>, um sich
				auszutauschen, um <strong>Projekte</strong> zu realisieren und um ihr{' '}
				<strong>Wissen</strong> zu erweitern.
				<br />
				Gemeinsam entwickeln wir <strong>Projekte</strong> für die Studierenden,
				nehmen an <strong>Wettbewerben</strong> teil und führen selbst{' '}
				<strong>Veranstaltungen</strong> rund um die Informatik durch.
				<br />
				Und das ganz unabhängig von der <strong>Fakultät</strong> oder dem{' '}
				<strong>Studiengang</strong>.
			</p>
		</TerminalSection>
	)
}

export default AboutUsSection
