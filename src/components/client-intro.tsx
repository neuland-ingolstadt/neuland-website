import TypewriterText from '@/components/typewriter-text'

export default function ClientIntro() {
	return (
		<div className={'pt-20'}>
			<TypewriterText
				text="Der studentische Verein für alle informatikbegeisterten Studierenden der TH Ingolstadt."
				className="text-xl mb-12 font-mono font-semibold text-terminal-text/90"
				delay={25}
				preventLayoutJumps={true}
			/>
		</div>
	)
}
